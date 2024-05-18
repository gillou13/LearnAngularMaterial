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
import { map, switchMap, tap } from 'rxjs';
import { FormatInputPathObject } from 'path';

// TODO GBE : ajouter:
// sous-formulaire.
//  - reactiv form OK
// selection.
// colonne fixé de selection et d'action.
// popine de selection des colonnes.
// changement d'ordre des colonnes via drag and drop.
// Filtre avancé.

@Component({
  selector: 'app-comme-order-line',
  standalone: true,
  imports: [MatTableModule, CommonModule, ReactiveFormsModule],
  templateUrl: './comme-order-line.component.html',
  styleUrl: './comme-order-line.component.sass',
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
  public displayColumns: string[] = ['position', 'name', 'weight', 'symbol'];

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
    this.displayColumns.forEach((columnName) => {
      this.fgFilter.addControl(columnName, new FormControl(''));
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
      result &&= formFilterValue.position === record.position;
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
}
