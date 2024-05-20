import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../common/component/basecomponent/base.component';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import { PeriodicElementService } from '../../fakes/service/periodic-element.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
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
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DisplayColumn } from '../../common/class/display-column';
import { SelectionModel } from '@angular/cdk/collections';
import { map, of } from 'rxjs';

// TODO GBE : ajouter:
// -sous-formulaire. OK
//  - reactiv form OK
// -selection OK
// -trie EC
// -colonne fixé de selection et d'action.
// -popine de selection des colonnes.
// -changement d'ordre des colonnes via drag and drop.
// -Filtre
//  - simple OK
//  - avancé

@Component({
  selector: 'app-comme-order-line',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
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
export class CommeOrderLineComponent extends BaseComponent implements OnInit {
  protected override createLink(url: string): NavigationLink {
    return new NavigationLink(url, 'OrderLine', true, 'etat', 'icon');
  }

  /** Colonnes affichées */
  public dataColumns: DisplayColumn[];
  public displayColumns: string[];

  /** Formulaire de filtre. */
  public fgFilter!: FormGroup;

  /** formulaire parent */
  public form: FormGroup;
  public formArray: FormArray;

  /** Source de donné du tableau. */
  public dataSource!: MatTableDataSource<FormGroup, MatPaginator>;

  /** Gestion de la selection */
  public selection = new SelectionModel<FormGroup>(true, []);

  /** Gestion de l'ouverture du sous-formulaire. */
  public openedSsf = new SelectionModel<FormGroup>(true, []);

  constructor(
    public periodicElementService: PeriodicElementService,
    private formBuilder: FormBuilder
  ) {
    super();

    // init du formulaire parent et du formArray contenant.
    this.form = this.formBuilder.group({
      array: this.formBuilder.array([]),
    });
    this.formArray = this.form.get('array') as FormArray;

    // init des displayColumns.
    this.dataColumns = [
      new DisplayColumn('position', 'No.'),
      new DisplayColumn('name', 'Nom'),
      new DisplayColumn('weight', 'Poid'),
      new DisplayColumn('symbol', 'Symbole'),
    ];

    // TODO GBE : colonne d'action a ajouter par la suite.
    this.displayColumns = [
      'select',
      'expand',
      ...this.dataColumns.map((x) => x.propName),
    ];

    // init du dataSource.
    this.dataSource = new MatTableDataSource(
      this.formArray.controls as FormGroup[]
    );

    // fonction pour le filtre.
    this.dataSource.filterPredicate = this.filterPredicateCustom;
  }

  ngOnInit(): void {
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

    // init du formulaire de filtre :
    this.fgFilter = new FormGroup({});
    this.dataColumns.forEach((dc) => {
      this.fgFilter.addControl(dc.propName, new FormControl(''));
    });

    // pour chaque changement dans le formulaire on applique le filtre :
    this.subscriptions.push(
      this.fgFilter.valueChanges.subscribe((values) => {
        this.dataSource.filter = JSON.stringify(values);
      })
    );
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  /* Fonctions pour la gestion du filtre                                           */
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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
    const formFilterValue = JSON.parse(filter) as PeriodicElement;
    // console.log('filterPredicateCustom', formFilterValue);
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
    result &&= stringContains(formFilterValue.name, record.name);

    // Selon le Symbole:
    result &&= stringContains(formFilterValue.symbol, record.symbol);

    // Selon le numéro:
    if (formFilterValue.position) {
      result &&= formFilterValue.position == record.position;
    }

    return result;

    /**
     * Si template est contenu dans target renvoie true. n'est pas sensible à la case.
     * @param template utilisé pour la constrution du regex
     * @param target string testé.
     */
    function stringContains(template: string, target: string): boolean {
      return template === '' || new RegExp(template, 'i').test(target);
    }
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
}
