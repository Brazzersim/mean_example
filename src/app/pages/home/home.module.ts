import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {GuestListComponent} from "./guestbook/list/list.component";
import {GuestComponent} from "./guestbook/home/guest.component";
import {GuestFormComponent} from "./guestbook/form/guest-form.component";
import {HomeRoutingModule} from "./home-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    GuestListComponent,
    GuestComponent,
    GuestFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class HomeModule { }
