import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
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
      // this.customerData.emit(this.customerForm.value);
      this.moveToNextForm.emit(this.step =+ 1);
      console.log('Form is valid');
    } else {
      console.log('Form is invalid');
    }
  }
}
