import axiosClient from "@/api/axiosClient";
import { BaseService } from "@/api/baseService";

export class levelService<T> extends BaseService<T> {
  constructor(endpoint: string) {
    super(endpoint);
  }
}

const LevelService = new levelService<any>("/level/");
export default LevelService;