import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: Router
  ) {
    this.form = this.fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  ngOnInit() {

  }

  login() {
    if(this.username.value != 'admin' || this.password.value != 'admin') {
      console.log(this.username.value);
      this.error = true;
      return;
    }
    this.error = false;
    localStorage.setItem('user', JSON.stringify({name: 'admin', email: 'admin@admin.com', guests: [
        {name: 'ciccio', surname: 'pappalardo', email: 'pasticcio@email.it'},
        {name: 'franco', surname: 'pappalardo', email: 'falegname@email.it'}
      ]}));
    this.route.navigate(['guestbook']);
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
}
