import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private Http: HttpClient) {}
  postProduct(data: any) {
    return this.Http.post<any>('http://localhost:3000/posts/', data);
  }
  getProduct() {
    return this.Http.get<any>('http://localhost:3000/posts/');
  }
  putProduct(data: any, id: number) {
    return this.Http.put<any>('http://localhost:3000/posts/' + id, data);
  }
  deleteProduct(id: number) {
    return this.Http.delete<any>('http://localhost:3000/posts/' + id);
  }
}
