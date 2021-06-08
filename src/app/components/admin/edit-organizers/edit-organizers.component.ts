import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../shared/admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventsService} from "../../../shared/events.service";

@Component({
  selector: 'app-edit-organizers',
  templateUrl: './edit-organizers.component.html',
  styleUrls: ['./edit-organizers.component.scss']
})
export class EditOrganizersComponent implements OnInit {
  isEmpty:boolean;
  error:boolean;

  count = 3;
  show: boolean;

  spiner = false;

  organizersForm: FormGroup;
  errorMessage = false;
  idUser:number;
  succes: boolean;
  idOganizers: number;

  get name() {
    return this.organizersForm.get('name');
  }
  get about() {
    return this.organizersForm.get('about');
  }

  get email() {
    return this.organizersForm.get('email');
  }

  get phone() {
    return this.organizersForm.get('phone');
  }
  get street() {
    return this.organizersForm.get('street');
  }
  get city() {
    return this.organizersForm.get('city');
  }

  constructor(private adminService: AdminService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private eventService: EventsService,
              private router: Router) {
    this.idOganizers = route.snapshot.params.id;
    //getOrganizers
  }

  ngOnInit(): void {
    this.eventService.getOrganizers(this.idOganizers)
      .subscribe(organizers => {
        this.organizersForm = this.fb.group({
          id: [organizers.id],
          name: [organizers.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          email: [organizers.email, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          phone: [organizers.phone, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          about: [organizers.about, [Validators.required, Validators.minLength(3), Validators.maxLength(400)]],
          addressId: [organizers.addressId],
          street: [organizers.street, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
          city: [organizers.city, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        });

      });

  }

  onSubmitUpdateOrganizers() {

    if (this.organizersForm.invalid) {
      console.log(this.organizersForm.value)
      this.isEmpty = true;
      this.spiner = false;
      return;
    }

    this.adminService.updateOrganizers(this.organizersForm.value)
      .subscribe(data => {
        this.succes = true;
        this.spiner = false;

        let timeout = setInterval(() => {
          this.show = true;
          if (this.count > 1) {
            this.count -= 1;
          } else {
            clearInterval(timeout);
            this.router.navigateByUrl('/admin/organizers');
          }
        }, 1000);

      }, err => {
        if (err.status !== 200) {
          this.errorMessage = true;
        }
      });

  }

  onClick(){
    this.spiner = true;
  }

}
