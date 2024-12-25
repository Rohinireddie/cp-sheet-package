import axios from 'axios-typescript';
import { Contest , Submission , Problem } from './env/types';
import { API_URL } from './env/commonConstants';

export default class api{
    static async getAllContests(): Promise<Contest[] | undefined> {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
          const response = await axios.get(`${API_URL}/contest.list`);
          return response.data.result;
        } catch (error) {
          console.error(error);
        }
    }
    
    static async getUserSubmissions(
        handle: string
      ): Promise<Submission[] | undefined> {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
          const response = await axios.get(
            `${API_URL}/user.status?handle=${handle}`
          );
          if (response.status !== 200) return [];
          return response.data.result;
        } catch (error) {
          console.error(error);
        }
    }

    static async getAllProblems(): Promise<Problem[] | undefined> {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
          const response = await axios.get(`${API_URL}/problemset.problems`);
          return response.data.result.problems;
        } catch (error) {
          console.error(error);
        }
    }
}