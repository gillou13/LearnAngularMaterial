import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../common/component/basecomponent/base.component';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import { PeriodicElementService } from '../../fakes/service/periodic-element.service';
import { PeriodicElement } from '../../fakes/service/periodic-element';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-basic2',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './basic2.component.html',
  styleUrl: './basic2.component.sass',
})
export class Basic2Component extends BaseComponent implements OnInit {
  public data: PeriodicElement[] = new Array<PeriodicElement>();
  public displayColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  public constructor(public periodicElementService: PeriodicElementService) {
    super();
  }

  ngOnInit(): void {
    this.data = this.periodicElementService.getStandardData();
  }

  protected override createLink(url: string): NavigationLink {
    return new NavigationLink(url, 'tableau basique V2', true, 'etat', 'icon');
  }
}
