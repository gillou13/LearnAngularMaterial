import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../common/component/basecomponent/base.component';
import { NavigationLink } from '../../common/services/navigation/navigation-link';

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.sass',
})
export class BasicComponent extends BaseComponent implements OnInit {
  ngOnInit(): void {
    // TODO GBE : ajouter une fonction pour init par défaut le lien.
    this.currentLink = new NavigationLink(
      this.router.url,
      'tableau basique',
      true,
      'etat',
      'icon'
    );
    this.navigationService.addLink(this.currentLink);
  }
}
