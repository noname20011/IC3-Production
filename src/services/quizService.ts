import axiosClient from "@/api/axiosClient";
import { BaseService } from "@/api/baseService";

export class QuizService<T> extends BaseService<T> {
  constructor(endpoint: string) {
    super(endpoint);
  }

  sendTop1BySocket(data: Partial<T>): Promise<T> {
    return axiosClient.post(`${this.endpoint}top-1-part`, data);
  }
}

const quizService = new QuizService<any>("/quiz-result/");
export default quizService;