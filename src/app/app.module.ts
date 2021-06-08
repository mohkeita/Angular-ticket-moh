import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CompanyDetailComponent } from './components/company/company-detail/company-detail.component';
import {HttpClientModule} from "@angular/common/http";
import {EventsModule} from "./components/events/events.module";
import { AuthNavbarComponent } from './components/auth/auth-navbar/auth-navbar.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SuccessComponent } from './components/auth/success/success.component';
import { FailureComponent } from './components/auth/failure/failure.component';
import { MyticketComponent } from './components/myticket/myticket.component';
import {AuthGuard} from "./components/auth/auth/auth.guard";
import {SecureInnerPagesGuard} from "./components/auth/auth/secure-inner-pages.guard";
import {TokenStorageService} from "./shared/token-storage.service";
import {authInterceptorProviders} from "./helpers/auth.interceptor";
import {unauthorizedInterceptorProviders} from "./helpers/Unauthorized.interceptor";
import {NgxQRCodeModule} from "@techiediaries/ngx-qrcode";
import {AdminModule} from "./components/admin/admin.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NavBarComponent,
    CompanyDetailComponent,
    AuthNavbarComponent,
    SuccessComponent,
    FailureComponent,
    MyticketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EventsModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
    AdminModule
  ],
  providers: [TokenStorageService,AuthGuard, SecureInnerPagesGuard,authInterceptorProviders, unauthorizedInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
