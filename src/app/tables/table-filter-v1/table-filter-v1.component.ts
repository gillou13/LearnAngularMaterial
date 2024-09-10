import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BasePageComponent } from '../../common/component/base-page/base-page.component';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import { PeriodicElementService } from '../../fakes/service/periodic-element.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElement } from '../../fakes/service/periodic-element';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table-filter-v1',
  standalone: true,
  imports: [MatTableModule, CommonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './table-filter-v1.component.html',
  styleUrl: './table-filter-v1.component.sass',
})
export class TableFilterV1Component
  extends BasePageComponent
  implements OnInit
{
  public displayColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  public fgFilter: FormGroup;

  public filterDictonnary = new Map<string, string>();

  public dataSource: MatTableDataSource<PeriodicElement, MatPaginator>;
  // public dataSource = new MatTableDataSource(
  //   this.periodicElementService.getStandardData()
  // );

  public constructor(public periodicElementService: PeriodicElementService) {
    super();

    // init de la source de données.
    this.dataSource = new MatTableDataSource(
      this.periodicElementService.getStandardData()
    );
    this.dataSource.filterPredicate = this.filterPredicateCustom;

    // init du formulaire de filtre :
    this.fgFilter = new FormGroup({});
    this.displayColumns.forEach((columnName) => {
      this.fgFilter.addControl(columnName, new FormControl(''));
    });
  }

  ngOnInit(): void {
    // pour chaque changement dans le formulaire on applique le filtre :
    this.subscriptions.push(
      this.fgFilter.valueChanges.subscribe((values) => {
        // console.log('fgFilterChange : ', values, JSON.stringify(values));
        this.dataSource.filter = JSON.stringify(values);
      })
    );
  }

  protected override createLink(url: string): NavigationLink {
    return new NavigationLink(url, 'tableau filtré 1', true, 'etat', 'icon');
  }

  /**
   * Application du filtre dans le tableau.
   * Attention est executé à l'exterieur du composant.
   * Ne peu pas contenir des éléments interne (this.xxx).
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
    if (formFilterValue.name) {
      result &&= stringContains(formFilterValue.name, record.name);
    }

    // Selon le Symbole:
    if (formFilterValue.symbol) {
      result &&= stringContains(formFilterValue.symbol, record.symbol);
    }

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
      return new RegExp(template, 'i').test(target);
    }
  }
}
