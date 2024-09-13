import { Component, inject, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { AbstractControl } from '@angular/forms';
import { iif, Observable, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

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

  public inLoading = false;

  public override ngOnInit(): void {
    super.ngOnInit();

    // Init du formulaire.
    this.subscriptions.push(
      // Récupération du formulaire par navigation ou par initFormData().
      iif(
        () =>
          this.currentLink?.formData !== undefined &&
          !this.currentLink.refreshData,
        of(this.currentLink.formData as TypeForm),
        this.buildFormData()
      )
        .pipe(switchMap((formData: TypeForm) => this.setFormData(formData)))
        .subscribe()
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
   * Lier form au composent.
   */
  protected setFormData(formData: TypeForm): Observable<boolean> {
    this.formData = formData;
    this.currentLink.formData = formData;
    this.currentLink.refreshData = false;
    return of(true);
  }

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

  public saveClose(): Observable<boolean> {
    return of(void 0).pipe(
      switchMap(() => this.save()),
      switchMap((resultSave: boolean) => {
        return resultSave ? this.close() : of(false);
      })
    );
  }

  public reload(): Observable<boolean> {
    return of(true).pipe(
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
