import { Routes } from '@angular/router';
import { Test1Component } from './test1/test1.component';

export const routes: Routes = [
    {path: 'test1', component: Test1Component},
    {path: '', redirectTo: '/test1', pathMatch: 'full'}
];
