import { FrameButtonModel } from './frame-button-model';

export class FrameActionButtonModel extends FrameButtonModel {
  /** Texte affiché dans le bouton */
  label?: string;

  /** icon affiché dans le bouton */
  icon?: string;

  /** ordre d'affichage dans la liste */
  order?: number;
}
