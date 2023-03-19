import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  getSplit(id: string | null): Observable<Split> {
    return of({
      id: "1",
      name: 'Split 1',
      url: 'https://www.google.com',
      date: new Date(),
      transactions: [
        {
          name: "bière",
          amount: 10,
          payer: "Alex"
        },
        {
          name: "bière",
          amount: 10,
          payer: "Alex"
        },
        {
          name: "bière",
          amount: 10,
          payer: "Connard 2"
        },
        {
          name: "bière",
          amount: 10,
          payer: "Connard 3"
        }
      ],
      users: [
        "Alex",
        "Connard 2",
        "Connard 3",
        "Loic"
      ]
    })
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
