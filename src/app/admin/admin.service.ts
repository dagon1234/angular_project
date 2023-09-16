import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceAdmin {
  private apiUrl = 'http://localhost:8080/quizzes';

  constructor(private http: HttpClient) {}

  getAllQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createQuiz(newQuiz: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newQuiz);
  }

  updateQuiz(quiz: any): Observable<any> {
    const url = `${this.apiUrl}/${quiz.id}`;
    return this.http.put<any>(url, quiz);
  }

  deleteQuiz(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
