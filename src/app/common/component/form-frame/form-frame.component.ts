import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FrameModel } from './model/frame-model';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
/**
 * Composant générique pour la gestion des actions d'un formulaire.
 * TODO GBE :
 * - OK boutons save & close.
 * - gestion spinner/enabled des boutons.
 * - Liste des boutons 'par défaut' save, close, copy, print
 * - custom button.
 * - BaseFromComponent (dérivé de BaseComponent avec intégration du cadre)
 * -
 */
@Component({
  selector: 'app-form-frame',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './form-frame.component.html',
  styleUrl: './form-frame.component.scss',
})
export class FormFrameComponent {
  @Input() frameModel!: FrameModel;

  @Input() formData!: AbstractControl;
}
