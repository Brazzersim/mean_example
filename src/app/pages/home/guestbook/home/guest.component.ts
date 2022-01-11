import {Component, OnInit} from '@angular/core';
import {User} from "../../../../interfaces/user.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'guest-root',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {
  user: User;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.setItem('user', null);
    this.router.navigate['login'];
  }
}
