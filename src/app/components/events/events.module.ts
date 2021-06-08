import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsDetailComponent } from './events-detail/events-detail.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    EventsListComponent,
    EventsDetailComponent
  ],
    imports: [
        CommonModule,
        EventsRoutingModule,
        ReactiveFormsModule
    ]
})
export class EventsModule { }
