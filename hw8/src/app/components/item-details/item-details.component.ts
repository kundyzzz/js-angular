import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadItem } from '../../items/state/items.actions';
import { selectSelectedItem, selectDetailsLoading, selectDetailsError } from '../../items/state/items.selectors';
import { University } from '../../services/items.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit {
  university$: Observable<University | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  id = 0;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    this.university$ = this.store.select(selectSelectedItem);
    this.isLoading$ = this.store.select(selectDetailsLoading);
    this.error$ = this.store.select(selectDetailsError);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.store.dispatch(loadItem({ id: this.id }));
    });
  }

  goBack() {
    this.router.navigateByUrl('/items');
  }
}
