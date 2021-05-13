import { createReducer, on } from '@ngrx/store';

import { Dictionaries } from './dictionaries.models';
import * as fromActions from './dictionaries.actions';

export interface DictionariesState {
  entities: Dictionaries | null;
  loading: boolean;
  error: string | null;
}

const initialState: DictionariesState = {
  entities: null,
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,

  on(fromActions.read, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(fromActions.readSuccess, (state, action) => ({
    ...state,
    entities: action.dictionaries,
    loading: false
  })),

  on(fromActions.readError, (state, action) => ({
    ...state,
    entities: null,
    loading: false,
    error: action.error
  })),
);
