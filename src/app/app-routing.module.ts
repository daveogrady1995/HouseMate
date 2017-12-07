import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'form', component: UserFormComponent },
  { path: 'preferences', component: UserPreferencesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }