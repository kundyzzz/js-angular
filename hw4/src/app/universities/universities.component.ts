import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UniversitiesService } from '../universities.service';


@Component({
  selector: 'app-universities',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.css']
})
export class UniversitiesComponent {
  universities: any[] = [];
  loading = false;

  constructor(private universitiesService: UniversitiesService) {}

  loadUniversities() {
    this.loading = true;
    this.universitiesService.getUniversities().subscribe({
      next: (data) => {
        this.universities = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error', err);
        this.loading = false;
      }
    });
  }
}
