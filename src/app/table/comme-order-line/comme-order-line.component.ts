import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../common/component/basecomponent/base.component';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import { PeriodicElementService } from '../../fakes/service/periodic-element.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../../fakes/service/periodic-element';
import { CommonModule } from '@angular/common';

// TODO GBE : ajouter:
// sous-formulaire.
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

  /** Source de donné du tableau. */
  public dataSource!: MatTableDataSource<PeriodicElement, MatPaginator>;

  constructor(public periodicElementService: PeriodicElementService) {
    super();
  }

  override ngOnInit(): void {
    // init de la source de données.
    this.subscriptions.push(
      this.periodicElementService
        .observableStandarData()
        .subscribe((data: PeriodicElement[]) => {
          console.log('orderLine ngOnInit init data');
          this.dataSource = new MatTableDataSource(data);
          // fonction pour le filtre.
          this.dataSource.filterPredicate = this.filterPredicateCustom;
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
   * Application du filtre dans le tableau.
   * Attention est executé à l'exterieur du composant.
   * Ne peut pas contenir des éléments interne (this.xxx).
   * @param record
   * @param filter
   * @returns
   */
  private filterPredicateCustom(
    record: PeriodicElement,
    filter: string
  ): boolean {
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
