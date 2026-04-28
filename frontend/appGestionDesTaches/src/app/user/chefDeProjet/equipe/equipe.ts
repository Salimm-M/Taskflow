import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user-service';
import { UserResponseDTO } from '../../../interface/user/user-response';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-equipe',
  imports: [NgClass],
  templateUrl: './equipe.html',
  styleUrl: './equipe.css',
})
export class Equipe implements OnInit{
   user!:UserResponseDTO;
     loadTasksFromLocalStorage() {
      const data = localStorage.getItem('currentUser');
      
      if (data) {
        this.user = JSON.parse(data);
      }}
 
    public constructor(private userService:UserService){}

    users:UserResponseDTO[]=[]
  colors:string[]=["avatar-green","avatar-purple","avatar-cyan","avatar-blue","avatar-orange"]
  getColor(): string {
    var index = Math.floor(Math.random() * this.colors.length);
    return this.colors[index];
  }
  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
   
    this.userService.getByChef(this.user.id).subscribe(data=>{this.users=data;console.log(data)})
  console.log(this.users);

  }

}
