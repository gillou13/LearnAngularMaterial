import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { BaseFormComponent } from '../../common/component/base-form/base-form.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  catchError,
  concat,
  distinctUntilChanged,
  EMPTY,
  iif,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import { FormStatus } from '../../common/component/base-form/models/form-status';
import { Guid } from '../../tools/guid';
import { FormFrameComponent } from '../../common/component/form-frame/form-frame.component';
import { MatInputModule } from '@angular/material/input';
import { StateApiFakeService } from '../../common/services/fakeApi/state.service';
import { TestIdDirective } from '../../common/directives/test-id.directive';

@Component({
  selector: 'app-test-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    NgSelectModule,
    FormFrameComponent,
    TestIdDirective,
  ],
  templateUrl: './test-select.component.html',
  styleUrl: './test-select.component.scss',
})
export class TestSelectComponent extends BaseFormComponent<FormGroup> {
  private readonly fb = inject(FormBuilder);
  private readonly stateService = inject(StateApiFakeService);

  // simple
  public states$ = this.stateService.getAll();

  // typeahead
  public typeaheadOptions$: Observable<any[]> | undefined;
  public typeaheadInput$ = new Subject<string>();
  public typeaheadLoading = false;

  // typeahead with value
  public typeaheadWithValueOptions$: Observable<any[]> | undefined;
  public typeaheadWithValueInput$ = new Subject<string>();
  public typeaheadWithValueLoading = false;

  // stateVirtualScroll
  public virtualScrollOptions: any[] = [];
  public virtualScrollLoading = false;
  public virtualScrollNbPage = 0;
  public virtualScrollSubject = new Subject<void>();

  public vsOnScrollToEnd(): void {
    this.virtualScrollSubject.next();
  }

  // stateVirtualScrollWithValue
  public virtualScrollWithValueOptions: any[] = [];
  public virtualScrollWithValueLoading = false;
  public virtualScrollWithValueNbPage = 0;
  public virtualScrollWithValueSubject = new Subject<void>();
  public virtualScrollWithValueMatchFirstValue = false;

  public vsOnScrollWithValueToEnd(): void {
    this.virtualScrollWithValueSubject.next();
  }

  // stateComplex
  public stateComplexOptions$: Observable<any[]> | undefined;
  public stateComplexBuffer: any[] = [];
  public stateComplexCurrentValue: any | undefined;
  public stateComplexSearch: string = '';
  // Utilisation des signaux pour géréer la double attente.
  public stateComplexLoadingSearch: WritableSignal<boolean> =
    signal<boolean>(false);
  public stateComplexLoadingOnScroll: WritableSignal<boolean> =
    signal<boolean>(false);
  public stateComplexLoading = computed<boolean>(
    () => this.stateComplexLoadingOnScroll() || this.stateComplexLoadingSearch()
  );
  public stateComplexInputSubject$ = new Subject<string>();
  public stateComplexScrollSubject$ = new Subject<void>();
  public stateComplexNbPage = 0;

  public trackByFn(obj: any): string {
    return obj.abbreviation;
  }

  // public onStateComplexScroll(event: any): void {
  //   // console.log(event);
  // }

  public onStateComplexScrollToEnd(): void {
    this.stateComplexScrollSubject$.next(void 0);
  }

  /**
   * A chaque changement de valeur on enregistre l'obj pour ne pas le perdre dans le buffer en cas nouvelle recherche de l'utilisateur.
   * @param event La valeur selectionné
   */
  public onStateComplexChange(event: any): void {
    console.log('current value : ', event);
    this.stateComplexCurrentValue = event;
  }

  /**
   * A la 1ère ouverture, si le buffer est vide on ajoute les 1ères options.
   */
  public onStateComplexOpen(): void {
    if (this.stateComplexBuffer.length === 0) {
      this.stateComplexScrollSubject$.next(void 0);
    }
  }

  protected override buildFormData(): Observable<FormGroup<any>> {
    return of(void 0).pipe(
      switchMap(() => {
        const form = this.fb.group({
          id: [Guid.newGuid(), Validators.required],
          value1: [1, Validators.required],
          value2: '',
          value3: this.fb.control<number>(1, Validators.required),
          stateSimple: '',
          stateTypeahead: '',
          stateTypeaheadWithValue: 'CA',
          stateVirtualScroll: '',
          stateVirtualScrollWithValue: 'NC',
          // stateComplex: { name: 'New Hampshire', abbreviation: 'NH' },
          stateComplex: 'MI',
        });
        return of(form);
      })
    );
  }

  protected override endOnInit(): void {
    // liste pour typeahead.
    this.typeaheadOptions$ = concat(
      // valeur par défaut.
      of([]),
      // résultat de la recherche.
      this.typeaheadInput$.pipe(
        distinctUntilChanged(),
        tap(() => (this.typeaheadLoading = true)),
        switchMap((search: string) => {
          return this.stateService.getSearch(search).pipe(
            catchError(() => of([])) // En cas d'erreur, renvoi une liste vide.
          );
        }),
        tap(() => (this.typeaheadLoading = false))
      )
    );

    // liste pour typeheadWithValue.
    this.typeaheadWithValueOptions$ = concat(
      // valeur par défaut.
      this.stateService
        .getById(this.formData.get('stateTypeaheadWithValue')!.value)
        .pipe(
          switchMap((obj: any) => {
            return of([obj]);
          })
        ),
      // résultat de la recherche.
      this.typeaheadWithValueInput$.pipe(
        distinctUntilChanged(),
        tap(() => (this.typeaheadWithValueLoading = true)),
        switchMap((search: string) => {
          return this.stateService.getSearch(search).pipe(
            catchError(() => of([])) // En cas d'erreur, renvoi une liste vide.
          );
        }),
        tap(() => (this.typeaheadWithValueLoading = false))
      )
    );

    // liste pour virtual scroll
    this.subscriptions.push(
      this.virtualScrollSubject
        .pipe(
          tap(() => (this.virtualScrollLoading = true)),
          // recupération des prochaines options.
          switchMap(() =>
            this.stateService.getWithPaging('', 10, this.virtualScrollNbPage)
          ),
          // ajout des nouvelles options dans la liste.
          switchMap((newOptions: any[]) => {
            this.virtualScrollOptions =
              this.virtualScrollOptions.concat(newOptions);
            this.virtualScrollNbPage++;
            return of(void 0);
          }),
          tap(() => (this.virtualScrollLoading = false))
        )
        .subscribe()
    );
    // pour initialiser les 1ères options.
    this.virtualScrollSubject.next();

    // liste pour virtual scroll with value
    this.subscriptions.push(
      this.virtualScrollWithValueSubject
        .pipe(
          tap(() => (this.virtualScrollWithValueLoading = true)),
          // recupération des prochaines options.
          switchMap(() =>
            this.stateService.getWithPaging(
              '',
              10,
              this.virtualScrollWithValueNbPage
            )
          ),
          // Si la valeur courrant est présente dans les nouvelles options on la supprime de la 1ère place.
          tap((newOptions: any[]) => {
            if (
              !this.virtualScrollWithValueMatchFirstValue &&
              newOptions.some(
                (value: any) =>
                  this.formData.get('stateVirtualScrollWithValue')!.value ===
                  value.abbreviation
              )
            ) {
              this.virtualScrollWithValueMatchFirstValue = true;
              this.virtualScrollWithValueOptions.splice(0, 1);
            }
          }),
          // ajout des nouvelles options dans la liste.
          switchMap((newOptions: any[]) => {
            this.virtualScrollWithValueOptions =
              this.virtualScrollWithValueOptions.concat(newOptions);
            this.virtualScrollWithValueNbPage++;
            return of(void 0);
          }),
          tap(() => (this.virtualScrollWithValueLoading = false))
        )
        .subscribe()
    );
    // pour initialiser les 1ères options.
    this.subscriptions.push(
      this.stateService
        .getById(this.formData.get('stateVirtualScrollWithValue')!.value)
        .pipe(
          tap((currentValue: any) =>
            this.virtualScrollWithValueOptions.push(currentValue)
          ),
          tap(() => this.virtualScrollWithValueSubject.next())
        )
        .subscribe()
    );

    // Liste pour stateComplex
    // concaténation des Observable pouvant être appelé.
    this.stateComplexOptions$ = concat(
      // 1) valeur par défaut
      this.stateService.getById(this.formData.get('stateComplex')!.value).pipe(
        tap((value: any) => {
          this.stateComplexCurrentValue = value;
        })
      ),
      // 2) sur event de fin de liste
      this.stateComplexScrollSubject$.pipe(
        // Si en cours de chargement on ne fait rien.
        switchMap(() =>
          this.stateComplexLoadingOnScroll() ? of() : of(void 0)
        ),
        // distinctUntilChanged(),
        tap(() => this.stateComplexLoadingOnScroll.set(true)),
        switchMap(() => this.addNewValues()),
        tap(() => this.stateComplexLoadingOnScroll.set(false))
      ),
      // 3) à la recherche de l'utilisateur
      this.stateComplexInputSubject$.pipe(
        distinctUntilChanged(),
        tap(() => this.stateComplexLoadingSearch.set(true)),
        // On réinit le buffer
        tap((search: string) => {
          this.stateComplexSearch = search;
          this.stateComplexBuffer = [];
          this.stateComplexNbPage = 0;
        }),
        switchMap(() => this.addNewValues()),
        tap(() => this.stateComplexLoadingSearch.set(false))
      )
    ).pipe(
      // à chaque fois, on renvoi le buffer.
      switchMap(() => {
        // si la valeur actuel n'est pas dans le buffer on l'ajout en 1ère position.
        console.log('stateComplexOptions', this.stateComplexBuffer.length);
        if (
          this.stateComplexCurrentValue !== undefined &&
          !this.stateComplexBuffer.some(
            (val: any) =>
              val.abbreviation === this.stateComplexCurrentValue?.abbreviation
          )
        ) {
          return of([
            this.stateComplexCurrentValue,
            ...this.stateComplexBuffer,
          ]);
        }
        // si on indique directement le buffer le ng-select par en cacahuète...
        return of([...this.stateComplexBuffer]);
      })
    );
  }

  private addNewValues(): Observable<void> {
    return of(void 0).pipe(
      switchMap(() =>
        this.stateService.getWithPaging(
          this.stateComplexSearch,
          10,
          this.stateComplexNbPage
        )
      ),
      // ajout des nouvelles valeurs dans le buffer
      switchMap((values: any[]) => {
        if (values !== undefined && values.length > 0) {
          this.stateComplexBuffer.push(...values);
          this.stateComplexNbPage++;
        }
        return of(void 0);
      })
    );
  }

  protected override InitStatus(): Observable<boolean> {
    // pour le moment juste un fack initStatus.
    return of(true).pipe(
      tap(() => {
        this.formStatus = new FormStatus();
        this.formStatus.mode = 'new';
      })
    );
  }

  public override save(): Observable<boolean> {
    // Pour le moment juste un fack save.
    return of(true);
  }

  protected override createLink(url: string): NavigationLink {
    return new NavigationLink(url, 'test ng-select', true, 'etat', 'icon');
  }

  // Valeurs static :
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
}
