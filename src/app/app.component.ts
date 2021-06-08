import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./shared/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ticket-moh';
  connect: boolean;

  constructor(private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.connect = !!this.tokenService.getToken();
  }
}
