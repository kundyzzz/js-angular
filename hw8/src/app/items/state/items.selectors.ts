import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemsState } from './items.reducer';


export const selectItemsFeature = createFeatureSelector<ItemsState>('items');


export const selectItems = createSelector(
  selectItemsFeature,
  (state) => state.items
);

export const selectListLoading = createSelector(
  selectItemsFeature,
  (state) => state.listLoading
);

export const selectListError = createSelector(
  selectItemsFeature,
  (state) => state.listError
);

export const selectSelectedItem = createSelector(
  selectItemsFeature,
  (state) => state.selectedItem
);

export const selectDetailsLoading = createSelector(
  selectItemsFeature,
  (state) => state.detailsLoading
);

export const selectDetailsError = createSelector(
  selectItemsFeature,
  (state) => state.detailsError
);
