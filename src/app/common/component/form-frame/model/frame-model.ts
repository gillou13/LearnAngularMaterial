import { Subject } from 'rxjs';
import { FrameButtonModel } from './frame-button-model';

/**
 * Class pour la gestion du cadre du formulaire.
 */
export class FrameModel {
  /** Titre de la page */
  title?: string;

  /** Nom du document */
  name?: string;

  /** image
   * TODO GBE : à implémenter plus tard.
   */
  picture?: string;

  /** Gestion du bouton d'enregistrement. */
  saveButton?: FrameButtonModel;

  /** Action de fermeture du formulaire */
  closeAction?: Subject<any>;

  /** Action d'enregistrement et de fermeture de la page. */
  saveCloseAction?: Subject<any>;

  actions?: FrameButtonModel[];
}
