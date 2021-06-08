import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {AppDataState, DataStateEnum} from "../../../state/app.state";
import {Dashboard} from "../../../model/Dashboard.model";
import {AdminService} from "../../../shared/admin.service";
import {catchError, map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  AllStats: Dashboard

  constructor(private adminsService: AdminService) { }

  ngOnInit(): void {
    this.getAllStats();
  }

  getAllStats() {
    this.adminsService.getDashboard().subscribe(data => {
      this.AllStats = data;
    });
  }

}
