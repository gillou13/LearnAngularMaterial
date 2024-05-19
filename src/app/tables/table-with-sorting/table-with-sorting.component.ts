import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BaseComponent } from '../../common/component/basecomponent/base.component';
import { PeriodicElementService } from '../../fakes/service/periodic-element.service';
import { NavigationLink } from '../../common/services/navigation/navigation-link';

@Component({
  selector: 'app-table-with-sorting',
  standalone: true,
  imports: [MatTableModule, MatSortModule],
  templateUrl: './table-with-sorting.component.html',
  styleUrl: './table-with-sorting.component.sass',
})
export class TableWithSortingComponent
  extends BaseComponent
  implements AfterViewInit
{
  public displayColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  public dataSource = new MatTableDataSource(
    this.periodicElementService.getStandardData()
  );

  @ViewChild(MatSort) sort!: MatSort;

  public constructor(public periodicElementService: PeriodicElementService) {
    super();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  protected override createLink(url: string): NavigationLink {
    return new NavigationLink(url, 'tableau sorting', true, 'etat', 'icon');
  }
}
