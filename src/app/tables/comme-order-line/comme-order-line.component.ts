import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BasePageComponent } from '../../common/component/base-page/base-page.component';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import { PeriodicElementService } from '../../fakes/service/periodic-element.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../../fakes/service/periodic-element';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DisplayColumn } from '../../common/class/display-column';
import { SelectionModel } from '@angular/cdk/collections';
import { map } from 'rxjs';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { _isNumberValue } from '@angular/cdk/coercion';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { FilterOperations } from '../../common/staticTools/filter-operations';
import { FilterType } from '../../common/enum/filter-type';
import { IconToFilterTypePipe } from '../../common/pipe/icon-to-filter-type.pipe';
import { PeriodicElementFilter } from './periodic-element-filter';
import { PageStateService } from '../../common/services/pageState/page-state.service';

// TODO GBE : ajouter:
// -sous-formulaire. OK
//  - reactiv form OK
// -selection OK
// -trie OK
// -pagination OK
// -colonnes fixé des selection et d'action. OK
// -popine de selection des colonnes. OK
// -changement d'ordre des colonnes via drag and drop. OK
// -Filtre
//  - simple OK
//  - avancé OK
// - colonne d'état de la ligne.
// - Enregistrement de l'état
//  - de la recherche OK
//  - pagination. EC
//  - des données modifiés. (sans tous enregistrer...).

@Component({
  selector: 'app-comme-order-line',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatMenuModule,
    DragDropModule,
    CdkDrag,
    CdkDropList,
    IconToFilterTypePipe,
  ],
  templateUrl: './comme-order-line.component.html',
  styleUrl: './comme-order-line.component.sass',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CommeOrderLineComponent
  extends BasePageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  protected override createLink(url: string): NavigationLink {
    return new NavigationLink(url, 'OrderLine', true, 'etat', 'icon');
  }

  public readonly suffixFiltre = 'FilterType';

  /** Colonnes affichées */
  public preDataColumns: DisplayColumn[];
  public dataColumns!: DisplayColumn[];
  public displayColumns!: string[];
  public filterColumns!: string[];

  /** Formulaire de filtre. */
  public fgFilter!: FormGroup;

  /** formulaire parent */
  public form: FormGroup;

  /** tableau de donnée */
  public formArray: FormArray;

  /** Source de donné du tableau. */
  public dataSource!: MatTableDataSource<FormGroup, MatPaginator>;

  /** Gestion de la selection */
  public selection = new SelectionModel<FormGroup>(true, []);

  /** Gestion de l'ouverture du sous-formulaire. */
  public openedSsf = new SelectionModel<FormGroup>(true, []);

  /** Gestion du trie par colonne. */
  @ViewChild(MatSort) sort!: MatSort;

  /** Gestion de la pagination du tableau */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    public periodicElementService: PeriodicElementService,
    private formBuilder: FormBuilder,
    private pageStateService: PageStateService
  ) {
    super();

    // init du formulaire parent et du formArray contenant.
    this.form = this.formBuilder.group({
      array: this.formBuilder.array([]),
    });
    this.formArray = this.form.get('array') as FormArray;

    // Init des tableau des colonnes du tableau.
    this.preDataColumns = [
      new DisplayColumn('position', 'No.'),
      new DisplayColumn('name', 'Nom'),
      new DisplayColumn('weight', 'Poid'),
      new DisplayColumn('symbol', 'Symbole'),
    ];
    this.setTableColumns();

    // init du dataSource.
    this.dataSource = new MatTableDataSource(
      this.formArray.controls as FormGroup[]
    );

    // fonction pour le filtre.
    this.dataSource.filterPredicate = this.filterPredicateCustom;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // init de la source de données.
    this.subscriptions.push(
      this.periodicElementService
        .observableStandarData()
        .pipe(
          // transformer le tableau de donnée en FormGroup.
          map<PeriodicElement[], FormGroup[]>(
            (periodicElements: PeriodicElement[]) => {
              const result = new Array<FormGroup>();
              periodicElements.forEach((periodicElement) =>
                result.push(this.createFgPeriodicElement(periodicElement))
              );
              return result;
            }
          )
        )
        .subscribe((fgElements: FormGroup[]) => {
          // on ajouter les lignes au formArray
          fgElements.forEach((e) => this.formArray.push(e));
        })
    );

    // si l'état est enregistré on le récupére et l'applique.
    // Sinon on le créer.
    if (this.pageStateService.hasStates()) {
      const states = this.pageStateService.getStates() as CurrentState;

      // le fitre
      this.fgFilter = states.fgFilter as FormGroup;
      this.dataSource.filter = JSON.stringify(this.fgFilter.value);
    } else {
      // init du formulaire de filtre :
      this.createFgFilter();
    }

    // this.dataSource.sort = this.sort;

    // pour chaque changement dans le formulaire on applique le filtre au dataSource :
    this.subscriptions.push(
      this.fgFilter.valueChanges.subscribe((values) => {
        this.dataSource.filter = JSON.stringify(values);
      })
    );
  }

  /**
   * Permet de créer le formulaire de filtre pour le tableau.
   */
  private createFgFilter() {
    this.fgFilter = new FormGroup({});
    this.preDataColumns.forEach((dc) => {
      this.fgFilter.addControl(dc.propName, new FormControl(''));
      // Type de filtre avec l'opé par défaut.
      this.fgFilter.addControl(
        dc.propName + this.suffixFiltre,
        new FormControl(
          this.filterTypeByColonneName[dc.propName + this.suffixFiltre][0]
        )
      );
    });
  }

  ngAfterViewInit(): void {
    // init du sort et de la fonction de trie pour le trie du dataSource.
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;

    // si l'état est enregistré on récupére le sort et l'applique. (pas réussi)
    // if (this.pageStateService.hasStates()) {
    //   const sortState = (this.pageStateService.getStates() as CurrentState)
    //     .currentSort as Sort;
    // this.sort.active = sortState.active;
    // this.sort.direction = sortState.direction;
    // this.sort.sortChange.emit(sortState);
    // console.log(sortState);
    // const sortHeader: MatSortHeader = this.sort.sortables.get(sortState.active) as MatSortHeader;
    // sortHeader._setAnimationTransitionState({fromState: sortHeader._arrowDirection, toState: 'active'});
    // this.sort.sortChange.emit(sortHeader);
    // }

    // init de la pagination du tableau.
    // (pour info : a ajouter en cas de changement de la source du matdataSource.)
    this.dataSource.paginator = this.paginator;
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    // Enregistrement de l'état du composant.
    this.saveCurrentState();
  }

  /**
   * Permet d'enregistrer l'état du composant.
   */
  private saveCurrentState() {
    const state = {
      fgFilter: this.fgFilter,
      currentSort: { active: this.sort.active, direction: this.sort.direction },
    } as CurrentState;
    this.pageStateService.addStates(this.currentLink.url, state);
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  /* Fonctions pour la gestion des colonnes                                        */
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /**
   * event sur le changement de selection de colonne.
   */
  public onSelectColumnChange(): void {
    this.setTableColumns();
  }

  public previewIndex: number = 0;

  /**
   * Gestion du changement d'ordre de colonne via de drag and drop dans le menu de selection et par les entêtes de colonne du tableau.
   * @param event dragDrop
   */
  public selectColumnDrop(
    event: CdkDragDrop<DisplayColumn[], DisplayColumn[]>
  ): void {
    moveItemInArray(
      this.preDataColumns,
      event.previousIndex,
      event.currentIndex
    );
    this.setTableColumns();
  }

  /**
   * Calcul des tableaux de colonnes.
   */
  private setTableColumns(): void {
    // les données
    this.dataColumns = this.preDataColumns
      .filter((x) => x.selected)
      .map((x) => x);

    // les displays:
    this.displayColumns = [
      'select',
      'expand',
      ...this.dataColumns.map((x) => x.propName),
      'action',
    ];

    // // les filtres
    this.filterColumns = this.dataColumns.map(
      (x) => x.propName + this.suffixFiltre
    );
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  /* Fonctions pour la gestion du filtre                                           */
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /**
   * Choix possible d'opérateur pour les colonnes.
   * les noms des props doivent être identiques au noms des colonnes de filtre.
   */
  public filterTypeByColonneName = {
    positionFilterType: [
      FilterType.numberEqual,
      FilterType.numberLessOrEqualThan,
      FilterType.numberMoreOrEqualThan,
    ],
    nameFilterType: [FilterType.stringContains],
    weightFilterType: [
      FilterType.numberEqual,
      FilterType.numberLessOrEqualThan,
      FilterType.numberMoreOrEqualThan,
    ],
    symbolFilterType: [FilterType.stringContains],
  } as any;

  /**
   * Renvoi le libellé du control de fgFilter selon le nom de la colonne indiqué en paramètre.
   * @param colName le nom de la colonne de filtre
   * @returns le nom du control de fgFiltre
   */
  public getFilterControlName(colName: string): string {
    return colName.replace(this.suffixFiltre, '');
  }

  /**
   * Application du filtre dans le tableau.
   * Attention est executé à l'exterieur du composant.
   * Ne peut pas contenir des éléments interne (this.xxx).
   * @param record
   * @param filter
   * @returns
   */
  private filterPredicateCustom(fgRecord: FormGroup, filter: string): boolean {
    const record = fgRecord.value as PeriodicElement;
    const formFilterValue = JSON.parse(filter) as PeriodicElementFilter;

    // Tous les props sont vide : on voit tous.
    if (
      !formFilterValue.description &&
      !formFilterValue.name &&
      !formFilterValue.position &&
      !formFilterValue.symbol &&
      !formFilterValue.weight
    ) {
      return true;
    }
    let result = true;

    // Selon le nom:
    result &&= FilterOperations.applyOperator(
      record.name,
      formFilterValue.name,
      formFilterValue.nameFilterType
    );

    // Selon le Symbole:
    result &&= FilterOperations.applyOperator(
      record.symbol,
      formFilterValue.symbol,
      formFilterValue.symbolFilterType
    );

    // Selon le numéro:
    result &&= FilterOperations.applyOperator(
      record.position,
      formFilterValue.position,
      formFilterValue.positionFilterType
    );

    // Selon le poid:
    result &&= FilterOperations.applyOperator(
      record.weight,
      formFilterValue.weight,
      formFilterValue.weightFilterType
    );

    return result;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  /* Fonctions pour la gestion du sous-formulaire                                  */
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /**
   * Permet de créer un FromGroup pour le tableau selon l'élement indiqué en paramètre.
   * @param periodicElement l'élément à ajouter dans le formGroup.
   * @returns un FormGroup.
   */
  createFgPeriodicElement(periodicElement: PeriodicElement): FormGroup {
    const fg = this.formBuilder.group(periodicElement);
    // TODO GBE: pour les validators on vera plus tard...
    return fg;
  }

  /**
   * Permet d'ouvrir/fermer le sous-formulaire
   * @param fgElement fromFroup de l'élément.
   */
  toggleExpand(fgElement: FormGroup): void {
    this.openedSsf.isSelected(fgElement)
      ? this.openedSsf.deselect(fgElement)
      : this.openedSsf.select(fgElement);
  }

  /**
   * Permet de fermer tous les sous-formulaire.
   */
  closeAllExpand(): void {
    this.openedSsf.clear();
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  /* Fonctions pour la gestion de la selection                                     */
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /**
   * Permet le basculement de la selection de tous les éléments.
   */
  toggleAllRows(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.selection.select(...this.dataSource.data);
  }

  /**
   * indique si tous les éléments sont selectionnés.
   */
  isAllSelected(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  /* Fonctions pour la gestion du trie                                             */
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /**
   * Fonction pour le trie des valeurs de dataSource.
   * Attention est executé à l'exterieur du composant.
   * Ne peut pas contenir des éléments internes (this.xxx).
   * @param data
   * @param sortHeaderId
   * @returns un string ou un numérique.
   */
  private sortingDataAccessor(
    fgElement: FormGroup<any>,
    sortHeaderId: string
  ): string | number {
    // TODO GBE : prendre en compte le '.' en cas de valeur dans un obj.
    const value = fgElement.value[sortHeaderId];

    return _isNumberValue(value) ? Number(value) : value;
  }
}

class CurrentState {
  public fgFilter?: FormGroup;
  public currentSort?: { active: string; direction: SortDirection };
  public pagination?: string;
}
