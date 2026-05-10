import { BaseService } from "@/api/baseService";

export class SchoolService<T> extends BaseService<T> {
  constructor(endpoint: string) {
    super(endpoint);
  }
}

const schoolService = new SchoolService<any>("/school/");
export default schoolService;