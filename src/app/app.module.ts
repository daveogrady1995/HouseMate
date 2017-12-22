import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AuthService } from './core/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserFormComponent } from './user-form/user-form.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'hammerjs';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Core
import { CoreModule } from './core/core.module';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';


export const firebaseConfig = {
  apiKey: "AIzaSyAV5OkUJdAW68UNpjPuXmLI_nE7CPmeDLk",
  authDomain: "housemate-88328.firebaseapp.com",
  databaseURL: "https://housemate-88328.firebaseio.com",
  projectId: "housemate-88328",
  storageBucket: "",
  messagingSenderId: "997928221254"
};

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UserLoginComponent,
    UserFormComponent,
    UserPreferencesComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MDBBootstrapModule.forRoot(),
    ToastModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
