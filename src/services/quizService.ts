import axiosClient from "@/api/axiosClient";
import { BaseService } from "@/api/baseService";

export class QuizService<T> extends BaseService<T> {
  constructor(endpoint: string) {
    super(endpoint);
  }

}

const quizService = new QuizService<any>("/quiz-result/");
export default quizService;