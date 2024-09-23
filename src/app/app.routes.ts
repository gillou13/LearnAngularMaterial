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
// import { CommeOrderLineComponent } from './tables/comme-order-line/comme-order-line.component';
// import { TrucComponent } from './form/truc/truc.component';
import { Guid } from './tools/guid';

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
      {
        path: 'OrderLine',
        // component: CommeOrderLineComponent
        loadComponent: () =>
          import('./tables/comme-order-line/comme-order-line.component').then(
            (m) => m.CommeOrderLineComponent
          ),
      },
    ],
  },
  {
    path: 'form',
    children: [
      {
        path: 'customNumber',
        component: FormWithControlValueAccessorComponent,
      },
      // TODO GBE : tester l'eclatement du routage en plusieurs fichier.
      // https://stackoverflow.com/questions/49866932/multiple-files-to-define-routes
      // https://stackoverflow.com/questions/69630833/how-to-split-app-routing-module-ts-in-multiple-files-in-angular-2
      {
        path: 'truc',
        children: [
          {
            path: 'new',
            redirectTo: `new/${Guid.newGuid().toUpperCase()}`,
          },
          {
            path: 'new/:id',
            // component: TrucComponent,
            loadComponent: () =>
              import('./form/truc/truc.component').then((m) => m.TrucComponent),
          },
          {
            path: 'edit/:id',
            // component: TrucComponent,
            loadComponent: () =>
              import('./form/truc/truc.component').then((m) => m.TrucComponent),
          },
        ],
      },
    ],
  },
  { path: '', redirectTo: '/test1', pathMatch: 'full' },
  { path: '**', redirectTo: '/test1', pathMatch: 'full' },
];
