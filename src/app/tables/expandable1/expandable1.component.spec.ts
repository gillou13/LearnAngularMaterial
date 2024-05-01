import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Expandable1Component } from './expandable1.component';

describe('Expandable1Component', () => {
  let component: Expandable1Component;
  let fixture: ComponentFixture<Expandable1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Expandable1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Expandable1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
