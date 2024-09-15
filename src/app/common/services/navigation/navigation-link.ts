import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class NavigationLink {
  // public id: number;
  public label: string;
  // Pour le moment l'url est pris pour l'identifiant unique.
  public url: string;
  public active: boolean;
  public etat: string; // TODO GBE : a typer par la suite selon les états de form réactive.
  public icon: string; // TODO GBE : a enumerer selon l'utilisation.
  /** si true, refresh au prochain chargement de la page. */
  public refreshData: boolean;

  /** Lien vers le formulaire lié au composant. */
  public formData?: AbstractControl;

  /** fonction délégué pour l'enregistrement du formulaire liée.
   * A implémenter dans le composant. (est obligatoire si formData est indiqué.)
   */
  public saveAction!: (form: any) => Observable<boolean>;

  constructor(
    /*id: number, */ url: string,
    label: string = '',
    active: boolean = true,
    etat: string = '',
    icon: string = ''
  ) {
    this.url = url;
    this.label = label;
    this.active = active;
    this.etat = etat;
    this.icon = icon;
    this.refreshData = false;
  }
}
