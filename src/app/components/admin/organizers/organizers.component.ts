import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {AppDataState, DataStateEnum} from "../../../state/app.state";
import {Category} from "../../../model/category.model";
import {EventsService} from "../../../shared/events.service";
import {catchError, map, startWith} from "rxjs/operators";
import {Organizers} from "../../../model/organizers.model";

@Component({
  selector: 'app-organizers',
  templateUrl: './organizers.component.html',
  styleUrls: ['./organizers.component.scss']
})
export class OrganizersComponent implements OnInit {
  allOrganizers$: Observable<AppDataState<Organizers[]>> | null = null;
  readonly DatastateEnum = DataStateEnum;

  errorMessage = false;


  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.getAllOrganizers();
  }

  getAllOrganizers() {
    this.allOrganizers$ = this.eventsService.getAllOrganizers().pipe(
      map(data => {
        return ({ dataState: DataStateEnum.LOADED, data: data } ) } ),
      startWith({ dataState: DataStateEnum.LOADING}),
      catchError(err => of( { dataState: DataStateEnum.ERROR, errorMessage: err.Message}))
    );
  }

}
