import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {AppDataState, DataStateEnum} from "../../state/app.state";
import {MyTicket} from "../../model/myTicketModel";
import {EventsService} from "../../shared/events.service";
import {catchError, map, startWith} from "rxjs/operators";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "@techiediaries/ngx-qrcode";

@Component({
  selector: 'app-myticket',
  templateUrl: './myticket.component.html',
  styleUrls: ['./myticket.component.scss']
})
export class MyticketComponent implements OnInit {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;


  tickets$: Observable<AppDataState<MyTicket[]>> | null = null;
  readonly DatastateEnum = DataStateEnum;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.getAllTickets();
  }

  getAllTickets() {
    this.tickets$ = this.eventsService.getAllMyTicket().pipe(
      map(data => {
        return ({ dataState: DataStateEnum.LOADED, data: data } ) } ),
      startWith({ dataState: DataStateEnum.LOADING}),
      catchError(err => of( { dataState: DataStateEnum.ERROR, errorMessage: err.Message}))
    );
  }

}
