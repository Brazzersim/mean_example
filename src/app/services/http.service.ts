import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {User} from '../interfaces/user.interface';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

const BASE_URL = `${environment.backend}/api`;

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private router: Router
    ) { }

    login(params?) {
        return this.http.post(`${BASE_URL}/login`, { username: params.username, password: params.password });
    }
    
    deleteGuest(id) {
        return this.http.delete(`${BASE_URL}/guest/${id}`).subscribe((response: any) => {
            this.toastr.success(response.message, "Success");
        }, (err) => {
            this.toastr.error(err.message, "Error");
        });
    }
    
    createGuest(data) {
        return this.http.post(`${BASE_URL}/guest`, { data }).subscribe((response: any) => {
            this.toastr.success(response.message, "Success");
            this.router.navigateByUrl('..');
        }, (err) => {
            this.toastr.error(err.message, "Error");
        });
    }

    updateGuest(id, data) {
        return this.http.put(`${BASE_URL}/guest/${id}`, { data }).subscribe((response: any) => {
            this.toastr.success(response.message, "Success");
            this.router.navigateByUrl('..');
        }, (err) => {
            this.toastr.error(err.message, "Error");
        });
    }

    getUserGuests(id) {
        return this.http.get(`${BASE_URL}/guest?user_id=${id}`);
    }
    
    getGuest(id) {
        return this.http.get(`${BASE_URL}/guest/${id}`);
    }
    
    get user(): User{
        return JSON.parse(localStorage.getItem('user'));
    }
    
    set user(data: User) {
        localStorage.setItem('user', JSON.stringify(data));
    }
}
