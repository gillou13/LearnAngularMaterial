import { Subject } from 'rxjs';

export class NavigationLink {
  // public id: number;
  public label: string;
  // Pour le moment l'url est pris pour l'identifiant unique.
  public url: string;
  public active: boolean;
  public etat: string; // TODO GBE : a typer par la suite selon les états de form réactive.
  public icon: string; // TODO GBE : a enumerer selon l'utilisation.
  public deleteSubject: Subject<void>;

  constructor(
    /*id: number, */ url: string,
    label: string = '',
    active: boolean = true,
    etat: string = '',
    icon: string = ''
    // emitClose: boolean = false,
  ) {
    this.url = url;
    this.label = label;
    this.active = active;
    this.etat = etat;
    this.icon = icon;
    // this.emitClose = emitClose;
    // this.eventSubject = new Subject<string>();
    this.deleteSubject = new Subject<void>();
  }

  public static copy(dest: NavigationLink, source: NavigationLink): void {
    dest.active = source.active;
    dest.etat = source.etat;
    dest.icon = source.icon;
    dest.label = source.label;
  }
}
