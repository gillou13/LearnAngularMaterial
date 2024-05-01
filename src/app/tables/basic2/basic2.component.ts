import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../common/component/basecomponent/base.component';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import { NavigationService } from '../../common/services/navigation/navigation.service';
import { PeriodicElementService } from '../../fakes/service/periodic-element.service';
import { Router } from '@angular/router';
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

  public constructor(
    router: Router,
    navigationService: NavigationService,
    public periodicElementService: PeriodicElementService
  ) {
    super(router, navigationService);
  }

  override ngOnInit(): void {
    this.data = this.periodicElementService.getStandardData();
    super.ngOnInit();
  }

  protected override createLink(): NavigationLink {
    return new NavigationLink(
      this.router.url,
      'tableau basique V2',
      true,
      'etat',
      'icon'
    );
  }
}
