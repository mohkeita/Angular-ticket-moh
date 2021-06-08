import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../shared/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = false;
  isAdmin = false;
  userLogin: FormGroup;

  get getEmail() {
    return this.userLogin.get('email');
  }

  get getPassword() {
    return this.userLogin.get('password');
  }

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private tokenStorage: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.userLogin = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmitLogin(): void {
    this.authService.login(this.userLogin.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);


        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // @ts-ignore
        this.isAdmin = this.tokenStorage.getUser().role;
       // this.router.navigateByUrl('/');
        this.reloadPage();
      },
      err => {

        if (err.status !== 200) {
          this.errorMessage = true;
        }
        this.isLoginFailed = true;

      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
