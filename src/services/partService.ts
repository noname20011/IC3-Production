import axiosClient from "@/api/axiosClient";
import { BaseService } from "@/api/baseService";

export class PartService<T> extends BaseService<T> {
  constructor(endpoint: string) {
    super(endpoint);
  }

  getPartsByLevel(levelId: string | number) {
    return axiosClient.get(`${this.endpoint}/by-level/${levelId}`);
  }
}

const partService = new PartService<any>("/part");
export default partService;