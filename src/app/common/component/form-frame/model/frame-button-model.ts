import { Observable, Subject, Subscription, switchMap, tap } from 'rxjs';

export class FrameButtonModel {
  /** si true le bouton est visible. */
  isVisible: boolean = true;

  /** si true le bouton est disponible. */
  isAvailable: boolean = true;

  /**
   * Traitement interne de l'action.
   * TODO GBE : j'aurrais pu utiliser des EventEmitter...
   */
  subject: Subject<any> = new Subject<any>();

  /** Si true:  en traitement */
  inLoading = false;

  /** Permet de lier une action du composant parent au bouton. avec une gestion du loading. */
  public setAction(fnAction: () => Observable<any>): Subscription {
    return this.subject
      .asObservable()
      .pipe(
        tap(() => (this.inLoading = true)),
        switchMap(() => fnAction()),
        tap(() => (this.inLoading = false))
      )
      .subscribe();
  }
}
