import { createReducer, on } from '@ngrx/store';
import { University } from '../../services/items.service';
import * as ItemsActions from './items.actions';


export interface ItemsState {
  items: University[];
  selectedItem: University | null;
  listLoading: boolean;
  detailsLoading: boolean;
  listError: string | null;
  detailsError: string | null;
}

export const initialState: ItemsState = {
  items: [],
  selectedItem: null,
  listLoading: false,
  detailsLoading: false,
  listError: null,
  detailsError: null,
};


export const itemsReducer = createReducer(
  initialState,

  on(ItemsActions.loadItems, (state) => ({
    ...state,
    listLoading: true,
    listError: null,
  })),
  on(ItemsActions.loadItemsSuccess, (state, { items }) => ({
    ...state,
    items,
    listLoading: false,
    listError: null,
  })),
  on(ItemsActions.loadItemsFailure, (state, { error }) => ({
    ...state,
    listLoading: false,
    listError: error,
  })),



  on(ItemsActions.loadItem, (state) => ({
    ...state,
    detailsLoading: true,
    detailsError: null,
    selectedItem: null,
  })),
  on(ItemsActions.loadItemSuccess, (state, { item }) => ({
    ...state,
    selectedItem: item,
    detailsLoading: false,
    detailsError: null,
  })),
  on(ItemsActions.loadItemFailure, (state, { error }) => ({
    ...state,
    selectedItem: null,
    detailsLoading: false,
    detailsError: error,
  }))
);
