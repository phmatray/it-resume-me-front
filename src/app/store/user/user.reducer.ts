import { createReducer, on } from '@ngrx/store';

import { User } from './user.models';
import * as fromActions from './user.actions';

export interface UserState {
  entity: User | null;
  uid: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  entity: null,
  uid: null,
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,

  // Sign In

  on(fromActions.signInEmail, (state) => ({
    ...state,
    loading: true
  })),

  on(fromActions.signInEmailSuccess, (state, action) => ({
    ...state,
    entity: action.user,
    uid: action.uid,
    loading: false,
    error: null
  })),

  on(fromActions.signInEmailError, (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  })),

  // Sign Up

  on(fromActions.signUpEmail, (state) => ({
    ...state,
    loading: true
  })),

  on(fromActions.signUpEmailSuccess, (state, action) => ({
    ...state,
    uid: action.uid,
    loading: false
  })),

  on(fromActions.signUpEmailError, (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  })),

  // Sign Out

  on(fromActions.signOut, (state) => ({
    ...state,
    loading: true
  })),

  on(fromActions.signOutSuccess, () => ({
    ...initialState
  })),

  on(fromActions.signOutError, (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  }))
);
