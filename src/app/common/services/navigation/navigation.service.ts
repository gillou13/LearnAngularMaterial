import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationLink } from './navigation-link';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { PageStateService } from '../pageState/page-state.service';
import { DialogService } from '../dialogService/dialog.service';

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

  public constructor(
    private router: Router,
    private pageStateService: PageStateService,
    private dialogService: DialogService
  ) {}

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
   * Peu déléguer au composant navtabs liée la gestion de la suppression.
   * @param deletedLink Le lien à supprimer.
   * @returns Observable<boolean> true si le lien est supprimé.
   */
  public onDeleteLink(deletedLink: NavigationLink): Observable<boolean> {
    let linkIndex = this.getLinkIndex(deletedLink);

    // si on ne le trouve pas, il y a un problème...
    if (linkIndex == -1) {
      // TODO GBE : ajouter un message/log si problème quand le service de message (snakbar) sera disponible.
      return of(false);
    } else {
      // Vérification de l'état de l'abstractControl liée (si existant).
      if (deletedLink.formData == undefined) {
        this.deleteLink(linkIndex);
        return of(true);
      } else {
        // Si le formulaire n'est pas valide : on retourne dessus ou pas ?
        if (!deletedLink.formData.valid) {
          return this.dialogService
            .dialogYesNoCancel(
              'form invalide',
              "le formulaire n'est pas valide. voullez-vous finir la saisie avant que fermer ?"
            )
            .pipe(
              switchMap((response: boolean | undefined) => {
                if (response == undefined) {
                  return of();
                } else if (response) {
                  this.router.navigateByUrl(deletedLink.url);
                  return of();
                } else {
                  this.deleteLink(linkIndex);
                  return of(true);
                }
              })
            );
        }
        // Si le formulaire peu être enregistré directement.
        else if (deletedLink.formData.dirty) {
          return this.dialogService
            .dialogYesNo(
              'Enregister',
              "Le formulaire n'est pas encore enregisté. Voulez-vous sauvegarder avant de quitter ?"
            )
            .pipe(
              switchMap((response: boolean) => {
                if (response) {
                  // appel a la fonction délégué (du service) pour l'enregistrement.
                  return deletedLink.saveAction(deletedLink.formData).pipe(
                    // Si pas de problème à l'enregistrement, on supprime le lien.
                    switchMap((resultSave: boolean) => {
                      if (resultSave) {
                        this.deleteLink(linkIndex);
                      }
                      return of(resultSave);
                    })
                  );
                } else {
                  // console.log('on quitte seulement.');
                  this.deleteLink(linkIndex);
                  return of(true);
                }
              })
            );
        }
        // Si le formulaire n'est pas modifié.
        else {
          this.deleteLink(linkIndex);
          return of(true);
        }
      }
    }
  }

  /**
   * Méthode 'brute' pour la suppression.
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
    // on supprimer les states associés au lien
    this.pageStateService.deleteStates(this.links[linkIndex].url);

    // si le lien est actif, on navigera vers le dernier lien de la liste.
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
    // Si il n'y a plus d'onglet d'ouvert, par défaut on va sur test1.
    if (this.links.length == 0) {
      return new NavigationLink('test1');
    }
    return this.links.slice(-1)[0];
  }
}
