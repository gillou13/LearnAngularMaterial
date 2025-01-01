import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  Inject,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import { map, Subscription, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-input-number',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputNumberComponent),
            multi: true,
        },
    ],
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './input-number.component.html',
    styleUrl: './input-number.component.sass'
})
export class InputNumberComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  public control!: FormControl;
  public localControl: FormControl = new FormControl(undefined);
  public subscriptions = new Array<Subscription>();

  public onTouched: () => void = () => {};

  constructor(@Inject(Injector) private injector: Injector) {}

  ngOnInit(): void {
    this.setComponentControl();

    // PEC changement de status :
    this.control.statusChanges.subscribe((x) => {
      console.log('control.statusChanges', x);
      if (x === 'INVALID') {
        this.localControl.setErrors({ incorrect: true });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  writeValue(val: any): void {
    if (val || val === 0) {
      // console.log('writeValue');
      this.localControl.setValue(val, {
        emitEvent: false,
        emitModelToViewChange: false,
      });
    }
  }

  registerOnChange(fn: any): void {
    // Permet de pousser la valeur du localControl dans l'externalControl.
    this.localControl.valueChanges
      .pipe(
        map((val) => {
          return Number(val);
        })
      )
      .subscribe(fn);
    // this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.localControl.disable();
    } else {
      this.localControl.enable();
    }
  }

  private setComponentControl(): void {
    const injectedControl = this.injector.get(NgControl);

    switch (injectedControl.constructor) {
      // case NgModel: {
      //   const { control, update } = injectedControl as NgModel;

      //   this.control = control;

      //   this.control.valueChanges
      //     .pipe(
      //       tap((value: T) => update.emit(value)),
      //       takeUntil(this.destroy),
      //     )
      //     .subscribe();
      //   break;
      // }
      case FormControlName: {
        this.control = this.injector
          .get(FormGroupDirective)
          .getControl(injectedControl as FormControlName);
        break;
      }
      default: {
        this.control = (injectedControl as FormControlDirective)
          .form as FormControl;
        break;
      }
    }
  }
}
