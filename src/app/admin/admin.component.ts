// admin.component.ts

import { Component, OnInit } from '@angular/core';
import { QuizServiceAdmin } from './admin.service';
import { Question } from './admin.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class QuizComponentAdmin implements OnInit {
  quizzes: any[] | undefined;
  newQuiz: any;

  constructor(private quizService: QuizServiceAdmin) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe((data) => {
      this.quizzes = data;
      // Initialize editing-related properties
      this.quizzes.forEach((quiz) => {
        quiz.isEditing = false;
        quiz.editedQuestion = '';
        quiz.editedImg = '';
        quiz.editedChoices = '';
      });
    });
  }

  toggleCorrect(question: Question): void {
    question.isCorrect = !question.isCorrect;
  }

  deleteQuiz(id: number): void {
    this.quizService.deleteQuiz(id).subscribe(() => {
      // Reload the quizzes after deletion
      this.loadQuizzes();
    });
  }

  // Toggle the visibility of the edit form
  showEditForm(quiz: any): void {
    quiz.isEditing = true;
    // Initialize edited values with current quiz values
    quiz.editedQuestion = quiz.question;
    quiz.editedImg = quiz.img;
    quiz.editedChoices = quiz.choices.join(', ');
  }

  // Update the quiz with edited values
  updateQuiz(quiz: any): void {
    // Split edited choices into an array using comma as a delimiter
    const editedChoicesArray = quiz.editedChoices.split(',');
    // Update quiz properties with edited values
    quiz.question = quiz.editedQuestion;
    quiz.img = quiz.editedImg;
    quiz.choices = editedChoicesArray;
    
    // Send an update request to the backend
    this.quizService.updateQuiz(quiz).subscribe(() => {
      quiz.isEditing = false;
      // Reload the quizzes after the update
      this.loadQuizzes();
    });
  }

  // Cancel editing and hide the edit form
  cancelEdit(quiz: any): void {
    quiz.isEditing = false;
  }

  createQuiz(newQuiz: any): void {
    // Split the comma-separated choices into an array
    const choicesArray = newQuiz.choices.split(',');
  
    // Create a new quiz object with the input data
    const quiz = {
      question: newQuiz.question,
      img: newQuiz.img,
      choices: choicesArray,
    };
  
    // Send a request to create the quiz using the quizService
    this.quizService.createQuiz(quiz).subscribe((createdQuiz) => {
      // Handle the response from the server (the created quiz)
      // You can add error handling here as well
      console.log('New quiz created:', createdQuiz);
  
      // Reload the quizzes after creation
      this.loadQuizzes();
    });
  }
}
