import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingDetailComponent } from './pricing-detail.component';

describe('PricingDetailComponent', () => {
  let component: PricingDetailComponent;
  let fixture: ComponentFixture<PricingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
