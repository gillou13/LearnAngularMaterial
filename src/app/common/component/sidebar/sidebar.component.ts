import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Guid } from '../../../tools/guid';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass',
})
export class SidebarComponent {
  public links = [
    { routerLink: '/test1', label: 'test1' },
    { routerLink: '/DiagOnClose', label: 'diag on close' },
    // les tableaux:
    { routerLink: '/table/tab1', label: 'tab1' },
    { routerLink: '/table/basic', label: 'tab basic' },
    { routerLink: '/table/basic2', label: 'tab basic V2' },
    { routerLink: '/table/expandable1', label: 'tab exp' },
    { routerLink: '/table/expandable2', label: 'exp form' },
    { routerLink: '/table/sorting', label: 'sorting' },
    { routerLink: '/table/filter1', label: 'Filter V1' },
    { routerLink: '/table/OrderLine', label: 'OrderLine' },
    // les formulaires:
    { routerLink: '/form/customNumber', label: 'form number' },
    { routerLink: '/form/truc/new', label: 'form truc new' },
    {
      routerLink: `/form/truc/edit/${Guid.newGuid().toUpperCase()}`,
      label: 'form truc edit',
    },
    { routerLink: '/jeu/CalculeVitesse', label: 'Jeu table multi 1' },
  ];
}
