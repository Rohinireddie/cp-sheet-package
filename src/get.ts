//codeforcesAPI.ts

import { Contest, Problem, Submission } from "./env/types";
import {FINISHED_PHASE} from "./env/commonConstants";
import api from "./api";

export default class get{

  static async allPastContests(
    numberOfContests: number,
    validContests: string[]
  ): Promise<Contest[] | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const contests = await api.getAllContests();
    if (!contests) return;
    return contests
      .filter((c) => c.phase == FINISHED_PHASE)
      .filter((c) => validContests.some((v) => c.name.includes(v)))
      .sort((a, b) => b.id - a.id)
      .slice(0, Math.min(numberOfContests, contests.length));
  }

  static async usersSubmissions(
    handles: string[]
  ): Promise<Set<Submission> | undefined> {
    const submissions = new Set<Submission>();
    for (const handle of handles) {
      const userSubmissions = await api.getUserSubmissions(handle);
      userSubmissions?.forEach((s) => submissions.add(s));
    }
    return submissions;
  }

  static async problemsForContests(
    contests: Contest[]
  ): Promise<Problem[] | undefined> {
    const contestIds = contests.map((c) => c.id);
    const allProblems = await api.getAllProblems();
    if (!allProblems) return;
    return allProblems.filter((p) => contestIds.includes(p.contestId));
  }

  static async problemsFromPastContestsByRating(
    numberOfContests: number,
    minRating: number,
    maxRating: number,
    validContests: string[]
  ): Promise<Problem[] | undefined> {
    const contests = await this.allPastContests(numberOfContests, validContests);
    if (!contests) return;
    const problems = await this.problemsForContests(contests);
    if (!problems) return;
    if (minRating > maxRating) {
      throw new Error("minRating must be less than maxRating");
    }
    return problems
      .filter((p) => p.rating && p.rating >= minRating && p.rating <= maxRating)
      .sort((a, b) => (a.rating || 0) - (b.rating || 0));
  }
}
