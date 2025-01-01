import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { FrameModel } from './model/frame-model';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
/**
 * Composant générique pour la gestion des actions d'un formulaire.
 * TODO GBE :
 * - OK boutons save & close.
 * - OK gestion spinner/enabled des boutons.
 * - OKListe des boutons 'par défaut' save, close, copy, print
 * - OK custom button.
 * - OK BaseFromComponent (dérivé de BaseComponent avec intégration du cadre)
 * -
 */
@Component({
    selector: 'app-form-frame',
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './form-frame.component.html',
    styleUrl: './form-frame.component.scss'
})
export class FormFrameComponent {
  @Input() frameModel?: FrameModel;

  @Input() formData?: AbstractControl;

  @Input() isLoading!: boolean;
}
