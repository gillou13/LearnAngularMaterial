import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FrameModel } from './model/frame-model';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { FrameButtonModel } from './model/frame-button-model';
/**
 * Composant générique pour la gestion des actions d'un formulaire.
 * TODO GBE :
 * - OK boutons save & close.
 * - OK gestion spinner/enabled des boutons.
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
export class FormFrameComponent implements OnInit, OnDestroy {
  @Input() frameModel!: FrameModel;

  @Input() formData!: AbstractControl;

  private subs: Subscription[] = new Array<Subscription>();

  ngOnDestroy(): void {
    this.subs.forEach((x: Subscription) => {
      if (x !== undefined) {
        x.unsubscribe();
      }
    });
  }

  ngOnInit(): void {
    // Gestion du spinner pour les boutons suplémentaires.
    this.frameModel.actions.forEach((action: FrameButtonModel) => {
      if (action.action != undefined && action.actionObservable != undefined) {
        this.subs.push(
          action.action.subscribe(() => (action.inLoading = true))
        );
        this.subs.push(
          action.actionObservable.subscribe(() => {
            console.log('form fram print end');
            action.inLoading = false;
          })
        );
      }
    });
  }
}
