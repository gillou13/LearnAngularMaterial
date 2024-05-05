import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDiagOnCloseComponent } from './test-diag-on-close.component';

describe('TestDiagOnCloseComponent', () => {
  let component: TestDiagOnCloseComponent;
  let fixture: ComponentFixture<TestDiagOnCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDiagOnCloseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestDiagOnCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
