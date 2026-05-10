// src/api/baseService.ts
import axiosClient from './axiosClient';

export class BaseService<T> {
  constructor(protected endpoint: string) {}

  getAll(params?: any): Promise<T[]> {
    return axiosClient.get(this.endpoint, { params });
  }

  getById(id: string | number): Promise<T> {
    return axiosClient.get(`${this.endpoint}/${id}`);
  }

  create(data: Partial<T>): Promise<T> {
    return axiosClient.post(this.endpoint, data);
  }

  update(id: string | number, data: Partial<T>): Promise<T> {
    return axiosClient.put(`${this.endpoint}/${id}`, data);
  }

  delete(id: string | number): Promise<void> {
    return axiosClient.delete(`${this.endpoint}/${id}`);
  }
}
