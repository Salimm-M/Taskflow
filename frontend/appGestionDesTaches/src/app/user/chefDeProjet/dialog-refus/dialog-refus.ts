import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-refus',
  imports: [FormsModule],
  templateUrl: './dialog-refus.html',
  styleUrl: './dialog-refus.css',
})
export class DialogRefus {
  reason: string = '';

  constructor(
    private dialogRef: MatDialogRef<DialogRefus>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel() {
    this.dialogRef.close(null);
  }

  onConfirm() {
    this.dialogRef.close(this.reason);
  }

}
