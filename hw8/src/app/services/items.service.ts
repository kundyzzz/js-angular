import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface University {
  id: number;  
  name: string;
  country: string;
  ["state-province"]: string | null;
  domains: string[];
  alpha_two_code: string;
  web_pages: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private baseUrl = 'http://universities.hipolabs.com/search';

  constructor(private http: HttpClient) {}

  getUniversities(query?: string): Observable<University[]> {
    let url = `${this.baseUrl}?country=Kazakhstan`;

    if (query) {
      url += `&name=${query}`;
    }

    return this.http.get<Omit<University, 'id'>[]>(url).pipe(
      map((items) =>
        items.map((item) => ({
          ...item,
          id: this.generateId(item)
        }))
      )
    );
  }

  private generateId(item: Omit<University, 'id'>): number {
    return (item.name + item.country).length;
  }
  
  getUniversityById(id: number): Observable<University | undefined> {
    return this.getUniversities().pipe(
      map(items => items.find(u => u.id === id))
    );
  }
}

