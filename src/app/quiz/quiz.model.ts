// quiz.model.ts

export interface Question {
    id: number;
    text: string;
    choices: string[];
    correctChoice: string;
  }
  
  export interface Quiz {
    id: number;
    questions: Question[];
  }
  