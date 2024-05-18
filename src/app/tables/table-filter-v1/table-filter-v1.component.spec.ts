import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFilterV1Component } from './table-filter-v1.component';

describe('TableFilterV1Component', () => {
  let component: TableFilterV1Component;
  let fixture: ComponentFixture<TableFilterV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableFilterV1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableFilterV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
