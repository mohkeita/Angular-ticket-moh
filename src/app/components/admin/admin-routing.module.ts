import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminNavComponent} from "./admin-nav/admin-nav.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UserComponent} from "./user/user.component";
import {AdminEventComponent} from "./admin-event/admin-event.component";
import {TicketsComponent} from "./tickets/tickets.component";
import {NewEventsComponent} from "./new-events/new-events.component";
import {CategoryComponent} from "./category/category.component";
import {OrganizersComponent} from "./organizers/organizers.component";
import {NewCategoryComponent} from "./new-category/new-category.component";
import {NewOrganizersComponent} from "./new-organizers/new-organizers.component";
import {EditOrganizersComponent} from "./edit-organizers/edit-organizers.component";
import {EditCategoryComponent} from "./edit-category/edit-category.component";

const routes: Routes = [
  { path: '', component: AdminNavComponent,
    children: [
      { path: '', redirectTo: 'dash', pathMatch: 'full'},
      { path: 'dash', component: DashboardComponent },
      { path: 'users', component: UserComponent },
      { path: 'events', component: AdminEventComponent },
      { path: 'new-events', component: NewEventsComponent },
      { path: 'tickets', component: TicketsComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'category/:id', component: EditCategoryComponent },
      { path: 'new-category', component: NewCategoryComponent },
      { path: 'organizers', component: OrganizersComponent },
      { path: 'organizers/:id', component: EditOrganizersComponent },
      { path: 'new-organizers', component: NewOrganizersComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
