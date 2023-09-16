// quiz.component.ts

import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizzes: any[] | undefined;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe((data) => {
      this.quizzes = data;
    });
  }
}