// quiz.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from './quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:8080/quizzes';

  constructor(private http: HttpClient) {}

  getQuiz(): Observable<Quiz> {
    return this.http.get<Quiz>(this.apiUrl);
  }
}
