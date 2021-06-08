import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {AppDataState, DataStateEnum} from "../../../state/app.state";
import {Organizers} from "../../../model/organizers.model";
import {EventsService} from "../../../shared/events.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  currentOrganizers$: Observable<AppDataState<Organizers>> | null = null;
  readonly DatastateEnum = DataStateEnum;

  genericLogo = "https://res.cloudinary.com/duraeqq2p/image/upload/v1621439803/eticket/c7p7gm1azovwssbckrwr.jpg"

  idOrganizers: number;

  constructor(private eventService: EventsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.idOrganizers = this.route.snapshot.params.id;
    this.getOrganizers(this.idOrganizers);
  }

  getOrganizers(id: number) {
    this.currentOrganizers$ = this.eventService.getOrganizers(id).pipe(
      map( data => {
        return ({ dataState: DataStateEnum.LOADED, data: data})}),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError( err => of( { dataState: DataStateEnum.ERROR, errorMessage: err.Message}))
    );
  }

}
