import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-equipe',
  imports: [],
  templateUrl: './dialog-equipe.html',
  styleUrl: './dialog-equipe.css',
})



export class DialogEquipe {

  availableUsers: any[] = [];
 

  constructor(
    public dialogRef: MatDialogRef<DialogEquipe>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
selectedUsers: any[] = [];

ngOnInit() {
  const allUsers = this.data.users;
  const existingUsers = this.data.existingUsers || [];

  this.availableUsers = allUsers.filter((u: any) =>
    !existingUsers.some((e: any) => e.id === u.id)
  );
}

toggleUser(user: any) {
  const index = this.selectedUsers.findIndex(u => u.id === user.id);

  if (index === -1) {
    this.selectedUsers.push(user);
  } else {
    this.selectedUsers.splice(index, 1);
  }
}

isSelected(user: any): boolean {
  return this.selectedUsers.some(u => u.id === user.id);
}

save() {
  this.dialogRef.close({
    projectId: this.data.projectId,
    users: this.selectedUsers
  });
}
}
