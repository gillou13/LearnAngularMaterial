import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NavigationLink } from '../../services/navigation/navigation-link';
import { NavigationService } from '../../services/navigation/navigation.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navtabs',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './navtabs.component.html',
  styleUrl: './navtabs.component.sass',
})
export class NavtabsComponent implements OnDestroy {
  /**
   * id du lien actuellement activé.
   */
  public linkActive: Observable<string> | string | undefined;

  // Liste les liens de navigation.
  public links: NavigationLink[] = new Array<NavigationLink>();

  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(public navigationService: NavigationService) {
    // this.links est mise à jours par le service de navigation.
    this.subscriptions.push(
      this.navigationService.getLinks.subscribe((links) => {
        this.links = links;
      })
    );
  }

  ngOnDestroy(): void {
    // Logiquement, il ne sera jamais appelé. mais autant prendre les bonnes pratiques tous de suite.
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public onClose(link: NavigationLink): void {
    this.navigationService.onDeleteLink(link);
  }

  public getSelectedTabIndex(): number {
    return this.links.findIndex((l) => l.active);
  }
}
