import { Injectable } from '@angular/core';
import { Personne } from './personne';
import { Observable, of } from 'rxjs';

const ELEMENT_DATA: Personne[] = [
  { nom: 'Biguet', prenom: 'Gilles', age: 44, autre: "c'est moi" },
  { nom: 'Biguet', prenom: 'Nathalie', age: 38, autre: 'ma fury' },
  { nom: 'Biguet', prenom: 'Arthur', age: 9, autre: 'radio Arthur' },
  { nom: 'Biguet', prenom: 'Quentin', age: 6, autre: 'la purge' },
];

@Injectable({
  providedIn: 'root',
})
export class PersonnesService {
  constructor() {}

  public getAllPersonnes(): Observable<Personne[]> {
    return of(ELEMENT_DATA);
  }
}
