import axiosClient from "@/api/axiosClient";
import { BaseService } from "@/api/baseService";

export class LeaderboardService<T> extends BaseService<T> {
  constructor(endpoint: string) {
    super(endpoint);
  }

  getLeaderboardByPart(partId: string | number) {
    return axiosClient.get(`${this.endpoint}/by-part/${partId}`);
  }

  getLeaderboardByClassAndPart(classId: string, partId: string | number) {
    return axiosClient.get(`${this.endpoint}/by-class/${classId}/part/${partId}`);
  }
  
}

const leaderboardService = new LeaderboardService<any>("/leaderboard");
export default leaderboardService;