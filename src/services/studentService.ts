import axiosClient from "@/api/axiosClient";
import { BaseService } from "@/api/baseService";

export class StudentService<T> extends BaseService<T> {
  constructor(endpoint: string) {
    super(endpoint);
  }

  // 👉 custom method for class
  getStudentByClassId(classId: string | number) {
    return axiosClient.get(`${this.endpoint}/class/${classId}`);
  }

}

const studentService = new StudentService<any>("/student");
export default studentService;