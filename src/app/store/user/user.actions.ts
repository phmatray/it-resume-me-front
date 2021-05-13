import { createAction, props } from '@ngrx/store';
import { User, EmailPasswordCredentials } from '@app/store/user/user.models';

// Sign In

export const signInEmail = createAction(
  '[User] Sign In with email: Start',
  props<{ credentials: EmailPasswordCredentials }>()
);

export const signInEmailSuccess = createAction(
  '[User] Sign In with email: Success',
  props<{ uid: string, user: User | null }>()
);

export const signInEmailError = createAction(
  '[User] Sign In with email: Error',
  props<{ error: string }>()
);

// Sign Up

export const signUpEmail = createAction(
  '[User] Sign Up with email: Start',
  props<{ credentials: EmailPasswordCredentials }>()
);

export const signUpEmailSuccess = createAction(
  '[User] Sign Up with email: Success',
  props<{ uid: string }>()
);

export const signUpEmailError = createAction(
  '[User] Sign Up with email: Error',
  props<{ error: string }>()
);

// Sign Out


export const signOut = createAction(
  '[User] Sign Out: Start'
);

export const signOutSuccess = createAction(
  '[User] Sign Out: Success'
);

export const signOutError = createAction(
  '[User] Sign Out: Error',
  props<{ error: string }>()
);
