import { Component, OnDestroy } from '@angular/core';
import { Router, RouterEvent, RouterLink, RouterOutlet } from '@angular/router';
import { HeadbarComponent } from './common/component/headbar/headbar.component';
import { SidebarComponent } from './common/component/sidebar/sidebar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { NavigationService } from './common/services/navigation/navigation.service';
import { Observable, Subscription } from 'rxjs';
import { NavigationLink } from './common/services/navigation/navigation-link';

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
export class AppComponent implements OnDestroy {
  /**
   * id du lien actuellement activé.
   */
  public linkActive: Observable<string> | string | undefined;

  // Liste les liens de navigation.
  public links: NavigationLink[] = new Array<NavigationLink>();

  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(public navigationService: NavigationService) {
    
    // this.links est MAJ par le service de navigation.
    this.subscriptions.push(
      this.navigationService.getLinks.subscribe((links) => {
        this.links = links;
      })
    );

  }

  ngOnDestroy(): void {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
