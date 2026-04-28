import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ProjetUpdateDTO } from '../../interface/Projet/projet-update-dto';
import { UserService } from '../../service/user-service';
import { UserResponseDTO } from '../../interface/user/user-response';

@Component({
  selector: 'app-update-projet-dialog',
  standalone: true,
  templateUrl: './update-projet-dialog.html',
  styleUrls: ['./update-projet-dialog.css'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule
  ]
})
export class UpdateProjetDialog implements OnInit {

  chefsDeProjet: UserResponseDTO[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateProjetDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ProjetUpdateDTO,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.chefsDeProjet = users.filter(u => u.role === 'chefDeProjet');
      console.log("test:", this.chefsDeProjet);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}
