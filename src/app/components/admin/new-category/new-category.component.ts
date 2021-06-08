import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../shared/admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {
  isEmpty:boolean;
  error:boolean;

  count = 3;
  show: boolean;
  spinner = false;

  categoryForm: FormGroup;
  errorMessage = false;
  idUser:number;
  succes: boolean;

  get name() {
    return this.categoryForm.get('name');
  }

  constructor(private adminService: AdminService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],

    });
  }

  onSubmitCatgory() {

    if (this.categoryForm.invalid) {
      console.log(this.categoryForm.value)
      this.isEmpty = true;
      this.spinner = false;
      return;
    }

    this.adminService.createCategory(this.categoryForm.value)
      .subscribe(data => {
        this.succes = true;
        this.spinner = false;

        let timeout = setInterval(() => {
          this.show = true;
          if (this.count > 1) {
            this.count -= 1;
          } else {
            clearInterval(timeout);
            this.router.navigateByUrl('/admin/category');
          }
        }, 1000);

      }, err => {
        if (err.status !== 200) {
          this.errorMessage = true;
          this.spinner = false;
        }
      });

  }

  onClick(){
    this.spinner = true;
  }

}
