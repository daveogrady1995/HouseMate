import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService} from './auth.service';

import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, 
    private router: Router,
    public toastr: ToastsManager) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.auth.user.pipe(
      take(1),
      map((user) => !!user),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.toastr.warning('Please login before you can access this page', 'Restricted!');
          this.router.navigate(['/login']);
        }
      }),
    );
  }
}