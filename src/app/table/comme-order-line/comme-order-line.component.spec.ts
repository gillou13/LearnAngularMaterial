import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommeOrderLineComponent } from './comme-order-line.component';

describe('CommeOrderLineComponent', () => {
  let component: CommeOrderLineComponent;
  let fixture: ComponentFixture<CommeOrderLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommeOrderLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommeOrderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
