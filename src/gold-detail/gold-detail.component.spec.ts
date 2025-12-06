import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldDetailComponent } from './gold-detail.component';

describe('GoldDetailComponent', () => {
  let component: GoldDetailComponent;
  let fixture: ComponentFixture<GoldDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoldDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
