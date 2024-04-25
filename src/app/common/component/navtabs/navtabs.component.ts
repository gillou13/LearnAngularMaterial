import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NavigationLink } from '../../services/navigation/navigation-link';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-navtabs',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTabsModule],
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
