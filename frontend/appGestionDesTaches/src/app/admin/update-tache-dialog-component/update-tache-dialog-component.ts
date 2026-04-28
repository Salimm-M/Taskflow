import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TaskUpdateDTO } from '../../interface/task/task-updtate';

@Component({
  selector: 'app-update-task-dialog',
   templateUrl: './update-tache-dialog-component.html',
  styleUrl: './update-tache-dialog-component.css',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule],
  standalone: true
})
export class UpdateTacheDialogComponent {
constructor(
    public dialogRef: MatDialogRef<UpdateTacheDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskUpdateDTO
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    
    this.dialogRef.close(this.data);
  }
}
