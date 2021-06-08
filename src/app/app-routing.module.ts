import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {SignupComponent} from "./components/auth/signup/signup.component";
import {CompanyDetailComponent} from "./components/company/company-detail/company-detail.component";
import {SuccessComponent} from "./components/auth/success/success.component";
import {FailureComponent} from "./components/auth/failure/failure.component";
import {MyticketComponent} from "./components/myticket/myticket.component";
import {AuthGuard} from "./components/auth/auth/auth.guard";
import {SecureInnerPagesGuard} from "./components/auth/auth/secure-inner-pages.guard";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'mytickets', component: MyticketComponent, canActivate: [AuthGuard] },
  { path: 'success/:id', component: SuccessComponent, canActivate: [AuthGuard] },
  { path: 'failure', component: FailureComponent },
  { path: 'company/:id', component: CompanyDetailComponent },
  { path: 'events',
    loadChildren: () => import('./components/events/events.module').then(m => m.EventsModule)
  },
  { path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
