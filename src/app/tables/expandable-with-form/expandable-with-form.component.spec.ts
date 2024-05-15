import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableWithFormComponent } from './expandable-with-form.component';

describe('ExpandableWithFormComponent', () => {
  let component: ExpandableWithFormComponent;
  let fixture: ComponentFixture<ExpandableWithFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandableWithFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpandableWithFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
