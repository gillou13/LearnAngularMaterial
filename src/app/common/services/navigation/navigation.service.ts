import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  public constructor(private router: Router) {}

  /**
   * Permet de générer ou trouver le lien correspondant au composant appelant.
   * @param fnCreatLink fonction de création d'un nouveau lien.
   * Délégé au composant appelant.
   * @returns un lien pour le currentLink du BaseComponent.
   */
  public setNewLink(
    fnCreatLink: (url: string) => NavigationLink
  ): NavigationLink {
    const currentUrl = this.router.url;
    // recherche de l'url actuel.
    let linkIndex = this.links.findIndex((l) => l.url === currentUrl);

    // Si l'url n'est pas trouvé on ajoute le lien
    if (linkIndex === -1) {
      linkIndex = this.links.push(fnCreatLink(currentUrl)) - 1;
    }

    // On active le lien existant. (et on désactive les autres...)
    this.links.forEach(
      (link, currentIndex) => (link.active = currentIndex === linkIndex)
    );

    // publication de links.
    this.linksSubject.next(this.links);

    // on renvoi le lien.
    return this.links[linkIndex];
  }

  /**
   * Méthode 'soft' pour la suppresssion.
   * Peu déléguer au composant liée la gestion de la suppression.
   * @param deletedLink Le lien à supprimer.
   */
  public onDeleteLink(deletedLink: NavigationLink): void {
    let linkIndex = this.getLinkIndex(deletedLink);

    // si on ne le trouve pas, il y a un problème...
    // TODO GBE : ajouter un message/log si problème quand le service de message (snakbar) sera disponible.
    if (linkIndex != -1) {
      // si l'eventDelete est suivie et que l'on ne force pas le delete.
      if (this.links[linkIndex].deleteSubject.observed) {
        this.links[linkIndex].deleteSubject.next();
      }
      // sinon suppression normale.
      else {
        this.deleteLink(linkIndex);
      }
    }
  }

  /**
   * Méthode 'bute' pour la suppression.
   * Utilisé par les composants pour supprimer le lien.
   * @param deletedLink le lien à supprimer.
   */
  public forceDeleteLink(deletedLink: NavigationLink): void {
    const linkIndex = this.getLinkIndex(deletedLink);
    this.deleteLink(linkIndex);
  }

  /**
   *
   * @param link lien recherché.
   * @returns l'index du lien. -1 si non trouvé.
   */
  private getLinkIndex(link: NavigationLink): number {
    // TODO GBE : trouver la solution la plus performante.
    // let linkIndex = this.links.findIndex(
    //   (link) => link.url === deletedLink.url
    // );
    const linkIndex = this.links.indexOf(link);
    return linkIndex;
  }

  /**
   * Suppression interne du lien.
   */
  private deleteLink(linkIndex: number): void {
    const isActive = this.links[linkIndex].active;

    this.links.splice(linkIndex, 1);

    this.linksSubject.next(this.links);

    if (isActive) {
      this.router.navigateByUrl(this.getLastLink().url);
    }
  }

  /**
   *
   * @returns le dernier éléments de la liste.
   */
  private getLastLink(): NavigationLink {
    return this.links.slice(-1)[0];
  }
}
