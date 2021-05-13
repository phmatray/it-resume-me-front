import { createAction, props } from '@ngrx/store';
import { Dictionaries } from '@app/store/dictionaries/dictionaries.models';

export const read = createAction(
  '[Dictionaries] Read: Start'
);

export const readSuccess = createAction(
  '[Dictionaries] Read: Success',
  props<{ dictionaries: Dictionaries }>()
);

export const readError = createAction(
  '[Dictionaries] Read: Error',
  props<{ error: string }>()
);
