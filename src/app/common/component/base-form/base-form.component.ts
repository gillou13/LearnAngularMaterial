import { Component, inject, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { AbstractControl } from '@angular/forms';
import { firstValueFrom, iif, Observable, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { FormStatus } from './models/form-status';

/**
 * Base de composant à destination d'un formulaire.
 * implémente BasePageComponent
 * ajout :
 * - formData pour la gestion de la saisie.
 * - les fonctions abtstraites : buildFormData,
 * - les fonctions : close, saveClose, setFromData,
 * @type TypeForm: FormGroup | FormArray
 */
@Component({
  selector: 'app-base-form',
  standalone: true,
  template: '<p>example<p>',
})
export abstract class BaseFormComponent<TypeForm extends AbstractControl>
  extends BasePageComponent
  implements OnInit
{
  /** routage */
  protected router = inject(Router);

  /** formulaire réactif */
  public formData!: TypeForm;

  /** état du formulaire */
  public formStatus!: FormStatus;

  public override async ngOnInit(): Promise<void> {
    super.ngOnInit();

    // Init des données & formulaire.
    await firstValueFrom(
      of(void 0).pipe(
        // Gestion du chargement. (début)
        tap(() => (this.inLoading = true)),
        // init de l'état de la page
        switchMap(() => this.InitStatus()),
        // Récupération du formulaire par navigation ou par initFormData().
        switchMap(() => {
          return iif(
            () =>
              this.currentLink?.formData !== undefined &&
              !this.currentLink.refreshData,
            of(this.currentLink.formData as TypeForm),
            this.buildFormData()
          );
        }),
        // Set du formulaire
        switchMap((formData: TypeForm) => this.setFormData(formData)),
        // action à la fin du chargement.
        tap(() => this.endOnInit()),
        // Gestion du chargement. (fin)
        tap(() => (this.inLoading = false))
      )
    );
  }

  /**
   * Doit générer le formulaire via les paramètres d'url.
   * - si ./new > création formulaire
   * - si ./edit/{id} > appel Api > création formulaire.
   * ! Doit prendre en compte l'état inLoading.
   */
  protected abstract buildFormData(): Observable<TypeForm>;

  /**
   * Doit initialiser les stats du document (FormStatus).
   * et récupérer les paramètres de l'url.
   * */
  protected abstract InitStatus(): Observable<boolean>;

  /**
   * Lier form au composent.
   */
  protected setFormData(formData: TypeForm): Observable<boolean> {
    return of(true).pipe(
      tap(() => {
        // liaison du formulaire
        this.formData = formData;
        this.currentLink.formData = formData;
        this.currentLink.refreshData = false;
      })
    );
  }

  /**
   * Fonction executé à la fin du OnInit
   */
  protected endOnInit(): void {}

  /**
   * Doit contenir la logique d'enregistrement du formulaire
   * Et de renouvellement du FormData.
   * @returns true si l'enregistrement est OK.
   */
  public abstract save(): Observable<boolean>;

  /**
   * Fermeture du formulaire
   * (utilisation du navigationService. a qui on délégue les questions de validation de saisie)
   * @returns True si la page est bien fermé.
   */
  public close(): Observable<boolean> {
    return this.navigationService.onDeleteLink(this.currentLink);
  }

  /**
   * Enregistrement & fermeture du formulaire.
   * @returns True si la page à bien été enregistré puis fermé.
   */
  public saveClose(): Observable<boolean> {
    return this.save().pipe(
      switchMap((resultSave: boolean) => {
        return resultSave ? this.close() : of(false);
      })
    );
  }

  /**
   * Rechargement du formulaire.
   */
  public reload(): Observable<boolean> {
    return of(true).pipe(
      // on indique au service de navigation de ne pas récupérer le formulaire enregitré.
      tap(() => {
        this.currentLink.refreshData = true;
      }),
      // on navigue par deux fois.
      tap(() => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigateByUrl(this.currentLink.url);
          });
      })
    );
  }
}
