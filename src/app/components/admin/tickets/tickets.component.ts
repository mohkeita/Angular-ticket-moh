import {Component, Input, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {AppDataState, DataStateEnum} from "../../../state/app.state";
import {User} from "../../../model/user.model";
import {AdminAllTicket} from "../../../model/AllTicketAdmin.Model";
import {AdminService} from "../../../shared/admin.service";
import {catchError, map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  AllTicket$: Observable<AppDataState<AdminAllTicket[]>> | null = null;
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
    this.getAllTickets();
  }

  getAllTickets() {
    this.AllTicket$ = this.adminsService.getAdminTickets().pipe(
      map(data => {
        return ({ dataState: DataStateEnum.LOADED, data: data } ) } ),
      startWith({ dataState: DataStateEnum.LOADING}),
      catchError(err => of( { dataState: DataStateEnum.ERROR, errorMessage: err.Message}))
    );
  }

}
