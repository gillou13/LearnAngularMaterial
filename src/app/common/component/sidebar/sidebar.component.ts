import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    { routerLink: '/tab1', label: 'tab1' },
    { routerLink: '/table/basic', label: 'tab basic' },
    { routerLink: '/table/basic2', label: 'tab basic V2' },
    { routerLink: '/table/expandable1', label: 'tab exp V1' },
  ];
}
