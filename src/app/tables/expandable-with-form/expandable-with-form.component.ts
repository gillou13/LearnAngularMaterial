import { Component, OnInit, ViewChild } from '@angular/core';
import { BasePageComponent } from '../../common/component/base-page/base-page.component';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { PersonnesService } from '../../fakes/service/personnes.service';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { Personne } from '../../fakes/service/personne';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-expandable-with-form',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    templateUrl: './expandable-with-form.component.html',
    styleUrl: './expandable-with-form.component.sass',
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ]
})
export class ExpandableWithFormComponent
  extends BasePageComponent
  implements OnInit
{
  @ViewChild(MatTable) table!: MatTable<any>;

  /**
   * Formulaire parent
   */
  public form: FormGroup;

  /**
   * Source du tableau. (formArray)
   */
  public tableDataSource: MatTableDataSource<AbstractControl>;

  /**
   * Pour la forme ^^
   */
  public originalData?: Personne[];

  public displayColumns: string[] = [
    'id',
    'nom',
    'prenom',
    'age',
    'autre',
    'expand',
  ];

  /**
   * Constructeur standard.
   * @param router
   * @param navigationService
   * @param personneService
   */
  constructor(
    protected personneService: PersonnesService,
    private formBuilder: FormBuilder
  ) {
    super();

    this.form = this.formBuilder.group({
      array: this.formBuilder.array([]),
    });

    this.tableDataSource = new MatTableDataSource(
      (this.form.get('array') as FormArray).controls
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();

    // Récupération des données :
    this.subscriptions.push(
      this.personneService
        .getAllPersonnes()
        .subscribe((personnes: Personne[]) => {
          this.originalData = personnes;
          const formArray = this.form.get('array') as FormArray;
          // this.form.get('array')
          personnes.forEach((personne) => {
            // Génération du formGroup correspondant à la personne :
            formArray.push(this.createFromGroupPersonne(personne));
          });
        })
    );
  }

  protected override createLink(url: string): NavigationLink {
    return new NavigationLink(url, 'tab exp form', true, 'etat', 'icon');
  }

  private createFromGroupPersonne(personne: Personne): FormGroup {
    const fg = this.formBuilder.group({ ...personne, expand: false });
    return fg;
  }

  public toogleExpand(element: FormGroup): void {
    element.get('expand')?.setValue(!element.get('expand')?.value);
  }
}
