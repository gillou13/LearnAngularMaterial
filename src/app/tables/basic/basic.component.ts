import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../../common/component/base-page/base-page.component';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import { NavigationService } from '../../common/services/navigation/navigation.service';
import { Router } from '@angular/router';
import { PeriodicElementService } from '../../fakes/service/periodic-element.service';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-basic',
    imports: [MatTableModule],
    templateUrl: './basic.component.html',
    styleUrl: './basic.component.sass'
})
export class BasicComponent extends BasePageComponent {
  public displayColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  public constructor(public periodicElementService: PeriodicElementService) {
    super();
  }

  protected override createLink(url: string): NavigationLink {
    return new NavigationLink(url, 'tableau basique', true, 'etat', 'icon');
  }
}
