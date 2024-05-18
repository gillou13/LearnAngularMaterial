import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../common/component/basecomponent/base.component';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../../fakes/service/periodic-element';
import { PeriodicElementService } from '../../fakes/service/periodic-element.service';
import { NavigationService } from '../../common/services/navigation/navigation.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

interface DisplayColumn {
  columnName: string;
  ColumnHeader: string;
}

@Component({
  selector: 'app-expandable1',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './expandable1.component.html',
  styleUrl: './expandable1.component.sass',
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
export class Expandable1Component extends BaseComponent implements OnInit {
  public datas: PeriodicElement[] = new Array<PeriodicElement>();
  // public tabExpanded: any[] = new Array<any>();
  public displayColumns: DisplayColumn[] = [
    { columnName: 'position', ColumnHeader: 'No.' },
    { columnName: 'name', ColumnHeader: 'Nom' },
    { columnName: 'weight', ColumnHeader: 'poid' },
    { columnName: 'symbol', ColumnHeader: 'symbole' },
  ];
  public displayColumnsWithExpand: DisplayColumn[] = [
    ...this.displayColumns,
    { columnName: 'expand', ColumnHeader: 'EX' },
  ];

  public getColumnsName(): string[] {
    return this.displayColumnsWithExpand.map((c) => c.columnName);
  }

  public constructor(public periodicElementService: PeriodicElementService) {
    super();
  }

  override ngOnInit(): void {
    this.datas = this.periodicElementService
      .getStandardData()
      .map((x) => Object.assign(x, { expanded: false }));
    // this.tabExpanded = this.datas.map((x) => {
    //   return { position: x.position, expanded: false};
    // });
    super.ngOnInit();
  }

  protected override createLink(): NavigationLink {
    return new NavigationLink(
      this.router.url,
      'tab expandable V1',
      true,
      'etat',
      'icon'
    );
  }

  public toggleExpand(element: any): void {
    element.expanded = !element.expanded;
  }
}
