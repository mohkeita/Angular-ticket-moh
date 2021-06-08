import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";
import {AdminAllTicket} from "../model/AllTicketAdmin.Model";
import {EventsAdmin} from "../model/EventsAdmin";
import {Dashboard} from "../model/Dashboard.model";
import {environment} from "../../environments/environment";
import {AddEventsModel} from "../model/addEvents.model";
import {Category} from "../model/category.model";
import {CategoryDto} from "../model/categoryDto";
import {Organizers} from "../model/organizers.model";
import {OrganizersDto} from "../model/OrganizersDto";

const host = 'http://mohkeita.somee.com/api';
const headersStripe = {
  headers: new HttpHeaders()
    .set('Authorization',  `Bearer ${environment.stripe_secret}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
}

const httpOptions = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
}

const stripe = '';
const hostCloudinary = '';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(host + '/user');
  }

  uploadImage(vals): Observable<any> {
    return this.http.post(hostCloudinary, vals, { reportProgress: true, observe: 'events'});
  }

  createEvent(events: AddEventsModel, stripeIdProduct, stripeIdPrice): Observable<any> {
    return  this.http.post<any>(host + '/Event', {
      userId: events.userId,
      organizersId: events.organizersId,
      categoryId: events.categoryId,
      title: events.title,
      description: events.description,
      dateEvent: events.dateEvent,
      stripeProductId: stripeIdProduct,
      stripePriceId: stripeIdPrice,
      street: events.street,
      city: events.city,
      imageUrl: events.imageUrl,
      quantity: events.quantity,
      unitPrice: events.unitPrice,
    }, httpOptions);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(host + '/Category', category);
  }

  updateOrganizers(organizers: Organizers): Observable<Organizers> {
    return this.http.put<Organizers>(host + '/Organizers', organizers);
  }

  getAllEvents(): Observable<EventsAdmin[]> {
    return this.http.get<EventsAdmin[]>(host + '/Event/admin');
  }

  getAdminTickets(): Observable<AdminAllTicket[]> {
    return this.http.get<AdminAllTicket[]>(host + '/Order');
  }


  createCategory(categoryDto: CategoryDto): Observable<CategoryDto> {
    return  this.http.post<CategoryDto>(host + '/category', {
      name: categoryDto.name
    }, httpOptions);
  }

  createOrganizers(organizers: OrganizersDto): Observable<OrganizersDto> {
    return  this.http.post<OrganizersDto>(host + '/Organizers', {
      name: organizers.name,
      email: organizers.email,
      phone: organizers.phone,
      about: organizers.about,
      logo: organizers.logo,
      street: organizers.street,
      city: organizers.city,
    }, httpOptions);
  }


  getDashboard(): Observable<Dashboard> {
    return this.http.get<Dashboard>(host + '/Ticket/dashboard');
  }

  BlockUnblocbkUser(user: User): Observable<User> {
    return  this.http.put<User>(host + '/user/blockunblock/' + user.id, user);
  }

  stripeCreateEvent(name, image, description): Observable<any> {
    const body = new HttpParams()
      .set('name', name)
      .set('images[0]', image)
      .set('description', description);

    return this.http.post(stripe + 'products',
      body.toString(), headersStripe
    );
  }

  stripeCreatePrice(unit_amount, product): Observable<any> {
    const body = new HttpParams()
      .set('unit_amount', unit_amount)
      .set('currency', 'eur')
      .set('product', product);

    return this.http.post(stripe + 'prices',
      body.toString(), headersStripe
    );
  }
}
