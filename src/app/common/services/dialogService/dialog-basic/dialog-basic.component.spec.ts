import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBasicComponent } from './dialog-basic.component';

describe('DialogBasicComponent', () => {
  let component: DialogBasicComponent;
  let fixture: ComponentFixture<DialogBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogBasicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
