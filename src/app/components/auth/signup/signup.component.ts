import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/auth.service";
import {forbiddenNameValidator} from "../../../shared/user-name.validator";
import {PasswordValidator} from "../../../shared/password.validator";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userSignup: FormGroup;
  isSuccesful = false;
  errorMessage = false;

  get username() {
    return this.userSignup.get('username');
  }
  get password() {
    return this.userSignup.get('password');
  }

  get getEmail() {
    return this.userSignup.get('email');
  }

  get firstname() {
    return this.userSignup.get('firstname');
  }

  get lastname() {
    return this.userSignup.get('lastname');
  }

  get dateBirth() {
    return this.userSignup.get('dateBirth');
  }

  constructor(private authService: AuthService,
              private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.userSignup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), forbiddenNameValidator(/password/)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      dateBirth: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, {validator: PasswordValidator});
  }

  onSubmitSignup(): void {
    this.authService.register(this.userSignup.value).subscribe(
      data => {
        this.isSuccesful = true;
      },
      err => {
        if (err.status !== 200) {
          this.errorMessage = true;
        }
        this.isSuccesful = false;
      }
    );

  }

}
