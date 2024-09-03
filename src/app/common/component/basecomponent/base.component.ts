import { Component, inject, OnDestroy } from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';
import { NavigationLink } from '../../services/navigation/navigation-link';
import { Subscription } from 'rxjs';

/**
 * Base de composant.
 * La fonction createLink doit être définit pour que la page fonctionne.
 */
@Component({
  selector: 'app-base',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.sass',
})
export abstract class BaseComponent implements OnDestroy {
  /** le lien courrant est soit récupéré via le service de navigation, soit crée par le composant.
   *
   * Il est possible de la modifier par la suite.
   */
  public currentLink: NavigationLink;

  /** Service de navigation */
  protected navigationService: NavigationService;

  /** Tableau de subscriptions pour la gestion des observables dans les composants. */
  protected subscriptions: Subscription[] = new Array<Subscription>();

  constructor() {
    // injection du service de navigation.
    this.navigationService = inject(NavigationService);

    // Init du lien courrant.
    this.currentLink = this.navigationService.setNewLink(this.createLink);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  /**
   * Fonction de création du lien de navigation pour le composant.
   * A implémenter à chaque composant.
   */
  protected abstract createLink(url: string): NavigationLink;
}
