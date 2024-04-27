import { Routes } from '@angular/router';
import { Test1Component } from './test1/test1.component';
import { Tab1Component } from './tab1/tab1.component';
import { BasicComponent } from './tables/basic/basic.component';

export const routes: Routes = [
  { path: 'test1', component: Test1Component },
  { path: 'tab1', component: Tab1Component },
  { path: 'table', children: [{ path: 'basic', component: BasicComponent }] },
  { path: '', redirectTo: '/test1', pathMatch: 'full' },
];
