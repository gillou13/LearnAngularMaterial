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

  /** indique si les boutons d'enregistrement peuvent être visible. */
  saveVisible = true;

  /** indique si les boutons sont disponibles. */
  actionEnabled = true;

  /** indique qu'un traitement est en cours. */
  inLoading = false;

  // Actions venant du formulaire:

  /** Action d'enregistrement */
  saveAction?: Subject<any>;

  /** Action de fermeture du formulaire */
  closeAction!: Subject<any>;

  /** Action d'enregistrement et de fermeture de la page. */
  saveCloseAction?: Subject<any>;

  /**
   * Liste des actions 'complémentaires'.
   */
  actions?: FrameButtonModel[];
}
