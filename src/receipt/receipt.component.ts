import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { HttpClient } from '@angular/common/http';
import { ReceiptData } from './receipt.interface';

@Component({
  selector: 'app-receipt',
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  formdata: ReceiptData = {
    items: [],
    goldRate: 0,
    makingCharge: 0,
    URD: 0,
    discount: 0,
    finalPrice: 0,
    paymenrtMode: ''
  };
  cgst: number = 0;
  sgst: number = 0;
  totalAmount: number = 0;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ReceiptData>('assets/data.json').subscribe(data => {
      this.formdata = data;
      this.calculateTaxes();
      console.log('Receipt Data:', this.formdata);
    });
  }

  private calculateTaxes(): void {
    this.cgst = Number((this.formdata.finalPrice * 0.015).toFixed(2));
    this.sgst = Number((this.formdata.finalPrice * 0.015).toFixed(2));
    this.totalAmount = Number((this.formdata.finalPrice + this.cgst + this.sgst).toFixed(2));
  }

  getTotalPrice(): number {
    this.totalAmount = this.formdata.finalPrice + this.cgst + this.sgst;
    return this.totalAmount;
  }
}