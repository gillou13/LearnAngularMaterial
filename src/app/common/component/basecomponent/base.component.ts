import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';
import { NavigationLink } from '../../services/navigation/navigation-link';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.sass',
})
export abstract class BaseComponent {
  protected currentLink: NavigationLink | undefined;

  constructor(
    protected router: Router,
    protected navigationService: NavigationService
  ) {}
}
