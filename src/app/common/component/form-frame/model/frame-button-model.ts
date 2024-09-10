import { Observable, Subject } from 'rxjs';

export class FrameButtonModel {
  /** Texte affiché dans le bouton */
  label?: string;

  /** icon affiché dans le bouton */
  icon?: string;

  /** ordre d'affichage dans la liste */
  order?: number;

  /** si true le bouton est visible. */
  isVisible: boolean = true;

  /** si true le bouton est disponible. */
  isAvailable: boolean = true;

  /** action liée au bouton. (via .next()) */
  action?: Subject<any>;

  /** retour de l'action */
  actionObservable?: Observable<any>;

  /** Si true:  en traitement */
  inLoading = false;
}
