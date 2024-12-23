//codeforcesAPI.ts

import axios from "axios-typescript";

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

export default class CodeforcesAPI {
  static API_URL = "https://codeforces.com/api";
  static FINISHED_PHASE = "FINISHED";

  static async getAllContests(): Promise<Contest[] | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await axios.get(`${this.API_URL}/contest.list`);
      return response.data.result;
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllPastContests(
    numberOfContests: number,
    validContests: string[]
  ): Promise<Contest[] | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const contests = await this.getAllContests();
    if (!contests) return;
    return contests
      .filter((c) => c.phase == this.FINISHED_PHASE)
      .filter((c) => validContests.some((v) => c.name.includes(v)))
      .sort((a, b) => b.id - a.id)
      .slice(0, Math.min(numberOfContests, contests.length));
  }

  static async getUsersSubmissions(
    handles: string[]
  ): Promise<Set<Submission> | undefined> {
    const submissions = new Set<Submission>();
    for (const handle of handles) {
      const userSubmissions = await this.getUserSubmissions(handle);
      userSubmissions?.forEach((s) => submissions.add(s));
    }
    return submissions;
  }

  static async getUserSubmissions(
    handle: string
  ): Promise<Submission[] | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await axios.get(
        `${this.API_URL}/user.status?handle=${handle}`
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
      const response = await axios.get(`${this.API_URL}/problemset.problems`);
      return response.data.result.problems;
    } catch (error) {
      console.error(error);
    }
  }

  static async getProblemsForContests(
    contests: Contest[]
  ): Promise<Problem[] | undefined> {
    const contestIds = contests.map((c) => c.id);
    const allProblems = await this.getAllProblems();
    if (!allProblems) return;
    return allProblems.filter((p) => contestIds.includes(p.contestId));
  }

  static async getProblemsFromPastContestsByRating(
    numberOfContests: number,
    minRating: number,
    maxRating: number,
    validContests: string[]
  ): Promise<Problem[] | undefined> {
    const contests = await this.getAllPastContests(numberOfContests, validContests);
    if (!contests) return;
    const problems = await this.getProblemsForContests(contests);
    if (!problems) return;
    if (minRating > maxRating) {
      throw new Error("minRating must be less than maxRating");
    }
    return problems
      .filter((p) => p.rating && p.rating >= minRating && p.rating <= maxRating)
      .sort((a, b) => (a.rating || 0) - (b.rating || 0));
  }
}
