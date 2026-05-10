import { BaseService } from "@/api/baseService";

export class PartService<T> extends BaseService<T> {
  constructor(endpoint: string) {
    super(endpoint);
  }
}

const partService = new PartService<any>("/part/");
export default partService;