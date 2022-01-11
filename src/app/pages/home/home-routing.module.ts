import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GuestListComponent} from "./guestbook/list/list.component";
import {GuestFormComponent} from "./guestbook/form/guest-form.component";
import {GuestComponent} from "./guestbook/home/guest.component";

const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'list',
        component: GuestListComponent
      },
      {
        path: 'create',
        component: GuestFormComponent
      },
      {
        path: 'update/:id',
        component: GuestFormComponent
      },
      {
        path: 'details/:id',
        component: GuestFormComponent
      },
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: '**', redirectTo: 'list', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
