import {Component, OnInit} from '@angular/core';
import {User} from "../../../../interfaces/user.interface";
import {Router} from "@angular/router";
import {HttpService} from '../../../../services/http.service';

@Component({
  selector: 'guest-root',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {
  user: User;

  constructor(
    private router: Router,
    public service: HttpService
  ) {
  }

  ngOnInit() {
  }

  logout() {
    this.service.user = null;
    this.router.navigate(['login']);
  }
}
