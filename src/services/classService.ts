import axiosClient from "@/api/axiosClient";
import { BaseService } from "@/api/baseService";

export class ClassService<T> extends BaseService<T> {
  constructor(endpoint: string) {
    super(endpoint);
  }

  // 👉 custom method for class
  getClassBySchoolId(schoolId: string | number) {
    return axiosClient.get(`${this.endpoint}/school/${schoolId}`);
  }

}

const classService = new ClassService<any>("/classrooms");
export default classService;