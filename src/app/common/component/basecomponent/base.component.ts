import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';
import { NavigationLink } from '../../services/navigation/navigation-link';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.sass',
})
export abstract class BaseComponent implements OnInit, OnDestroy {
  public currentLink: NavigationLink;

  protected subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    protected router: Router,
    protected navigationService: NavigationService
  ) {
    this.currentLink = this.createLink();
  }

  ngOnInit(): void {
    // Gestion de la navigation :
    this.navigationService.addLink(this.currentLink);
  }

  ngOnDestroy(): void {
    console.log('destroy');
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  /**
   * Fonction de création du lien de navigation pour le composant.
   * A implémenter à chaque composant.
   */
  protected abstract createLink(): NavigationLink;
}
