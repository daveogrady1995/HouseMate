import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AuthService } from './core/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Core
import { CoreModule } from './core/core.module';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
