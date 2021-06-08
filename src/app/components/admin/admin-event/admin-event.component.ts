import {Component, Input, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {AppDataState, DataStateEnum} from "../../../state/app.state";
import {catchError, map, startWith} from "rxjs/operators";
import {AdminService} from "../../../shared/admin.service";
import {EventsAdmin} from "../../../model/EventsAdmin";

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['./admin-event.component.scss']
})
export class AdminEventComponent implements OnInit {

  eventsList$: Observable<AppDataState<EventsAdmin[]>> | null = null;
  readonly DatastateEnum = DataStateEnum;

  isSuccesful = false;
  errorMessage = false;


  get color(): string {
    return this._color;
  }

  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private adminsService: AdminService) { }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventsList$ = this.adminsService.getAllEvents().pipe(
      map(data => {
        return ({ dataState: DataStateEnum.LOADED, data: data } ) } ),
      startWith({ dataState: DataStateEnum.LOADING}),
      catchError(err => of( { dataState: DataStateEnum.ERROR, errorMessage: err.Message}))
    );
  }

}
