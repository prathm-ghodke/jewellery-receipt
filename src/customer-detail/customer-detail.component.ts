import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomerServiceService } from '../service/customer-service.service';
@Component({
  selector: 'app-customer-detail',
  imports: [MatExpansionModule, ReactiveFormsModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerDetailComponent {

  customerForm!: FormGroup;
  step = 0;
  @Output() moveToNextForm = new EventEmitter<number>();
  @Output() customerData = new EventEmitter<any>();
  customerService = inject(CustomerServiceService);
  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
      lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
      contact: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
  }

  setStep(index: number) {
    this.step = index;
  }
  save() {
    if (this.customerForm?.valid) {
      this.customerService.createCustomer(this.customerForm.value).subscribe({
        next: (response) => {
          // console.log('Customer created successfully:', response);
          this.customerData.emit(response);
          this.moveToNextForm.emit(this.step =+ 1);
        },
        error: (error) => {
          alert('Customer with same details already exists:');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
