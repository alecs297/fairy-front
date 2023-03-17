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
}
