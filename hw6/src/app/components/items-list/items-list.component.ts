import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemsService, University } from '../../services/items.service';
import { ItemCardComponent } from '../item-card/item-card.component';

@Component({
  selector: 'app-items-list',
  imports: [CommonModule, RouterModule, FormsModule, ItemCardComponent ],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css'
})
export class ItemsListComponent implements OnInit {
  universities: University[] = [];
  searchQuery = '';
  isLoading = true;
  error = '';

  constructor(
    private itemsService: ItemsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.searchQuery = params.get('q') || '';
      this.fetchUniversities(this.searchQuery);
    });
  }

  fetchUniversities(query: string) {
    this.isLoading = true;
    this.error = '';
    this.itemsService.getUniversities(query).subscribe({
      next: data => {
        this.universities = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Error loading universities';
        this.isLoading = false;
      }
    });
  }

  onSearchChange() {
    this.router.navigate([], { queryParams: { q: this.searchQuery } });
  }
}
