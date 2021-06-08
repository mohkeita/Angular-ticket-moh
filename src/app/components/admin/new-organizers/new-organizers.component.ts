import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../shared/admin.service";
import {Router} from "@angular/router";
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-new-organizers',
  templateUrl: './new-organizers.component.html',
  styleUrls: ['./new-organizers.component.scss']
})
export class NewOrganizersComponent implements OnInit {
  isEmpty:boolean;
  error:boolean;

  errorImage = false;

  spiner = false;

  files: File[] = [];
  file = false;
  progress = 0;
  image = '';

  count = 3;
  show: boolean;


  organizersForm: FormGroup;
  errorMessage = false;
  idUser:number;
  succes: boolean;

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
              private router: Router) { }

  ngOnInit(): void {
    this.organizersForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      about: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(400)]],
      logo: [this.image],
      street: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });
  }

  onSubmitOrganizers() {
    if (this.organizersForm.invalid) {
      console.log(this.organizersForm.value)
      this.isEmpty = true;
      this.spiner = false;
      return;
    }

    //console.log()

    this.adminService.createOrganizers(this.organizersForm.value)
      .subscribe(data => {
        this.succes = true;
        this.spiner = false

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
          this.spiner = false
        }
      });

  }

  onClick(){
    this.spiner = true;
  }

  onSelect(event) {
    this.files.push(event.target.files[0]);


    //send to cloudinary
    const file_data = this.files[0];

    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'moheticket');
    data.append('cloud_name', 'duraeqq2p');

    this.adminService.uploadImage(data)
      .subscribe(response => {

        if (response.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * response.loaded / response.total);
        } else {
          this.file = true;
          if (response.body) {
            this.image = response.body.secure_url;
          }
        }
      } , err => {
          this.errorImage = true;
      });
  }

  Undelete(){
    delete this.files[0];
    this.file = false;
    this.image = '';
    this.progress = 0;
  }



}
