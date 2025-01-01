import { Component, ElementRef, ViewChild } from '@angular/core';
import { BasePageComponent } from '../../common/component/base-page/base-page.component';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

/**
 * but : réaliser un jeu qui calcule le nombre le calcul mentale juste en un temps données.
 * - paramètrages:
 *  - nombre maximum des multiplicateurs.
 *  - temps du minuteur
 * - historique des derniers jeux
 * - un minuteur
 * - deux compteurs (bonnes et mauvaise réponse)
 * - interface : 2 chiffres + un champs de réponse (entrée pour valider une réponse)
 */
@Component({
    selector: 'app-table-multi',
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    templateUrl: './table-multi.component.html',
    styleUrl: './table-multi.component.sass'
})
export class TableMultiComponent extends BasePageComponent {
  @ViewChild('inputResult') inputResult!: ElementRef;
  public paramTime: number = 30;
  public paramMax: number = 10;
  public compteur: number = 0;
  public inGame: boolean = false;
  private interval: any;
  public number1: number = 0;
  public number2: number = 0;
  public result: number | undefined = undefined;
  public nbErreurs: number = 0;
  public nbJustes: number = 0;
  public scores: string[] = new Array<string>();

  /** Création de l'onglet. */
  protected override createLink(url: string): NavigationLink {
    return new NavigationLink(
      url,
      'jeu de calcul mentale',
      true,
      'etat',
      'icon'
    );
  }

  /** Permet de lancer une partie */
  public lancer(): void {
    this.inGame = true;
    this.compteur = this.paramTime;
    this.interval = setInterval(() => {
      this.compteur--;
      if (this.compteur <= 0) {
        this.inGame = false;
        this.inputResult.nativeElement.disabled = true;
        this.saveResult();
        clearInterval(this.interval);
      }
    }, 1000);
    this.razNumbers();
    this.inputResult.nativeElement.disabled = false;
    this.inputResult.nativeElement.focus();
    this.nbJustes = 0;
    this.nbErreurs = 0;
  }

  /** l'utilisateur à validé un résultat. */
  public propal(): void {
    console.log('result : ', this.result);
    if (this.result === this.number1 * this.number2) {
      this.nbJustes++;
    } else {
      this.nbErreurs++;
    }
    this.razNumbers();
  }

  private razNumbers(): void {
    const min = 0;
    this.number1 = Math.floor(Math.random() * (this.paramMax - min + 1) + min);
    this.number2 = Math.floor(Math.random() * (this.paramMax - min + 1) + min);
    this.result = undefined;
  }

  private saveResult(): void {
    this.scores.push(
      `${this.nbJustes} bonnes réponses pour ${
        this.nbErreurs + this.nbJustes
      } questions.`
    );
  }
}
