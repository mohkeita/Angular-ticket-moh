import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Events} from "../model/events.model";
import {Category} from "../model/category.model";
import {Organizers} from "../model/organizers.model";
import {environment} from "../../environments/environment";
import {StripeSessionResponse} from "../model/striperesponsepay";
import {Ticket} from "../model/ticket.model";
import {MyTicket} from "../model/myTicketModel";


//declare const Stripe;


const headersStripe = {
  headers: new HttpHeaders()
    .set('Authorization',  `Bearer ${environment.stripe_secret}`)
}

const httpOptions = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
}


const host = 'http://mohkeita.somee.com/api';
const stripe = '';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<Events[]> {
    return  this.http.get<Events[]>(host + '/Event', httpOptions);
  }


  getAllMyTicket(): Observable<MyTicket[]> {
    return  this.http.get<MyTicket[]>(host + '/Order/withUserId', httpOptions);
  }
  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(host + '/category', httpOptions);
  }

  getOrganizers(id:number): Observable<Organizers> {
    return this.http.get<Organizers>(host + '/Organizers/'+ id);
  }

  getOneCategory(id:number): Observable<Category> {
    return this.http.get<Category>(host + '/category/'+ id);
  }
  getAllOrganizers(): Observable<Organizers[]> {
    return this.http.get<Organizers[]>(host + '/Organizers');
  }

  getTicketsWithStripeId(id:string): Observable<Ticket> {
    return this.http.get<Ticket>(host + '/Ticket/pay/'+ id);
  }

  BuyTickets(ticketId: number, userId: number, quantity: number): Observable<any> {
    return  this.http.post<any>(host + '/Order', {
      ticketId : ticketId,
      userId: userId,
      quantity: quantity,
    }, httpOptions);
  }
  beforeBuyTickets(idEvent: number, quantity: number): Observable<any> {
    return  this.http.post<any>(host + '/Order/beforebuy', {
      idEvent : idEvent,
      quantity: quantity,
    }, httpOptions);
  }

  getEvents(id:number): Observable<Events> {
    return this.http.get<Events>(host + '/Event/'+ id);
  }

  getDetailsPayment(sessionId): Observable<StripeSessionResponse> {
    return this.http.get<StripeSessionResponse>(stripe + sessionId +'/line_items?limit=5', headersStripe);
  }
}
