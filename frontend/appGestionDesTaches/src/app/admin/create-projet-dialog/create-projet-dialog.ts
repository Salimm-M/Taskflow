import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import { ProjetCreateDTO } from '../../interface/Projet/projet-create-dto';
import { UserService } from '../../service/user-service';
import { UserResponseDTO } from '../../interface/user/user-response';
import { ERole } from '../../enums/e-role';

@Component({
  selector: 'app-create-projet-dialog',
  standalone: true,
  templateUrl: './create-projet-dialog.html',
  styleUrls: ['./create-projet-dialog.css'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule
  ]
})
export class CreateProjetDialog implements OnInit {

  data: ProjetCreateDTO = {
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    chefDeProjetId: 0
  };

  chefsDeProjet: UserResponseDTO[] = [];

  constructor(
    private dialogRef: MatDialogRef<CreateProjetDialog>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadChefs();
  }

  loadChefs(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.chefsDeProjet = users.filter(
        u => u.role === ERole.CHEF_DE_PROJET
      );
      console.log(this.chefsDeProjet)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}