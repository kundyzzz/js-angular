import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ItemCardComponent } from '../item-card/item-card.component';
import { loadItems } from '../../items/state/items.actions';
import { selectListLoading, selectItems, selectListError } from '../../items/state/items.selectors';
import { University } from '../../services/items.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ItemCardComponent],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css'
})
export class ItemsListComponent implements OnInit {
  universities$: Observable<University[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  searchQuery = '';

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.universities$ = this.store.select(selectItems);
    this.isLoading$ = this.store.select(selectListLoading);
    this.error$ = this.store.select(selectListError);
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.searchQuery = params.get('q') || '';
      this.store.dispatch(loadItems({ query: this.searchQuery }));
    });
  }

  onSearchChange() {
    this.router.navigate([], { queryParams: { q: this.searchQuery } });
  }
}
