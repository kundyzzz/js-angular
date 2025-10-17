import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UniversitiesService } from '../universities.service';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, switchMap, takeUntil, of } from 'rxjs';

@Component({
  selector: 'app-universities',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.css']
})
export class UniversitiesComponent implements OnDestroy {
  universities: any[] = [];
  filteredUniversities: any[] = [];
  searching = '';

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private universitiesService: UniversitiesService) {
    this.searchSubject
      .pipe(
        debounceTime(400),
        switchMap((term) => {
          if (!term.trim()) {
            return of(this.universities);
          }
          return this.universitiesService.searchUniversities(term);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data) => (this.filteredUniversities = data),
        error: (err) => console.error('Search error:', err)
      });
  }

  loadUniversities() {
    this.universitiesService.getUniversities().subscribe({
      next: (data) => {
        this.universities = data;
        this.filteredUniversities = data;
      },
      error: (err) => console.error('Error', err)
    });
  }

  onSearchChange() {
    this.searchSubject.next(this.searching);
  }

  manualSearch() {
    this.searchSubject.next(this.searching);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
