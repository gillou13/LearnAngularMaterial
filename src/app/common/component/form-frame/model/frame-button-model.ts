import { Observable, of, Subject, Subscription, switchMap, tap } from 'rxjs';

export class FrameButtonModel {
  /** si true le bouton est visible. */
  isVisible: boolean = true;

  /** si true le bouton est disponible. */
  isAvailable: boolean = true;

  /**
   * action liée au bouton.
   * A fournir par le composant parent.
   */
  action!: Observable<any>;

  /**
   * Traitement interne de l'action.
   */
  subject: Subject<any> = new Subject<any>();

  /** Si true:  en traitement */
  inLoading = false;

  /** Set la subscription pour la gestion du loading */
  public setLoading(): Subscription {
    // Gestion du loading.
    return this.subject
      ?.asObservable()
      .pipe(
        tap(() => (this.inLoading = true)),
        switchMap(() => this.action),
        tap(() => (this.inLoading = false))
      )
      .subscribe();
  }
}
