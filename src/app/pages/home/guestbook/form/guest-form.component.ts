import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from '../../../../services/http.service';
import {User} from '../../../../interfaces/user.interface';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'create-root',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.scss']
})
export class GuestFormComponent implements OnInit {
  txtSubmit: string;
  txtTitle: string;
  faArrowLeft = faArrowLeft;
  form: FormGroup;
  op: string;
  user: User;
  
  constructor(
      private fb: FormBuilder,
      private route: Router,
      private router: ActivatedRoute,
      private service: HttpService,
      private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      'name': [null, Validators.required],
      'surname': [null, Validators.required],
      'email': [null, Validators.required],
      'phone': null,
      'address': null,
      'city': null,
      'zip': null
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    // @ts-ignore
    this.op = this.router.url.value[0].path;
    switch(this.op) {
      case 'create':
        this.txtTitle = "Add New Guest";
        this.txtSubmit = "Create";
        break;
      case 'update':
        this.service.getGuest(this.router.snapshot.params.id).subscribe((data: any) => {
          const guest = data.guest;
          this.txtTitle = `Guest: ${guest.name} ${guest.surname}`;
          this.form.patchValue(guest);
        });
        this.txtSubmit = "Update";
        break;
      case 'details':
        this.service.getGuest(this.router.snapshot.params.id).subscribe((data: any) => {
          const guest = data.guest;
          this.txtTitle = `Guest: ${guest.name} ${guest.surname}`;
          this.form.patchValue(guest);
        });
        break;
    }
  }

  submit() {
    if(this.form.valid) {
      let data = this.form.value;
      data.user_id = this.user._id;

      switch (this.op) {
        case 'create':
          this.service.createGuest(data);
          break;
        case 'update':
          this.service.updateGuest(this.router.snapshot.params.id, data);
          break;
        default:
          break;
      }
    } else 
      this.toastr.error("Name,  Surname and E-mail fields are required", "Error");
  }

  back() {
    this.route.navigateByUrl('..');
  }

}
