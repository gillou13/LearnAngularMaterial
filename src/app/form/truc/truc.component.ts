import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControlStatus,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import { FormFrameComponent } from '../../common/component/form-frame/form-frame.component';
import { FrameModel } from '../../common/component/form-frame/model/frame-model';
import {
  delay,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { TrucApiService } from './truc-api.service';
import { TrucModel } from './model/truc-model';
import { FrameButtonModel } from '../../common/component/form-frame/model/frame-button-model';
import { BaseFormComponent } from '../../common/component/base-form/base-form.component';
import { FrameActionButtonModel } from '../../common/component/form-frame/model/frame-action-button-model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Guid } from '../../tools/guid';
import { CommonModule } from '@angular/common';
import { FormStatus } from '../../common/component/base-form/models/form-status';

@Component({
    selector: 'app-truc',
    templateUrl: './truc.component.html',
    styleUrl: './truc.component.scss',
    imports: [
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatCardModule,
        ReactiveFormsModule,
        FormFrameComponent,
        MatProgressSpinnerModule,
        CommonModule,
    ]
})
export class TrucComponent
  extends BaseFormComponent<FormGroup>
  implements OnInit
{
  // Services
  /** ApiService */
  private apiService: TrucApiService = inject(TrucApiService);

  /** FormBuilder */
  private fb = inject(FormBuilder);

  /** signal pour le changement du formData. */
  public formDataChange: WritableSignal<FormControlStatus> = signal('VALID');

  /** signal pour la disponibilité de l'impression. */
  public printIsAvailable: Signal<boolean> = computed(() => {
    return this.formDataChange() === 'VALID';
  });

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();

    /** set du signal de changement de formData (toSignal pas encore dispo en prod...) */
    this.subscriptions.push(
      this.formData.statusChanges.subscribe((status: FormControlStatus) => {
        this.formDataChange.set(status);
      })
    );

    // set du save du currentLink
    this.currentLink.saveAction = this.apiService.save;

    // Init du cadre :
    this.initFrame();
  }

  protected override createLink(url: string): NavigationLink {
    const link = new NavigationLink(url, 'truc', true, 'etat', 'icon');
    return link;
  }

  /** Formulaire */
  public override formData!: FormGroup;

  /** Paramètres du cadre du formulaire (avec les boutons d'action.) */
  public frameModel!: FrameModel;

  hasUnitNumber = false;

  states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District Of Columbia', abbreviation: 'DC' },
    { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Guam', abbreviation: 'GU' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Marshall Islands', abbreviation: 'MH' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Northern Mariana Islands', abbreviation: 'MP' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Palau', abbreviation: 'PW' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Puerto Rico', abbreviation: 'PR' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virgin Islands', abbreviation: 'VI' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' },
  ];

  protected override InitStatus(): Observable<boolean> {
    return of(void 0).pipe(
      switchMap(() => {
        // Récupération des informations de route :
        const routeSnapshot = this.activatedRoute.snapshot;
        this.formStatus = new FormStatus();
        this.formStatus.mode = routeSnapshot.url[0].path;
        this.formStatus.urlParams.set('id', routeSnapshot.params['id']);
        this.formStatus.urlParams.set(
          'copyTo',
          routeSnapshot.queryParams['copyTo'] ?? ''
        );
        return of(true);
      })
    );
  }
  /**
   * Initialise le formulaire selon les params d'entrée
   * TODO GBE : oui c'est a finaliser je sais...
   * @returns Le FromGroup du composant.
   */
  protected override buildFormData(): Observable<FormGroup> {
    // const form = this.fb.group({
    //   company: null,
    //   firstName: [null, Validators.required],
    //   lastName: [null, Validators.required],
    //   address: [null, Validators.required],
    //   address2: null,
    //   city: [null, Validators.required],
    //   state: [null, Validators.required],
    //   postalCode: [
    //     null,
    //     Validators.compose([
    //       Validators.required,
    //       Validators.minLength(5),
    //       Validators.maxLength(5),
    //     ]),
    //   ],
    //   shipping: ['free', Validators.required],
    // });
    // la flém de tous saisir a chaque fois...
    return of(void 0).pipe(
      switchMap(() => {
        const form = this.fb.group({
          id: [this.formStatus.urlParams.get('id'), Validators.required],
          company: 'Gillou&Co',
          firstName: ['Gilles', Validators.required],
          lastName: ['Biguet', Validators.required],
          address: [
            `par ici. mode: ${
              this.formStatus.mode
            }, id: ${this.formStatus.urlParams.get(
              'id'
            )}, copyTo: ${this.formStatus.urlParams.get('copyTo')}`,
            Validators.required,
          ],
          address2: null,
          city: ['Thizy', Validators.required],
          state: ['Proxima du sentor', Validators.required],
          postalCode: [
            '69240',
            Validators.compose([
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(5),
            ]),
          ],
          shipping: ['free', Validators.required],
        });
        return of(form);
      }),
      delay(2000)
    );
  }

  /** Initialisation du cadre du formulaire. */
  private initFrame(): void {
    this.frameModel = new FrameModel();
    this.frameModel.title = 'Truc';
    this.frameModel.name = this.formData.get('company')?.value ?? '';
    // Pour changer le nom en direct.
    this.subscriptions.push(
      this.formData.controls['company'].valueChanges.subscribe(
        (value: string) => {
          this.frameModel.name = value;
        }
      )
    );

    // liaison des actions save/close.
    this.frameModel.saveButton = new FrameButtonModel();
    this.subscriptions.push(
      this.frameModel.saveButton.setAction(this.save.bind(this))
    );

    this.frameModel.closeButton = new FrameButtonModel();
    this.subscriptions.push(
      this.frameModel.closeButton.setAction(this.close.bind(this))
    );

    this.frameModel.saveCloseButton = new FrameButtonModel();
    this.subscriptions.push(
      this.frameModel.saveCloseButton.setAction(this.saveClose.bind(this))
    );

    // Implémentation des actions complémentaires :
    let button = new FrameActionButtonModel();
    button.label = 'dupliquer';
    button.icon = 'content_copy';
    button.order = 1;
    button.isAvailable = computed(() => {
      // on utilise formDataChange juste pour lancer le calcul.
      this.formDataChange();
      return (
        this.formData.valid &&
        this.formData.pristine &&
        this.formStatus.mode !== 'new'
      );
    });
    button.setAction(this.copy.bind(this));
    this.frameModel.actions.set(button.label, button);

    button = new FrameActionButtonModel();
    button.label = 'imprimer';
    button.icon = 'print';
    button.order = 2;
    // button.isAvailable = signal(false);
    button.isAvailable = this.printIsAvailable;
    this.subscriptions.push(button.setAction(this.print.bind(this)));
    this.frameModel.actions.set(button.label, button);

    button = new FrameActionButtonModel();
    button.label = 'refresh';
    button.icon = 'refresh';
    button.order = 0;
    button.isAvailable = computed(() => {
      const result =
        this.formDataChange() === 'VALID' &&
        this.formData.get('shipping')?.value === 'free';
      return result;
    });
    this.subscriptions.push(button.setAction(this.reload.bind(this)));
    this.frameModel.actions.set(button.label, button);
  }

  /** function pour l'enregistrement du formulaire.
   * Si apiService.save == true, on réinit le formulaire.
   */
  public override save(): Observable<boolean> {
    return this.apiService.save(this.formData.value as TrucModel).pipe(
      // Si l'enregistrement est OK. on réinit le formulaire.
      switchMap((resultSave: boolean) => {
        if (resultSave) {
          return this.buildFormData().pipe(
            switchMap((formData: FormGroup) => this.setFormData(formData))
          );
        }
        return of(false);
      })
    );
  }

  /** Impression du truc */
  public print(): Observable<boolean> {
    return of(true).pipe(tap(() => console.log('impression de truc')));
  }

  /**
   * Création d'une copy de l'élément actuel
   */
  public copy(): Observable<boolean> {
    return of(true).pipe(
      tap(() => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(
              ['form', 'truc', 'new', Guid.newGuid().toUpperCase()],
              {
                queryParams: { copyTo: this.formData.get('id')!.value },
              }
            );
          });
      })
    );
  }
}
