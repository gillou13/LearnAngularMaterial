import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeadbarComponent } from './common/component/headbar/headbar.component';
import { SidebarComponent } from './common/component/sidebar/sidebar.component';

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
  imports: [
    RouterOutlet,
    HeadbarComponent,
    SidebarComponent,
    NavtabsComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {}
