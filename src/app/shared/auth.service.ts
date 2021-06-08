import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login} from "../model/login.model";
import {Register} from "../model/register.model";

const AUTH_API = 'http://mohkeita.somee.com/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: Login): Observable<any> {
    return  this.http.post<Login>(AUTH_API + '/auth/login', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(credentials: Register): Observable<any> {
    return this.http.post<Register>(AUTH_API + '/auth/register', {
      username: credentials.username,
      email: credentials.email,
      firstname: credentials.firstname,
      lastname: credentials.lastname,
      dateBirth: credentials.dateBirth,
      password: credentials.password
    }, httpOptions);
  }
}
