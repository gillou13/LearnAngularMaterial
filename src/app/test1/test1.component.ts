import { Component, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BaseComponent } from '../common/component/basecomponent/base.component';
import { NavigationService } from '../common/services/navigation/navigation.service';
import { Router } from '@angular/router';
import { NavigationLink } from '../common/services/navigation/navigation-link';

@Component({
  selector: 'app-test1',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './test1.component.html',
  styleUrl: './test1.component.sass',
})
export class Test1Component extends BaseComponent implements OnInit {
  public constructor(router: Router, navigationService: NavigationService) {
    super(router, navigationService);
  }

  ngOnInit(): void {
    this.currentLink = new NavigationLink(
      this.router.url,
      'test1',
      true,
      'etat',
      'icon'
    );
    this.navigationService.addLink(this.currentLink);
  }

  public toggleOnChange(event: any): void {
    this.currentLink!.label = `test 1 ${event.checked ? ' vivant' : ' mort'}`;
    this.navigationService.updateLink(this.currentLink!);
  }
}
