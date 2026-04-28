import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { UserResponseDTO } from '../../interface/user/user-response';
import { UserService } from '../../service/user-service';

@Component({
  selector: 'app-team',
  imports: [NgClass],
  templateUrl: './team.html',
  styleUrl: './team.css',
})
export class Team implements OnInit {
  public constructor(private userService:UserService){}
  users:UserResponseDTO[]=[]
colors:string[]=["avatar-green","avatar-purple","avatar-cyan","avatar-blue","avatar-orange"]
getColor(): string {
  var index = Math.floor(Math.random() * this.colors.length);
  return this.colors[index];
}
ngOnInit(): void {
  this.userService.getAllUsers().subscribe(data=>{this.users=data;console.log(data)})

}


}
