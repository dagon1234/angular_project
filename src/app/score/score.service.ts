// score.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Score } from './score.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private apiUrl = 'http://localhost:8080/scores';

  constructor(private http: HttpClient) {}

  getAllScores(): Observable<Score[]> {
    return this.http.get<Score[]>(this.apiUrl);
  }
}
