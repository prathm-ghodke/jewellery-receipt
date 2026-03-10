import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MaterialType } from '../app/material-type.enum';
import { MatFormField, MatLabel, MatInput, MatError } from "@angular/material/input";
import { MatOption, MatSelect } from "@angular/material/select";

@Component({
  selector: 'app-gold-detail',
  imports: [MatExpansionModule, ReactiveFormsModule, MatRadioModule, MatDividerModule, CurrencyPipe, MatFormField, MatLabel, MatInput, MatError, MatOption, MatSelect],
  templateUrl: './gold-detail.component.html',
  styleUrl: './gold-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GoldDetailComponent {

  @Input() currentStep: number = 0;
  @Input() customerId: Number = 0;
  goldPurchaseForm!: FormGroup;
  totalPrice: number = 0;
  removeBtn: boolean = false;
  // materialType = Object.values(MaterialType);
  materialType = [MaterialType.GOLD, MaterialType.SILVER];
  rate: number = 0;

  constructor(private formBuilder: FormBuilder) {
    this.goldPurchaseForm = this.formBuilder.group({
      // goldRate: ['', [Validators.required]],
      // makingCharge: ['', [Validators.required, Validators.min(5), Validators.max(20)]],
      items: this.formBuilder.array([this.addMoreItems()]),
      URD: ['', Validators.required],
      discount: ['', Validators.required],
      payment: 'cash',
      finalPrice: [0]
    });
    console.log('recieved cutomerId in gold-detail component: ', this.customerId);
  }
  get items():FormArray {
    return this.goldPurchaseForm.get('items') as FormArray;
  }
  addMoreItems():FormGroup {
    return this.formBuilder.group({
      itemPurchase: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]*$")]],
      HUID: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]*$")]],
      weight: ['', [Validators.required, Validators.pattern("[0-9]")]],
      price: [{value:'',disabled:true}],
      materialtype: ['', [Validators.required]]
    });
  }
  calculatePrice(materialType: string){
    // const goldRate = this.goldPurchaseForm.get('goldRate')?.value;
    // const makingCharge = this.goldPurchaseForm.get('makingCharge')?.value;
    const makingCharge = 10;
    this.totalPrice = 0;
    for (let i = 0; i < this.items.length; i++) {
      if(materialType === MaterialType.SILVER){
        this.rate = 1000;
      } else if(materialType === MaterialType.GOLD){
        this.rate = 2000;
      }
      const calculatedPrice = (this.rate * this.items.at(i).get('weight')?.value) * ((100 + makingCharge) / 100);
      this.items.at(i).patchValue({ price: Number(calculatedPrice.toFixed(2)) });
      this.totalPrice += this.items.at(i).get('price')?.value || 0;
      this.goldPurchaseForm.patchValue({finalPrice: Number(this.totalPrice.toFixed(2))});
    }
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
  finalPrice(){
    console.log('Total Price before final calculation: ', this.goldPurchaseForm.value.finalPrice);
    this.totalPrice = this.goldPurchaseForm.value.finalPrice - this.goldPurchaseForm.value.URD - this.goldPurchaseForm.value.discount;
  }
  save() {
    if (this.goldPurchaseForm?.valid) {
      this.goldPurchaseForm.value.finalPrice = this.totalPrice;
      this.goldPurchaseForm.value.customerId = this.customerId;
      // console.log('Form Submitted!', JSON.stringify(this.goldPurchaseForm.value));
      console.log('Form Submitted!', this.goldPurchaseForm.value);

    } else {
      console.log('Form Submitted!', this.goldPurchaseForm);
    }
  }
}
