import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWithControlValueAccessorComponent } from './form-with-control-value-accessor.component';

describe('FormWithControlValueAccessorComponent', () => {
  let component: FormWithControlValueAccessorComponent;
  let fixture: ComponentFixture<FormWithControlValueAccessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWithControlValueAccessorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormWithControlValueAccessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
