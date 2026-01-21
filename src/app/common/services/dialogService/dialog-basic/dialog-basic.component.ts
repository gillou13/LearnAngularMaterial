
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-basic',
    imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
],
    templateUrl: './dialog-basic.component.html',
    styleUrl: './dialog-basic.component.sass'
})
export class DialogBasicComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogBasicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // public onYesClick() {
  //   this.dialogRef.close(true);
  // }

  // public onNoClick() {
  //   this.dialogRef.close(false);
  // }

  public onCancelClick() {
    this.dialogRef.close(undefined);
  }
}
