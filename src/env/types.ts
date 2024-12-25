export interface Contest {
    id: number;
    name: string;
    phase: string;
    [key: string]: any;
  }
  
export interface Problem {
    contestId: number;
    rating?: number;
    index: string;
    name: string;
    [key: string]: any;
}
  
export interface Submission {
    id: number;
    [key: string]: any;
}