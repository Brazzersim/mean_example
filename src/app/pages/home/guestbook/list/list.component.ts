import {Component, OnInit} from '@angular/core';
import {faPencilAlt, faTrash, faPlus, faEye} from '@fortawesome/free-solid-svg-icons';
import {Guest} from "../../../../interfaces/guest.interface";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpService} from '../../../../services/http.service';

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
        private fb: FormBuilder,
        private service: HttpService
    ) {
        this.searchForm = this.fb.group({'searchTxt': null});
    }

    ngOnInit() {
        this.service.getUserGuests(this.service.user._id).subscribe((data: any) => {
            this.guests = data.guests;
            this.originalGuests = this.guests;
        });
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
        this.service.deleteGuest(this.guests[index]._id);
        this.guests.splice(index, 1);
    }

    show(index) {
        this.router.navigate([`guestbook/details/${this.guests[index]._id}`]);
    }

    update(index) {
        this.router.navigate([`guestbook/update/${this.guests[index]._id}`]);
    }

    get textSearch() {
        return this.searchForm.get('searchTxt').value;
    }
}
