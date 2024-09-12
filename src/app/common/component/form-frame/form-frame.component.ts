import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
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
export class FormFrameComponent implements AfterViewInit, OnDestroy {
  @Input() frameModel!: FrameModel;

  @Input() formData!: AbstractControl;

  private subs: Subscription[] = new Array<Subscription>();

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => sub?.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.setLoading();
  }

  /**
   * Gestion du spinner pour les boutons suplémentaires.
   * GBE : Bien le faire quand frameModel est init.
   */
  protected setLoading(): void {
    // gestion du spinner pour les boutons save/close
    if (this.frameModel.saveButton) {
      this.subs.push(this.frameModel.saveButton.setLoading());
    }
    if (this.frameModel.saveCloseButton) {
      this.subs.push(this.frameModel.saveCloseButton?.setLoading());
    }
    this.subs.push(this.frameModel.closeButton.setLoading());

    // Gestion du spinner pour les boutons suplémentaires.
    this.frameModel.actions.forEach((button: FrameButtonModel) => {
      if (button) {
        this.subs.push(button.setLoading());
      }
    });
  }
}
