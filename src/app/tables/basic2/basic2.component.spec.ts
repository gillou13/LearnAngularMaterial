import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Basic2Component } from './basic2.component';

describe('Basic2Component', () => {
  let component: Basic2Component;
  let fixture: ComponentFixture<Basic2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Basic2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Basic2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
