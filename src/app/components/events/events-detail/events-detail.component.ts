import { Component, OnInit } from '@angular/core';
import {Events} from "../../../model/events.model";
import {AppDataState, DataStateEnum} from "../../../state/app.state";
import {Observable, of} from "rxjs";
import {EventsService} from "../../../shared/events.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, map, startWith} from "rxjs/operators";
import {TokenStorageService} from "../../../shared/token-storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {loadStripe} from "@stripe/stripe-js/pure";


@Component({
  selector: 'app-events-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.scss']
})
export class EventsDetailComponent implements OnInit {
  currentEvents$: Observable<AppDataState<Events>> | null = null;
  readonly DatastateEnum = DataStateEnum;

  genericImage = "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80";

  connect: boolean;

  spinner = false;

  errorMessage = false;
  isEmpty = false;
  isSucces = false;
  errorLimit = false;

  stripePromise = loadStripe(environment.stripe_key);

  idEvents: number;
  checkOutForm: FormGroup;

  get getQuantity() {
    return this.checkOutForm.get('quantity');
  }
  get getPriceId() {
    return this.checkOutForm.get('priceId');
  }

  constructor(private eventService: EventsService,
              private route: ActivatedRoute,
              private router: Router,
              private tokenService: TokenStorageService,
              private fb: FormBuilder
              ) { }

  ngOnInit(): void {
    this.idEvents = this.route.snapshot.params.id;
    this.getEvents(this.idEvents);
    this.connect = !!this.tokenService.getToken();

    this.checkOutForm = this.fb.group({
      priceId: ['', [Validators.required]],
      quantity: [1, [Validators.required]],
      successUrl: ['http://localhost:4200/success'],
      failureUrl: ['http://localhost:4200/failure']

    });
  }

  getEvents(id: number) {
    this.currentEvents$ = this.eventService.getEvents(id).pipe(
      map( data => {
        return ({ dataState: DataStateEnum.LOADED, data: data})}),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError( err => of( { dataState: DataStateEnum.ERROR, errorMessage: err.Message}))
    );
  }

  onClick(){
    this.spinner = true;
  }

  async checkout() {

    this.eventService.beforeBuyTickets(this.idEvents, this.checkOutForm.value.quantity)
      .subscribe(async data => {

        const stripe = await this.stripePromise;
        const { error } = await stripe.redirectToCheckout({
          mode: 'payment',
          lineItems: [{ price: this.checkOutForm.value.priceId, quantity: this.checkOutForm.value.quantity }],
          successUrl: 'http://localhost:4200/success/{CHECKOUT_SESSION_ID}',
          cancelUrl: 'http://localhost:4200/failure',
        });
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        if (error) {
          console.log(error);
        }

      }, err => {
        this.errorLimit = true;
        this.spinner = false;
      });



  }


}
