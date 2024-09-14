import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';
import { NavigationLink } from '../../services/navigation/navigation-link';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

/**
 * Base de composant à destination d'une page.
 * Avec
 * - la gestion de la navigation par onglet.
 * (La fonction createLink doit être définit pour que la page fonctionne)
 * - la liste des subscriptions (pour evité de refaire le job de partout)
 */
@Component({
  selector: 'app-base-page',
  standalone: true,
  template: '<p>exemple<p>',
})
export abstract class BasePageComponent implements OnInit, OnDestroy {
  /**
   * Le lien courrant est soit récupéré via le service de navigation, soit crée par le composant.
   * Il est possible de la modifier par la suite.
   */
  public currentLink!: NavigationLink;

  /** Service de navigation */
  protected navigationService = inject(NavigationService);

  /** Lecture des routes */
  protected activatedRoute = inject(ActivatedRoute);

  /** Tableau de subscriptions pour la gestion des observables dans les composants. */
  protected subscriptions: Subscription[] = new Array<Subscription>();

  /** Pour la gestion du chagrement du formulaire. (à implémenter dans le composant ) */
  public inLoading = false;

  ngOnInit(): void {
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
