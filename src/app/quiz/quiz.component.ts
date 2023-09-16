// quiz.component.ts

import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import { Quiz, Question } from './quiz.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
    quiz: Quiz | undefined;
    selectedAnswers: { [key: number]: string } = {};
    score: number = 0; // Initialize to 0
  
    constructor(private quizService: QuizService) {}
  
    ngOnInit(): void {
      this.loadQuiz();
    }
  
    loadQuiz(): void {
      this.quizService.getQuiz().subscribe((data) => {
        this.quiz = data;
        // Initialize selectedAnswers with empty values for each question
        this.quiz.questions.forEach((question) => {
          this.selectedAnswers[question.id] = '';
        });
      });
    }
  
    checkAnswers(): void {
      if (!this.quiz) {
        return;
      }
  
      this.score = 0; // Reset score to 0
  
      this.quiz.questions.forEach((question) => {
        const selectedChoice = this.selectedAnswers[question.id];
        if (selectedChoice === question.correctChoice) {
          this.score++;
        }
      });
    }
  }