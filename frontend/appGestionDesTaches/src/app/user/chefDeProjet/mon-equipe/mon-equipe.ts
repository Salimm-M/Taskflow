import { Component, OnInit } from '@angular/core';
import { UserResponseDTO } from '../../../interface/user/user-response';
import { UserService } from '../../../service/user-service';
import { NgClass } from '@angular/common';
import { ProjetService } from '../../../service/projet-service';
import { ProjetResponseDTO } from '../../../interface/Projet/projet-response-dto';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Projet } from '../projet/projet';
import { DialogEquipe } from '../dialog-equipe/dialog-equipe';
import { ERole } from '../../../enums/e-role';

@Component({
  selector: 'app-mon-equipe',
  imports: [NgClass,MatDialogModule],
  templateUrl: './mon-equipe.html',
  styleUrl: './mon-equipe.css',
})
export class MonEquipe implements OnInit{
  
  projets:ProjetResponseDTO[]=[];
  private selectedProjectId!: number;
  private allUsers:UserResponseDTO[]=[];
  user!:UserResponseDTO;
       loadTasksFromLocalStorage() {
        const data = localStorage.getItem('currentUser');
        
        if (data) {
          this.user = JSON.parse(data);
        }}
   
      public constructor(private userService:UserService,private service:ProjetService,private diag:MatDialog){}
  
      users:UserResponseDTO[]=[]
    colors:string[]=["avatar-green","avatar-purple","avatar-cyan","avatar-blue","avatar-orange"]
    getColor(): string {
      var index = Math.floor(Math.random() * this.colors.length);
      return this.colors[index];
    }
    ngOnInit(): void {
      this.loadTasksFromLocalStorage();
      this.service.getProjetByChef(this.user.id).subscribe(data=>{this.projets=data;
        this.selectedProjectId = data[0].id;
        console.log(data)})
     this.userService.getAllUsers().subscribe
     (data=>{
      this.allUsers=data.filter
      (u => u.role==ERole.DEVLOPPEUR);console.log(data)})
      this.onAdd(this.selectedProjectId);
  
    }
    onProjectChange(event: any) {
  this.selectedProjectId = event.target.value;

  
  this.service.getEquipeById(this.selectedProjectId).subscribe({
    next: (res) => this.users = res,
    error: (err) => console.error(err)
  });
}
 onAdd(id: number) {
  

  
  this.service.getEquipeById(id).subscribe({
    next: (res) => this.users = res,
    error: (err) => console.error(err)
  });
}
openCreateDialog(): void {
    const ref = this.diag.open(DialogEquipe, { width: '550px',
      data: { ProjeId: this.selectedProjectId, users: this.allUsers, existingUsers: this.users }
    });
   ref.afterClosed().subscribe(res => {
  if (res) {
    res.users.forEach((u: any) => {
      this.service.addUserToProject(this.selectedProjectId, u.id)
        .subscribe(
          () => {
            this.onAdd(this.selectedProjectId);
          }
        );
    });
  }
});
  }


}
