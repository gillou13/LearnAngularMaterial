import { Injectable } from '@angular/core';

/**
 * Service pour la gestion des attributs de test.
 */
@Injectable({
  providedIn: 'root',
})
export class TestService {
  public attributName: string = 'data-cy';

  public attributVisible: boolean = false;

  constructor() {}
}
