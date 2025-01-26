// src/types/apiResponses.ts
export interface Contest {
    id: number;
    name: string;
  }
  
  export interface UserSubmission {
    id: number;
    verdict: string;
  }
  
  export interface Problem {
    id: number;
    name: string;
  }
  
  export interface ContestResponse {
    result: Contest[];
  }
  
  export interface UserSubmissionsResponse {
    result: UserSubmission[];
  }
  
  export interface ProblemResponse {
    result: {
      problems: Problem[];
    };
  }