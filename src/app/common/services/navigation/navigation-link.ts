import { AbstractControl } from '@angular/forms';

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

  /**GBE:  Non utilisé pour le moment. */
  public static copy(dest: NavigationLink, source: NavigationLink): void {
    dest.active = source.active;
    dest.etat = source.etat;
    dest.icon = source.icon;
    dest.label = source.label;
  }
}
