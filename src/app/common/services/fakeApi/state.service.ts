import { Injectable } from '@angular/core';
import { delay, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateApiFakeService {
  private states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District Of Columbia', abbreviation: 'DC' },
    { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Guam', abbreviation: 'GU' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Marshall Islands', abbreviation: 'MH' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Northern Mariana Islands', abbreviation: 'MP' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Palau', abbreviation: 'PW' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Puerto Rico', abbreviation: 'PR' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virgin Islands', abbreviation: 'VI' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' },
  ];

  constructor() {}

  /**
   * Renvoi tous les states.
   * @returns name, abbreviation.
   */
  public getAll(): Observable<any[]> {
    return of(this.states).pipe(
      delay(1000)
      // tap(() =>
      //   console.log('statesService.getAll', Date.now().toLocaleString('fr-FR'))
      // )
    );
  }

  public getById(id: string): Observable<any> {
    return of(void 0).pipe(
      switchMap(() => {
        const result = this.states.find((state) => state.abbreviation === id);
        if (result === undefined) {
          return of([]);
        }
        return of(result);
      }),
      delay(1000)
      // tap((val) => console.log('getById', val))
    );
  }

  private search(search: string = ''): Observable<any[]> {
    return of(void 0).pipe(
      switchMap(() => {
        if (search === '') {
          return of(this.states);
        } else {
          const regex = new RegExp(search, 'i');
          const result = this.states.filter(
            (state) => regex.test(state.name) || regex.test(state.abbreviation)
          );
          return of(result);
        }
      })
    );
  }

  public getSearch(search: string = ''): Observable<any[]> {
    return this.search(search).pipe(
      delay(1000)
      // tap(() => console.log('getSearch'))
    );
  }

  /**
   * Permet de simuler un appel Api pour la recherche + pagination des states.
   * @param search champs de recherche pour la selection des états
   * @param take nombre de résultat envoyé
   * @param skip nombre de page passé.
   * @returns.
   */
  public getWithPaging(
    search: string = '',
    take: number = 10,
    skip: number = 0
  ): Observable<any[]> {
    return of(void 0).pipe(
      // prise en compte de la recherche.
      switchMap(() => this.search(search)),
      // prise en compte de la pagination.
      switchMap((searchResult: any[]) => {
        const start = skip * take;
        let end = start + take;
        if (end > this.states.length) {
          end = this.states.length;
        }
        const result = searchResult.slice(start, end);
        return of(result);
      }),
      delay(500)
      // tap(() => console.log('statesService.getWithPaging', skip))
    );
  }
}
