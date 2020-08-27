import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {

  constructor(
    public snackBar: MatSnackBar,
  ) { }

  public open(message: string, action: string | null, duration: number, panelClass: string | string[]) {
    const config: MatSnackBarConfig = {
      panelClass,
      duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    };
    this.snackBar.open(message, action, config);
  }
}
