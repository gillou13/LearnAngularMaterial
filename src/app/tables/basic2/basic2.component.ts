import { Component, inject, OnInit } from '@angular/core';
import { BasePageComponent } from '../../common/component/base-page/base-page.component';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import { PeriodicElementService } from '../../fakes/service/periodic-element.service';
import { PeriodicElement } from '../../fakes/service/periodic-element';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-basic2',
    imports: [MatTableModule],
    templateUrl: './basic2.component.html',
    styleUrl: './basic2.component.sass'
})
export class Basic2Component extends BasePageComponent implements OnInit {
  private periodicElementService = inject(PeriodicElementService);

  public data: PeriodicElement[] = new Array<PeriodicElement>();
  public displayColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  override ngOnInit(): void {
    super.ngOnInit();
    this.data = this.periodicElementService.getStandardData();
  }

  protected override createLink(url: string): NavigationLink {
    return new NavigationLink(url, 'tableau basique V2', true, 'etat', 'icon');
  }
}
