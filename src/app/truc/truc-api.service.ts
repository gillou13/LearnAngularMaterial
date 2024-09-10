import { Injectable } from '@angular/core';
import { TrucModel } from './model/truc-model';
import { delay, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrucApiService {
  constructor() {}

  /**
   * Permet d'enregister un truc.
   * @param truc le truc a enregistrer
   * @returns un observable<boolean> mais normalement devrai être un model de réponse standard (status, msg) mais ce n'est pas le moment.
   * TODO GBE : simulation du appel API avec un temps d'attente de 4 seconds.
   */
  public save(truc: TrucModel): Observable<boolean> {
    console.log('appel a TrucApiService.save() pour :', truc);
    const result = of(true).pipe(
      delay(2000)
      // switchMap((result: boolean) => {
      //   console.log('apiService.save()', result);
      //   return of(result);
      // })
    );
    return result;
  }
}
