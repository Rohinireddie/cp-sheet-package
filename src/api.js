"use strict";
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
const axios_typescript_1 = __importDefault(require("axios-typescript"));
const commonConstants_1 = require("./env/commonConstants");
class api {
    static getAllContests() {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            try {
                const response = yield axios_typescript_1.default.get(`${commonConstants_1.API_URL}/contest.list`);
                return response.data.result;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static getUserSubmissions(handle) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            try {
                const response = yield axios_typescript_1.default.get(`${commonConstants_1.API_URL}/user.status?handle=${handle}`);
                if (response.status !== 200)
                    return [];
                return response.data.result;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static getAllProblems() {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            try {
                const response = yield axios_typescript_1.default.get(`${commonConstants_1.API_URL}/problemset.problems`);
                return response.data.result.problems;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.default = api;
