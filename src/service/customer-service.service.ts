import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private http: HttpClient) { }

  BASE_URL = 'http://localhost:8080';

  createCustomer(data: any) {
    return this.http.post(`${this.BASE_URL}/customer`, data);
  }
  getCustomers() {
    return this.http.get(`${this.BASE_URL}/customer`);
  }
  getCustomerById(id: number) {
    return this.http.get(`${this.BASE_URL}/customer/${id}`);
  }
}
