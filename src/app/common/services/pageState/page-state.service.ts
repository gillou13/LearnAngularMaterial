import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Permet la gestion de l'état d'un composant après sa destruction.
 */
@Injectable({
  providedIn: 'root',
})
export class PageStateService {
  /**
   * Le dico avec les données.
   */
  private states: Map<string, any> = new Map<string, any>();

  constructor(private router: Router) {}

  /**
   * Permet d'ajouter/remplacer l'état du formulaire.
   * @param url url = key
   * @param state l'état du composant.
   */
  public addStates(url: string, state: any): void {
    this.states.set(url, state);
  }

  /**
   * Permet d'obtenir l'état enregistré.
   * @returns l'état du formulaire.
   */
  public getStates(): any | undefined {
    const state = this.states.get(this.router.url);
    return state;
  }

  /**
   * Renvoi true si l'état correspondant à l'url existe.
   * @returns boolean
   */
  public hasStates(): boolean {
    return this.states.has(this.router.url);
  }

  /**
   * Permet de supprimer l'état du formulaire.
   * @param url url = key
   */
  public deleteStates(url: string): void {
    this.states.delete(url);
  }

  /**
   * Pour les tests.
   */
  public afficherState(): void {
    console.log(this.states);
  }
}
