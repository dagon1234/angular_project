// admin.model.ts

export interface Question {
    id: number;
    text: string;
    choices: string[];
    correctChoice: string;
    isCorrect?: boolean; 
  }
  
  export interface Quiz {
    id: number;
    name: string;
    questions: Question[];
  }
  