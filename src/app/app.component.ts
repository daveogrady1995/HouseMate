import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { AuthService } from './core/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private auth: AuthService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
    // init toaster notification
    this.toastr.setRootViewContainerRef(vcr);
  }

  logout() {
    this.auth.signOut();
  }
  
}
