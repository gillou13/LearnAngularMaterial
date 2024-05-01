import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';
import { NavigationLink } from '../../services/navigation/navigation-link';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.sass',
})
export abstract class BaseComponent implements OnInit {
  protected currentLink: NavigationLink | undefined;

  constructor(
    protected router: Router,
    protected navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    // Gestion de la navigation :
    this.navigationService.addLink(this.getCurrentLink());
  }

  protected getCurrentLink(): NavigationLink {
    if (!this.currentLink) {
      this.currentLink = this.createLink();
    }
    return this.currentLink;
  }

  /**
   * Fonction de création du lien de navigation pour le composant.
   */
  protected abstract createLink(): NavigationLink;
}
