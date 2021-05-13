import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { from, of } from 'rxjs';
import { map, switchMap, catchError, take, tap } from 'rxjs/operators';

import { environment } from '@src/environments/environment';

import { User } from './user.models';

import * as fromActions from './user.actions';

import { NotificationService } from '@app/services';

@Injectable()
export class UserEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.init),
      switchMap(() => this.afAuth.authState.pipe(take(1))),
      switchMap(authState => {
        if (authState) {

          return this.afs.doc<User>(`users/${authState.uid}`).valueChanges().pipe(
            take(1),
            map(user => fromActions.initAuthorized({ uid: authState.uid, user: user || null })),
            catchError(err => of(fromActions.initError({ error: err.message })))
          );

        } else {
          return of(fromActions.initUnauthorized());
        }
      })
    );
  });

  signInEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.signInEmail),
      map(action => action.credentials),
      switchMap(credentials =>
        from(this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password)).pipe(
          switchMap(signInState =>
            this.afs.doc<User>(`users/${signInState.user?.uid}`).valueChanges().pipe(
              take(1),
              tap(() => {
                this.router.navigate(['/']);
              }),
              // tslint:disable-next-line:no-non-null-assertion
              map(user => fromActions.signInEmailSuccess({ uid: signInState.user!.uid, user: user || null }))
            )
          ),
          catchError(err => {
            this.notification.error(err.message);
            return of(fromActions.signInEmailError({ error: err.message }));
          })
        )
      )
    );
  });

  signUpEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.signUpEmail),
      map(action => action.credentials),
      switchMap(credentials =>
        from(this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)).pipe(
          switchMap(() => from(this.afAuth.currentUser)),
          tap(user => {
            user?.sendEmailVerification(environment.firebase.actionCodeSettings);
            this.router.navigate(['/auth/email-confirm']);
          }),
          // tslint:disable-next-line:no-non-null-assertion
          map((user) => fromActions.signUpEmailSuccess({ uid: user!.uid })),
          catchError(err => {
            this.notification.error(err.message);
            return of(fromActions.signUpEmailError({ error: err.message }));
          })
        )
      )
    );
  });

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.signOut),
      switchMap(() =>
        from(this.afAuth.signOut()).pipe(
          map(() => fromActions.signOutSuccess()),
          catchError(err => of(fromActions.signOutError(err.message)))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notification: NotificationService) {
  }
}
