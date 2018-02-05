import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';
import { BrowseHousematesComponent } from './browse-housemates/browse-housemates.component';

import { AuthGuard } from './core/auth.guard';
import { CoreModule } from './core/core.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'profile/:uid', component: UserProfileComponent },
  { path: 'form', component: UserFormComponent },
  { path: 'preferences', component: UserPreferencesComponent, canActivate: [AuthGuard] },
  { path: 'browse-housemates', component: BrowseHousematesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }