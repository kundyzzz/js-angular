import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemsService, University } from '../../services/items.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-details',
  imports: [CommonModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit {

  university: University | null = null;
  isLoading = true;
  error = '';
  id = 0;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.loadItem(this.id);
    });
  }

  loadItem(id: number) {
    this.isLoading = true;
    this.error = '';

    this.itemsService.getUniversityById(id).subscribe({
      next: uni => {
        if (!uni) {
          this.error = 'Not found';
        } else {
          this.university = uni;
        }
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Error loading item details';
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.router.navigateByUrl('/items');
  }
}
