import { Component } from '@angular/core';
import { Router, RouterEvent, RouterLink, RouterOutlet } from '@angular/router';
import { HeadbarComponent } from './headbar/headbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

class tabLink {
  public id: string;
  public label: string;
  public url: string;

  constructor(id: string, label: string, url: string){
    this.id = id;
    this.label = label;
    this.url = url;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HeadbarComponent, SidebarComponent, MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  /**
   * id du lien actuellement activé.
   */
  public linkActive: string | undefined;

  public links: tabLink[] = new Array<tabLink>();

  constructor(private router: Router) {
    // router.events.subscribe((event) => {
    //   console.log(event);
    // });
    // router
    this.links.push(new tabLink('1', 'test1', '/test1'));
    this.links.push(new tabLink('2', 'tab1', '/tab1'));
    this.linkActive = '1'; 
  }

}
