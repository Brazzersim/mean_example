import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private router: ActivatedRoute
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
    // @ts-ignore
    this.op = this.router.url.value[0].path;
    switch(this.op) {
      case 'create':
        this.txtTitle = "Add New Guest";
        this.txtSubmit = "Create";
        break;
      case 'update':
        this.txtTitle = "Update Guest";
        this.txtSubmit = "Update";
        break;
      case 'details':
        this.txtTitle = `Guest: ${'ciccio'} ${'pasticcio'}`;
        break;
    }
  }

  submit() {

  }

  back() {
    this.route.navigate(['guestbook']);
  }

}
