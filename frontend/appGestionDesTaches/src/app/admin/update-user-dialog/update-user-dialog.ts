import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { UserUpdateByAdminDTO } from '../../interface/user/user-update-byadmin';
import { ERole } from '../../enums/e-role';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.html',
  styleUrls: ['./update-user-dialog.css'],
  imports: [ MatSelectModule,MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  standalone: true
})
export class UpdateUserDialog {
  roles = Object.values(ERole);
  constructor(
    public dialogRef: MatDialogRef<UpdateUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: UserUpdateByAdminDTO
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}