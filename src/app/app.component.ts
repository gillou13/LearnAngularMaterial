import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeadbarComponent } from './common/component/headbar/headbar.component';
import { SidebarComponent } from './common/component/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { NavtabsComponent } from './common/component/navtabs/navtabs.component';

class tabLink {
  public id: string;
  public label: string;
  public url: string;

  constructor(id: string, label: string, url: string) {
    this.id = id;
    this.label = label;
    this.url = url;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HeadbarComponent,
    SidebarComponent,
    NavtabsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {}
