import { Component, OnInit } from '@angular/core';
import { QuizServiceAdmin } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class QuizComponentAdmin implements OnInit {
  quizzes: any[] | undefined;

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
}
