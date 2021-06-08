import { Component, OnInit } from '@angular/core';
import {Events} from "../../../model/events.model";
import {AppDataState, DataStateEnum} from "../../../state/app.state";
import {Observable, of} from "rxjs";
import {EventsService} from "../../../shared/events.service";
import {catchError, map, startWith} from "rxjs/operators";
import {Category} from "../../../model/category.model";

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  events$: Observable<AppDataState<Events[]>> | null = null;
  readonly DatastateEnum = DataStateEnum;

  genericImage = "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80";


  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.events$ = this.eventsService.getAllEvents().pipe(
      map(data => {
        return ({ dataState: DataStateEnum.LOADED, data: data } ) } ),
      startWith({ dataState: DataStateEnum.LOADING}),
      catchError(err => of( { dataState: DataStateEnum.ERROR, errorMessage: err.Message}))
    );
  }

}
