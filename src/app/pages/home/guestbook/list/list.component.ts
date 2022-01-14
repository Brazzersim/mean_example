import {Component, OnInit} from '@angular/core';
import {faPencilAlt, faTrash, faPlus, faEye} from '@fortawesome/free-solid-svg-icons';
import {Guest} from "../../../../interfaces/guest.interface";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

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
  originalGuests: Guest[];
  searchTxt: null;
  searchForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({'searchTxt': null});
  }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('user')));
    this.guests = JSON.parse(localStorage.getItem('user')).guests;
    this.originalGuests = this.guests;
  }

  search() {
    if(this.textSearch == null || this.textSearch == '')
      this.guests = this.originalGuests;
    else
      this.guests = this.guests.filter(o => o.name == this.textSearch || o.surname == this.textSearch);
  }

  add() {
    this.router.navigate(['guestbook/create']);
  }

  delete(index) {
    this.guests.splice(index, 1);
  }

  show(index) {
    this.router.navigate([`guestbook/details/${index}`]);
  }

  update(index) {
    this.router.navigate([`guestbook/update/${index}`]);
  }

  get textSearch() {
    return this.searchForm.get('searchTxt').value;
  }
}
