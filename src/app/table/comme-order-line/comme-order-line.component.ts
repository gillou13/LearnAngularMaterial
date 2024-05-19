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
import { DisplayColumn } from '../../common/class/display-column';

// TODO GBE : ajouter:
// sous-formulaire. OK
//  - reactiv form OK
// selection.
// colonne fixé de selection et d'action.
// popine de selection des colonnes.
// changement d'ordre des colonnes via drag and drop.
// Filtre avancé.

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
  protected override createLink(): NavigationLink {
    return new NavigationLink(
      this.router.url,
      'OrderLine',
      true,
      'etat',
      'icon'
    );
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
  public dataSource!: MatTableDataSource<AbstractControl, MatPaginator>;

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
      'expand',
      ...this.dataColumns.map((x) => x.propName),
    ];

    // init du dataSource.
    this.dataSource = new MatTableDataSource(this.formArray.controls);

    // fonction pour le filtre.
    this.dataSource.filterPredicate = this.filterPredicateCustom;
  }

  override ngOnInit(): void {
    // init de la source de données.
    this.subscriptions.push(
      this.periodicElementService
        .observableStandarData()
        // GBE : juste pour le test...
        // .pipe(
        //   // transformer le tableau de donnée en FormGroup.
        //   map<PeriodicElement[], FormGroup[]>((periodicElements) => {
        //     const result = new Array<FormGroup>();
        //     periodicElements.forEach((periodicElement) =>
        //       result.push(this.formGroupToPeriodicElement(periodicElement))
        //     )
        //     return result;
        //   }),
        // )
        .subscribe((periodicElements: PeriodicElement[]) => {
          // on ajouter les lignes au formArray
          periodicElements.forEach((pe) =>
            this.formArray.push(this.createFgPeriodicElement(pe))
          );
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

  /**
   * Permet de créer un FromGroup pour le tableau selon l'élement indiqué en paramètre.
   * @param periodicElement l'élément à ajouter dans le formGroup.
   * @returns un FormGroup.
   */
  createFgPeriodicElement(periodicElement: PeriodicElement): FormGroup {
    // un id pour les différencier
    // expand pour la gestion du sous-formulaire
    const fg = this.formBuilder.group({
      ...periodicElement,
      expand: false,
      id: crypto.randomUUID(),
    });
    // TODO GBE: pour les validators on vera plus tard...
    return fg;
  }

  /**
   * Application du filtre dans le tableau.
   * Attention est executé à l'exterieur du composant.
   * Ne peut pas contenir des éléments interne (this.xxx).
   * @param record
   * @param filter
   * @returns
   */
  private filterPredicateCustom(
    fgRecord: AbstractControl<any, any>,
    filter: string
  ): boolean {
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

  // Fonctions pour la gestion du sous-formulaire

  /**
   * Permet d'ouvrir/fermer le sous-formulaire
   * @param fgElement fromFroup de l'élément.
   */
  toggleExpand(fgElement: FormGroup): void {
    const fgExpand = fgElement.get('expand') as FormControl;
    fgExpand.setValue(!fgExpand.value, { onlySelf: true });
  }
}
