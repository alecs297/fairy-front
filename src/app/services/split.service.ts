import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Split from '../models/split';

@Injectable({
  providedIn: 'root'
})
export class SplitService {

  private API_URL = 'http://localhost:3000/api/v1/splits';
  
  constructor(private http: HttpClient) { }

  getSplits(): Observable<Split[]> {
    return this.http.get<Split[]>(this.API_URL);
  }

  getSplit(id: string): Observable<Split> {
    return this.http.get<Split>(`${this.API_URL}/${id}`);
  }

  createSplit(split: Split): Observable<Split> {
    return this.http.post<Split>(this.API_URL, split);
  }

  updateSplit(split: Split): Observable<Split> {
    return this.http.put<Split>(`${this.API_URL}/${split.id}`, split);
  }

  deleteSplit(id: string): Observable<Split> {
    return this.http.delete<Split>(`${this.API_URL}/${id}`);
  }
}
