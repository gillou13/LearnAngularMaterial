import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  Input,
  Renderer2,
} from '@angular/core';
import { TestService } from '../services/testService/test.service';
/**
 * Directive permettant d'ajouter (ou non) l'attribut pour les tests à une balise.
 */
@Directive({
  selector: '[appTestId]',
  standalone: true,
})
export class TestIdDirective implements AfterViewInit {
  @Input('appTestId') testId: string = '';

  private readonly testService = inject(TestService);

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.testService.attributVisible) {
      this.renderer.setAttribute(
        this.el.nativeElement,
        this.testService.attributName,
        this.testId
      );
    }
  }
}
