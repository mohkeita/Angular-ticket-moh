import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../../shared/token-storage.service";
import {Category} from "../../../model/category.model";
import {EventsService} from "../../../shared/events.service";
import {Organizers} from "../../../model/organizers.model";
import {AdminService} from "../../../shared/admin.service";
import {Router} from "@angular/router";
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-new-events',
  templateUrl: './new-events.component.html',
  styleUrls: ['./new-events.component.scss']
})
export class NewEventsComponent implements OnInit {
  categories: Category[];
  organizers: Organizers[];
  isEmpty:boolean;
  error:boolean;

  errorImage = false;

  spinner = false;

  files: File[] = [];
  file = false;
  progress = 0;
  image = '';

  count = 3;
  show: boolean;

  eventForm: FormGroup;
  stripeIdProduct: string;
  stripePriceId: string;
  errorMessage = false;
  idUser:number;
  succes: boolean;

  get title() {
    return this.eventForm.get('title');
  }
  get description() {
    return this.eventForm.get('description');
  }

  get dateEvent() {
    return this.eventForm.get('dateEvent');
  }

  get street() {
    return this.eventForm.get('street');
  }

  get city() {
    return this.eventForm.get('city');
  }

  get quantity() {
    return this.eventForm.get('quantity');
  }

  get unitPrice() {
    return this.eventForm.get('unitPrice');
  }
  get getOrganizersId() {
    return this.eventForm.get('organizersId');
  }
  get categoryId() {
    return this.eventForm.get('categoryId');
  }


  constructor(private tokenService: TokenStorageService,
              private eventService: EventsService,
              private adminService: AdminService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {

    this.getCategory();
    this.getOrganizers();
    const {id} = this.tokenService.getUser();
    this.idUser = id;

    this.eventForm = this.fb.group({
      userId: [this.idUser],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      organizersId: [0, [Validators.required]],
      categoryId: [0, [Validators.required]],
      dateEvent: ['2021-05-25 20:16', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      imageUrl: [this.image],
      quantity: [0, [Validators.required]],
      unitPrice: [0, [Validators.required]],
    });

  }

  getCategory() {
    this.eventService.getCategory()
      .subscribe(data => {
        this.categories = data;
      });
  }
  getOrganizers() {
    this.eventService.getAllOrganizers()
      .subscribe(data => {
        this.organizers = data;
      });
  }

  Price(unitPrice, stripeIdProduct) : void {
    this.adminService.stripeCreatePrice(unitPrice, stripeIdProduct)
      .subscribe(data => {
        this.stripePriceId = data.id;
        this.addEvent(this.eventForm.value, data.id, this.stripeIdProduct);
      }, err => {
        this.errorMessage = true;
        console.log('erreur price')
      });
}

addEvent(eventForm, stripeIdPrice, stripeIdProduct): void {
    this.adminService.createEvent(eventForm, stripeIdProduct, stripeIdPrice)
      .subscribe(data => {
        this.succes = true;
        this.spinner = false

        let timeout = setInterval(() => {
          this.show = true;
          if (this.count > 1) {
            this.count -= 1;
          } else {
            clearInterval(timeout);
            this.router.navigateByUrl('/admin/events');
          }
        }, 1000);


      }, err => {
        this.errorMessage = true;
        console.log('erreur ajout event')
      });
}

  onSubmitEvent(): void {

    if (this.eventForm.invalid) {
      console.log(this.eventForm.value)
      this.isEmpty = true;
      return;
    }

    this.adminService.stripeCreateEvent(this.title.value, this.image, this.description.value)
      .subscribe(data => {
        this.stripeIdProduct = data.id;

        this.Price(this.unitPrice.value + "00", data.id);

    },  err => {
        this.errorMessage = true;
        this.spinner = false;
        console.log('erreur produits');
      })

  }


  onClick(){
    this.spinner = true;
  }

  onSelect(event) {
    this.files.push(event.target.files[0]);


    //send to cloudinary
    const file_data = this.files[0];

    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'moheticket');
    data.append('cloud_name', 'duraeqq2p');

    this.adminService.uploadImage(data)
      .subscribe(response => {

        if (response.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * response.loaded / response.total);
        } else {
          this.file = true;
          if (response.body) {
            this.image = response.body.secure_url;
          }
        }
      } , err => {
        this.errorImage = true;
      });
  }

  Undelete(){
    delete this.files[0];
    this.file = false;
    this.image = '';
    this.progress = 0;
  }

}
