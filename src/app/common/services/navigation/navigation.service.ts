import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationSkipped, Router } from '@angular/router';
import { NavigationLink } from './navigation-link';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  // inspiration : https://dev.to/this-is-angular/how-to-share-data-between-components-in-angular-4i60

  /**
   * Tableau des navigations actuel.
   */
  private links: NavigationLink[] = new Array<NavigationLink>();

  private linksSubject: BehaviorSubject<NavigationLink[]> = new BehaviorSubject<
    NavigationLink[]
  >(this.links);

  /**
   * Observable de la liste des liens.
   */
  public getLinks: Observable<NavigationLink[]> =
    this.linksSubject.asObservable();

  /**
   * Permet d'ajouter/modifier un lien de navigation
   * @param link description du nouveau lien.
   */
  public addLink(newLink: NavigationLink): void {
    let linkIndex = this.links.findIndex((link) => link.url === newLink.url);

    if (linkIndex === -1) {
      // Si l'url n'est pas trouvé on ajoute le lien
      linkIndex = this.links.push(newLink) - 1;
    }

    // On active le lien existant.
    this.links.forEach(
      (link, currentIndex) => (link.active = currentIndex === linkIndex)
    );

    // Dans tous les cas on renvoi links.
    this.linksSubject.next(this.links);
  }

  /**
   * Permet de mettre à jour un liens existant. (ex: état, label, autre...)
   * @param updatedLink nouvelle description du lien.
   */
  public updateLink(updatedLink: NavigationLink): void {
    let linkIndex = this.links.findIndex(
      (link) => link.url === updatedLink.url
    );

    // si on ne le trouve pas, il y a un problème...
    // TODO GBE : ajouter un message/log si problème quand le service de message (snakbar) sera disponible.
    if (linkIndex != -1) {
      NavigationLink.copy(this.links[linkIndex], updatedLink);

      // Dans tous les cas on renvoi links.
      this.linksSubject.next(this.links);
    }
  }
}
