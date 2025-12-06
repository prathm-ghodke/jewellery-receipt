import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-gold-detail',
  imports: [MatExpansionModule, ReactiveFormsModule, MatRadioModule, MatDividerModule, CurrencyPipe, DecimalPipe],
  templateUrl: './gold-detail.component.html',
  styleUrl: './gold-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoldDetailComponent {

  goldPurchaseForm!: FormGroup;
  @Input() currentStep: number = 0;
  // currentStep: number = 0;
  totalPrice: number = 0;
  removeBtn: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.goldPurchaseForm = this.formBuilder.group({
      goldRate: ['', [Validators.required]],
      makingCharge: ['', [Validators.required, Validators.min(5), Validators.max(20)]],
      items: this.formBuilder.array([this.addMoreItems()]),
      URD: [0, Validators.required],
      discount: [0, Validators.required],
      payment: 'cash',
      finalPrice: [0]
    });
  }
  get items():FormArray {
    return this.goldPurchaseForm.get('items') as FormArray;
  }
  addMoreItems():FormGroup {
    return this.formBuilder.group({
      itemPurchase: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]*$")]],
      HUID: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]*$")]],
      weight: ['', [Validators.required]],
      price: [{value:'',disabled:true}]
    });
  }
  calculatePrice(){
    const goldRate = this.goldPurchaseForm.get('goldRate')?.value;
    const makingCharge = this.goldPurchaseForm.get('makingCharge')?.value;
    this.totalPrice = 0;
    for (let i = 0; i < this.items.length; i++) {
      const calculatedPrice = (goldRate * this.items.at(i).get('weight')?.value) * ((100 + makingCharge) / 100);
      this.items.at(i).patchValue({ price: Number(calculatedPrice.toFixed(2)) });
      this.totalPrice += this.items.at(i).get('price')?.value || 0;
      this.goldPurchaseForm.patchValue({finalPrice: Number(this.totalPrice.toFixed(2))});
    }
    console.log(this.totalPrice);
  }
  addNewItem(){
    this.items.push(this.addMoreItems());
    this.removeBtn = true;
  }
  removeItems(){
    this.totalPrice -= this.items.at(this.items.length-1).get('price')?.value;
    this.items.removeAt(this.items.length-1);
    (this.items.length-1 <= 0) ? this.removeBtn = false : this.removeBtn = true;
  }
  setStep(index: number) {
    this.currentStep = index;
  }
  save() {
    if (this.goldPurchaseForm?.valid) {
      console.log('Form Submitted!', JSON.stringify(this.goldPurchaseForm.value));

    } else {
      console.log('Form Submitted!', this.goldPurchaseForm);
      console.log('Form is invalid');
    }
  }
}
