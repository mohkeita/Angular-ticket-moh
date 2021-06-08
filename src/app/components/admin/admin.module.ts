import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { CardStatsComponent } from './card-stats/card-stats.component';
import { UserComponent } from './user/user.component';
import { AdminEventComponent } from './admin-event/admin-event.component';
import { TicketsComponent } from './tickets/tickets.component';
import { StatsComponent } from './stats/stats.component';
import { NewEventsComponent } from './new-events/new-events.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CategoryComponent } from './category/category.component';
import { OrganizersComponent } from './organizers/organizers.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { NewOrganizersComponent } from './new-organizers/new-organizers.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditOrganizersComponent } from './edit-organizers/edit-organizers.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminNavComponent,
    CardStatsComponent,
    UserComponent,
    AdminEventComponent,
    TicketsComponent,
    StatsComponent,
    NewEventsComponent,
    CategoryComponent,
    OrganizersComponent,
    NewCategoryComponent,
    NewOrganizersComponent,
    EditCategoryComponent,
    EditOrganizersComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule
    ]
})
export class AdminModule { }
