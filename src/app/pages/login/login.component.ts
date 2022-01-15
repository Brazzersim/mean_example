import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: string = null;

  constructor(
      private fb: FormBuilder,
      private route: Router,
      private service: HttpService
  ) {
    this.form = this.fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  ngOnInit() {

  }

  login() {
    this.service.login({username: this.username.value, password: this.password.value}).subscribe((data: any)=> {
      this.service.user = data.user;
      this.route.navigate(['guestbook']);
      this.error = null;
    }, error => {
      this.error = error.error.message;
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
}
