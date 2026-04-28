import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, NgForm } from '@angular/forms';
import { UserCreateDTO } from '../../interface/user/user-create';
import { ERole } from '../../enums/e-role';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.html',
  styleUrls: ['./create-user-dialog.css'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule
  ],
  standalone: true
})
export class CreateUserDialog {

  data: UserCreateDTO = {
    nom: '',
    prenom: '',
    email: '',
    role: ERole.DEVLOPPEUR,
    numTelephone: '',
    adresse: '',
    dateDeNaissance: '',
    motDePasse: ''
  };

  roles = Object.values(ERole);
  submitted = false;

  constructor(public dialogRef: MatDialogRef<CreateUserDialog>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(form: NgForm): void {
    this.submitted = true;

    if (form.invalid || !this.isAdult(this.data.dateDeNaissance)) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.dialogRef.close(this.data);
  }

  isAdult(date: string): boolean {
    if (!date) return false;

    const birthDate = new Date(date);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18;
  }
}