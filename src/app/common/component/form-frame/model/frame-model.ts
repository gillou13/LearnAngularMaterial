import { Subject } from 'rxjs';
import { FrameButtonModel } from './frame-button-model';
import { FrameActionButtonModel } from './frame-action-button-model';

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

  /** Action d'enregistrement et de fermeture de la page. */
  saveCloseAction?: Subject<any>;

  saveButton?: FrameButtonModel;

  saveCloseButton?: FrameButtonModel;

  closeButton!: FrameButtonModel;

  /**
   * Liste des actions 'complémentaires'.
   */
  actions: Map<string, FrameActionButtonModel> = new Map<
    string,
    FrameActionButtonModel
  >();
}
