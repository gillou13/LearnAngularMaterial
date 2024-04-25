import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationSkipped, Router } from '@angular/router';
import { NavigationLink } from './navigation-link';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  // inspiration : https://dev.to/this-is-angular/how-to-share-data-between-components-in-angular-4i60

  /**
   * Tableau des navigations actuel.
   */
  private links: NavigationLink[] = new Array<NavigationLink>();

  private linksSubject: BehaviorSubject<NavigationLink[]> 
    = new BehaviorSubject<NavigationLink[]>(this.links);

  public getLinks: Observable<NavigationLink[]> = this.linksSubject.asObservable();

  constructor(private readonly router: Router) {

    // TODO GBE : trouver le bon event...
    router.events.subscribe((event) => {

      if (event instanceof NavigationEnd){
        //console.log(event);
        this.addLink(event);

      // } else if (event instanceof NavigationSkipped) {
      //   console.log('pas besoin de faire plus. on y est déjà.');
      }
      //NavigationSkipped 
      // console.log(event);
    });
   }

  public addLink(event: NavigationEnd): void {
    let linkIndex = this.links.findIndex((link) => link.url === event.url);
    
    if(linkIndex === -1){
      // Si l'url n'est pas trouvé on ajoute le lien
      this.links.push(new NavigationLink(event.id, event.url, event.url, true));
      linkIndex = this.links.length - 1;
      // TODO GBE : comment recup le label ?
      // a tester: appeler le AddLink dans le composant.onInit plutôt que l'event de routage.
      // (mais au moins j'aurais testé ces events ^^)
    }

    // On active le lien existant. 
    this.links.forEach((link, currentIndex) => link.active = currentIndex === linkIndex);
    // Dans tous les cas on renvoi links.
    this.linksSubject.next(this.links);
  }
}
 