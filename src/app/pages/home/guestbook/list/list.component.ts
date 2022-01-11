import {Component, OnInit} from '@angular/core';
import {faPencilAlt, faTrash, faPlus, faEye} from '@fortawesome/free-solid-svg-icons';
import {Guest} from "../../../../interfaces/guest.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'list-root',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class GuestListComponent implements OnInit {
  faTrash = faTrash;
  faPlus = faPlus;
  faEye = faEye;
  faPencil = faPencilAlt;
  guests: Guest[];

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('user')));
    this.guests = JSON.parse(localStorage.getItem('user')).guests;
  }

  add() {
    this.router.navigate(['guestbook/create']);
  }

  delete(index) {
  }

  show(index) {
    this.router.navigate([`guestbook/details/${index}`]);
  }

  update(index) {
    this.router.navigate([`guestbook/update/${index}`]);
  }
}
