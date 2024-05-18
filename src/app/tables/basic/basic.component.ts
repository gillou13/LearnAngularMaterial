import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../common/component/basecomponent/base.component';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import { NavigationService } from '../../common/services/navigation/navigation.service';
import { Router } from '@angular/router';
import { PeriodicElementService } from '../../fakes/service/periodic-element.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.sass',
})
export class BasicComponent extends BaseComponent implements OnInit {
  public displayColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  public constructor(public periodicElementService: PeriodicElementService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  protected override createLink(): NavigationLink {
    return new NavigationLink(
      this.router.url,
      'tableau basique',
      true,
      'etat',
      'icon'
    );
  }
}
