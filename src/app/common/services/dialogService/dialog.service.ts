import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogBasicComponent } from './dialog-basic/dialog-basic.component';
//import { DialogRef } from '@angular/cdk/dialog';

// RAF :
// - yesNo OK
// - yesNoCancel
// - Ok (avec template html)

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private matDialog: MatDialog) {}

  public dialogYesNo(
    title?: string,
    text?: string,
    yesText: string = 'Oui',
    noText: string = 'Non'
  ): Observable<boolean> {
    const dialogRef = this.matDialog.open(DialogBasicComponent, {
      data: { title, text, yesText, noText },
      disableClose: true,
    });

    return dialogRef.afterClosed();
  }

  public dialogYesNoCancel(
    title?: string,
    text?: string,
    yesText?: string,
    noText?: string,
    cancelText?: string
  ): Observable<boolean | undefined> {
    const dialogRef = this.matDialog.open(DialogBasicComponent, {
      data: { title, text, yesText, noText, cancelText },
    });

    return dialogRef.afterClosed();
  }
}
