import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';
import { BrowseHousematesComponent } from './browse-housemates/browse-housemates.component';
import { UserRequestsComponent } from './user-requests/user-requests.component';
import { UserTeamsComponent } from './user-teams/user-teams.component';
import { TeamMessagesComponent } from './team-messages/team-messages.component';
import { BrowseFlatsComponent } from './browse-flats/browse-flats.component';
import { FlatDetailsComponent } from './flat-details/flat-details.component';

import { AuthGuard } from './core/auth.guard';
import { CoreModule } from './core/core.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'profile/:uid', component: UserProfileComponent },
  { path: 'form', component: UserFormComponent },
  { path: 'preferences', component: UserPreferencesComponent, canActivate: [AuthGuard] },
  { path: 'browse-housemates', component: BrowseHousematesComponent, canActivate: [AuthGuard] },
  { path: 'requests', component: UserRequestsComponent, canActivate: [AuthGuard] },
  { path: 'teams', component: UserTeamsComponent, canActivate: [AuthGuard] },
  { path: 'messages/:teamUid', component: TeamMessagesComponent, canActivate: [AuthGuard] },
  { path: 'messages/:teamUid/:flatUid', component: TeamMessagesComponent, canActivate: [AuthGuard] },
  { path: 'browse-flats/:teamUid', component: BrowseFlatsComponent, canActivate: [AuthGuard] },
  { path: 'flat-details/:teamUid/:flatUid', component: FlatDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }