import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemsService } from '../../services/items.service';
import * as ItemsActions from './items.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ItemsEffects {
  constructor(
    private actions$: Actions,
    private itemsService: ItemsService
  ) {}

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItems),
      mergeMap(({ query }) =>
        this.itemsService.getUniversities(query).pipe(
          map((items) => ItemsActions.loadItemsSuccess({ items })),
          catchError((error) =>
            of(ItemsActions.loadItemsFailure({ error: error.message || 'Failed to load items' }))
          )
        )
      )
    )
  );


  loadItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItem),
      mergeMap(({ id }) =>
        this.itemsService.getUniversityById(id).pipe(
          map((item) => {
            if (!item) throw new Error('Item not found');
            return ItemsActions.loadItemSuccess({ item });
          }),
          catchError((error) =>
            of(ItemsActions.loadItemFailure({ error: error.message || 'Failed to load item details' }))
          )
        )
      )
    )
  );
}
