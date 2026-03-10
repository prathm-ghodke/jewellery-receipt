import { Component, inject, Output, EventEmitter } from '@angular/core';

import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import { GoldDetailComponent } from '../gold-detail/gold-detail.component';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerServiceService } from '../service/customer-service.service';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-root',
  imports: [MatTabsModule, GoldDetailComponent, MatSelectModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDividerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jewellery-receipt';
   tabs = ['GOLD', 'SILVER'];
  jewelleryRateForm!: FormGroup;
  customerService = inject(CustomerServiceService);
  @Output() customerEvent = new EventEmitter<Number>();
  customerList: any[] = [];
  customer:any;
  enableNextButton: boolean = false;
  itemComponent: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.jewelleryRateForm = this.formBuilder.group({
      goldRate: ['', [Validators.required]],
      silverdRate: ['', [Validators.required]]
    });
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe({
      next: (response) => {
        this.customerList = response as any[];
      },
      error: (error) => {
        alert('Error fetching customer list:'+ error.message);
      }
    });
  }
  getCustomerById(id: number){
    this.customerService.getCustomerById(id).subscribe({
      next: (response) => {
        this.customer = response;
        this.customerEvent.emit(id);
        this.enableNextButton = true;
        console.log('Customer fetched with Id: ', id, this.customer);
      },
      error: (error) => {
        alert('Error fetching customer with Id: '+ id + " "+ error.message);
      }
    });
  }
  displayItemComponent(){
    this.itemComponent = true;
  }
}

