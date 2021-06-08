import { Component, OnInit } from '@angular/core';
import {EventsService} from "../../../shared/events.service";
import {ActivatedRoute} from "@angular/router";
import {loadStripe} from "@stripe/stripe-js/pure";
import {environment} from "../../../../environments/environment";
import {Ticket} from "../../../model/ticket.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BuyDto} from "../../../model/buyDto.model";
import {TokenStorageService} from "../../../shared/token-storage.service";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  session: string;
  currentTicket: Ticket;
  quantity: number;

  idUser: number;
  isSucces = false;

  ord: BuyDto;


  constructor(private eventService: EventsService,
              private route: ActivatedRoute,
              private tokenService: TokenStorageService
              ) { }

  ngOnInit(): void {
    this.session = this.route.snapshot.params.id;
    this.sessionCheck(this.session)
    const {id} = this.tokenService.getUser();
    this.idUser = id;
  }

 async sessionCheck(sess: string) {
    this.eventService.getDetailsPayment(sess).subscribe(data => {
      this.quantity = data.data[0].quantity;
      this.ticket(data.data[0].price.id);
    });
  }

  ticket(id: string) {
    this.eventService.getTicketsWithStripeId(id).subscribe(data => {
      this.currentTicket = data;

      this.sendBuy(this.currentTicket.id,this.quantity);
    } );
  }

  sendBuy(ticketId:number, quantity:number) {
    this.eventService.BuyTickets(ticketId,this.idUser, quantity)
      .subscribe( data => {
        this.isSucces = true;
      }, err => {
        console.log('erreur');
        this.isSucces = false;
      });
  }

}
