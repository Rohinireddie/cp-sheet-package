"use strict";
//codeforcesAPI.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commonConstants_1 = require("./env/commonConstants");
const api_1 = __importDefault(require("./api"));
class get {
    static allPastContests(numberOfContests, validContests) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            const contests = yield api_1.default.getAllContests();
            if (!contests)
                return;
            return contests
                .filter((c) => c.phase == commonConstants_1.FINISHED_PHASE)
                .filter((c) => validContests.some((v) => c.name.includes(v)))
                .sort((a, b) => b.id - a.id)
                .slice(0, Math.min(numberOfContests, contests.length));
        });
    }
    static usersSubmissions(handles) {
        return __awaiter(this, void 0, void 0, function* () {
            const submissions = new Set();
            for (const handle of handles) {
                const userSubmissions = yield api_1.default.getUserSubmissions(handle);
                userSubmissions === null || userSubmissions === void 0 ? void 0 : userSubmissions.forEach((s) => submissions.add(s));
            }
            return submissions;
        });
    }
    static problemsForContests(contests) {
        return __awaiter(this, void 0, void 0, function* () {
            const contestIds = contests.map((c) => c.id);
            const allProblems = yield api_1.default.getAllProblems();
            if (!allProblems)
                return;
            return allProblems.filter((p) => contestIds.includes(p.contestId));
        });
    }
    static problemsFromPastContestsByRating(numberOfContests, minRating, maxRating, validContests) {
        return __awaiter(this, void 0, void 0, function* () {
            const contests = yield this.allPastContests(numberOfContests, validContests);
            if (!contests)
                return;
            const problems = yield this.problemsForContests(contests);
            if (!problems)
                return;
            if (minRating > maxRating) {
                throw new Error("minRating must be less than maxRating");
            }
            return problems
                .filter((p) => p.rating && p.rating >= minRating && p.rating <= maxRating)
                .sort((a, b) => (a.rating || 0) - (b.rating || 0));
        });
    }
}
exports.default = get;
