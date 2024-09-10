import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BasePageComponent } from '../../common/component/base-page/base-page.component';
import { NavigationLink } from '../../common/services/navigation/navigation-link';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-tab1',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './tab1.component.html',
  styleUrl: './tab1.component.sass',
})
export class Tab1Component extends BasePageComponent {
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public dataSource = ELEMENT_DATA;

  protected override createLink(url: string): NavigationLink {
    return new NavigationLink(url, 'tab1', true, 'etat', 'icon');
  }
}
