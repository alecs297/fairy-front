import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Split from '../models/split';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SplitService {

  private API_URL = environment.API_URL + "splits";
  
  constructor(private http: HttpClient) { }

  getSplits(): Observable<Split[]> {
    return this.http.get<Split[]>(this.API_URL);
  }

  getSplit(id: string | null): Observable<Split> {
    return this.http.get<Split>(`${this.API_URL}/${id}`);
  }

  createSplit(): Observable<Split> {
    return this.http.post<Split>(this.API_URL, {});
  }

  updateSplit(split: Split): Observable<Split> {
    return this.http.put<Split>(`${this.API_URL}/${split._id}`, split);
  }

  deleteSplit(id: string): Observable<Split> {
    return this.http.delete<Split>(`${this.API_URL}/${id}`);
  }
}
