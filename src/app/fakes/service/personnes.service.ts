import { Injectable } from '@angular/core';
import { Personne } from './personne';
import { Observable, of } from 'rxjs';

const ELEMENT_DATA: Personne[] = [
  { id: '1', nom: 'Biguet', prenom: 'Gilles', age: 44, autre: "c'est moi" },
  { id: '2', nom: 'Biguet', prenom: 'Nathalie', age: 38, autre: 'ma fury' },
  { id: '3', nom: 'Biguet', prenom: 'Arthur', age: 9, autre: 'radio Arthur' },
  { id: '4', nom: 'Biguet', prenom: 'Quentin', age: 6, autre: 'la purge' },
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
