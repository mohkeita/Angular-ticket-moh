import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventsListComponent} from "./events-list/events-list.component";
import {EventsDetailComponent} from "./events-detail/events-detail.component";

const routes: Routes = [
  { path: '', component: EventsListComponent },
  { path: 'events/:id', component: EventsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
