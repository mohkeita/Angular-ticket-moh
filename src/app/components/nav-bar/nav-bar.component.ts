import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from "../../shared/token-storage.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() connect: boolean;
  nomPrenom: string;
  isAdmin: boolean;
  isOpenedList: boolean;
  use: boolean;

  constructor(private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.connect) {
      const {fullLastname, role} = this.tokenService.getUser();
      this.isAdmin = role;
      if (this.isAdmin) {
        this.use = true
      }
      this.nomPrenom = fullLastname;
    }
  }

  logout(): void {
    this.tokenService.signOut();
    window.location.reload();
  }

  Onclickdrop() {
    if (this.isOpenedList) {
      this.isOpenedList = false;
    } else {
      this.isOpenedList = true
    }
  }

}
