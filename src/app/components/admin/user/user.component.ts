import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {AppDataState, DataStateEnum} from "../../../state/app.state";
import {User} from "../../../model/user.model";
import {AdminService} from "../../../shared/admin.service";
import {catchError, map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users$: Observable<AppDataState<User[]>> | null = null;
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
    this.getAllUsers();
  }

  getAllUsers() {
    this.users$ = this.adminsService.getAllUsers().pipe(
      map(data => {
        return ({ dataState: DataStateEnum.LOADED, data: data } ) } ),
      startWith({ dataState: DataStateEnum.LOADING}),
      catchError(err => of( { dataState: DataStateEnum.ERROR, errorMessage: err.Message}))
    );
  }

  onBlockUnbloc(u: User) {
    this.adminsService.BlockUnblocbkUser(u)
      .subscribe( data => {
        this.isSuccesful = true;
        this.reloadPage();
      }, err => {
        this.errorMessage = true;
      });
  }

  reloadPage(): void {
    window.location.reload();
  }

}
