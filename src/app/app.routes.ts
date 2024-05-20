import { Routes } from '@angular/router';
import { Test1Component } from './test1/test1.component';
import { Tab1Component } from './tables/tab1/tab1.component';
import { BasicComponent } from './tables/basic/basic.component';
import { Basic2Component } from './tables/basic2/basic2.component';
import { Expandable1Component } from './tables/expandable1/expandable1.component';
import { ExpandableWithFormComponent } from './tables/expandable-with-form/expandable-with-form.component';
import { TestDiagOnCloseComponent } from './test-diag-on-close/test-diag-on-close.component';
import { TableWithSortingComponent } from './tables/table-with-sorting/table-with-sorting.component';
import { TableFilterV1Component } from './tables/table-filter-v1/table-filter-v1.component';
import { FormWithControlValueAccessorComponent } from './form/form-with-control-value-accessor/form-with-control-value-accessor.component';
import { CommeOrderLineComponent } from './tables/comme-order-line/comme-order-line.component';

export const routes: Routes = [
  { path: 'test1', component: Test1Component },
  { path: 'DiagOnClose', component: TestDiagOnCloseComponent },
  {
    path: 'table',
    children: [
      { path: 'tab1', component: Tab1Component },
      { path: 'basic', component: BasicComponent },
      { path: 'basic2', component: Basic2Component },
      { path: 'expandable1', component: Expandable1Component },
      { path: 'expandable2', component: ExpandableWithFormComponent },
      { path: 'sorting', component: TableWithSortingComponent },
      { path: 'filter1', component: TableFilterV1Component },
      { path: 'OrderLine', component: CommeOrderLineComponent },
    ],
  },
  {
    path: 'form',
    children: [
      {
        path: 'customNumber',
        component: FormWithControlValueAccessorComponent,
      },
    ],
  },
  { path: '', redirectTo: '/test1', pathMatch: 'full' },
];
