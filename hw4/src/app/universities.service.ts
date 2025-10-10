import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversitiesService {
  private apiUrl = 'http://universities.hipolabs.com/search?country=Kazakhstan';

  constructor(private http: HttpClient) {}

  getUniversities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
