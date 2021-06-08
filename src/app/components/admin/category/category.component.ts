import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {AppDataState, DataStateEnum} from "../../../state/app.state";
import {User} from "../../../model/user.model";
import {AdminService} from "../../../shared/admin.service";
import {catchError, map, startWith} from "rxjs/operators";
import {EventsService} from "../../../shared/events.service";
import {Category} from "../../../model/category.model";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  allCategories$: Observable<AppDataState<Category[]>> | null = null;
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

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.allCategories$ = this.eventsService.getCategory().pipe(
      map(data => {
        return ({ dataState: DataStateEnum.LOADED, data: data } ) } ),
      startWith({ dataState: DataStateEnum.LOADING}),
      catchError(err => of( { dataState: DataStateEnum.ERROR, errorMessage: err.Message}))
    );
  }

}
