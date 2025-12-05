import { createAction, props } from '@ngrx/store';
import { University } from '../../services/items.service';

export const loadItems = createAction(
  '[Items] Load Items',
  props<{ query?: string }>()
);

export const loadItemsSuccess = createAction(
  '[Items] Load Items Success',
  props<{ items: University[] }>()
);

export const loadItemsFailure = createAction(
  '[Items] Load Items Failure',
  props<{ error: string }>()
);

//by id
export const loadItem = createAction(
  '[Items] Load Item',
  props<{ id: number }>()
);

export const loadItemSuccess = createAction(
  '[Items] Load Item Success',
  props<{ item: University }>()
);

export const loadItemFailure = createAction(
  '[Items] Load Item Failure',
  props<{ error: string }>()
);
