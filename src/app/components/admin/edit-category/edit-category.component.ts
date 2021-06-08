import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../shared/admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventsService} from "../../../shared/events.service";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  isEmpty:boolean;
  error:boolean;

  count = 3;
  show: boolean;
  spinner = false;

  categoryForm: FormGroup;
  errorMessage = false;
  idUser:number;
  succes: boolean;

  idCategogy: number;

  get name() {
    return this.categoryForm.get('name');
  }

  constructor(private adminService: AdminService,
              private fb: FormBuilder,
              private eventService: EventsService,
              private route: ActivatedRoute,
              private router: Router,) {
    this.idCategogy = route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.eventService.getOneCategory(this.idCategogy)
      .subscribe( category => {
        this.categoryForm = this.fb.group({
          id: [category.id],
          name: [category.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        });
      });

  }

  onSubmitUpdateCatgory() {

    if (this.categoryForm.invalid) {
      console.log(this.categoryForm.value)
      this.isEmpty = true;
      this.spinner = false;
      return;
    }

    this.adminService.updateCategory(this.categoryForm.value)
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
