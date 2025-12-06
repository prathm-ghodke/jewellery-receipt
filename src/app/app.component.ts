import { Component } from '@angular/core';

import {MatTabsModule} from '@angular/material/tabs';
import { GoldDetailComponent } from '../gold-detail/gold-detail.component';
import { CustomerDetailComponent } from "../customer-detail/customer-detail.component";
@Component({
  selector: 'app-root',
  imports: [MatTabsModule, GoldDetailComponent, CustomerDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jewellery-receipt';
   tabs = ['GOLD', 'SILVER'];
  currentStep!:number;

  onStepChange(step: number) {
    this.currentStep = step;
    console.log('Current Step in App Component:', this.currentStep);
  }
}
