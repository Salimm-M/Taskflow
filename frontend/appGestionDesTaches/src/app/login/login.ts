import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user-service';
import { Connexion } from '../interface/connexion';
import { AuthService } from '../service/auth-service';
import { Router } from '@angular/router';
import { ERole } from '../enums/e-role';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
u!:Connexion
  errorMessage: string = '';
  visible:boolean=false
  monform:FormGroup=new FormGroup({
    email:new FormControl("",[Validators.required,Validators.pattern("^[A-Za-z0-9_@.]{4,}$")]),
    password:new FormControl("",[Validators.required])
  })
  constructor(private authService:AuthService,private userService:UserService,private auth:AuthService,private router:Router){}
  afficher(){
    this.visible=!this.visible
  }
onSubmit() {
  if (this.monform.invalid) return;

  const { email, password } = this.monform.value;
const connexion: Connexion = {
  email: email,
  motDePasse: password
};
console.log(connexion)
  this.authService.connexionSession(connexion).subscribe({
    next: (isOk) => {
      if (isOk) {
        this.userService.getByEmail(email).subscribe(user => {
          this.auth.login(user);
          console.log(user)
          if(user.role===ERole.admin){ this.router.navigate(['/admin/dashbord'])} 
          else {
            if(user.role===ERole.CHEF_DE_PROJET){
            this.router.navigate(['/chef/dashbord'])}else{
             this.router.navigate(['/dev/dashbord'])
            }
           }
        });
      } else {
        this.errorMessage="Email ou mot de passe incorrect"
        console.log('Email ou mot de passe incorrect');
      }
    },
    error: err => {
      console.error('Erreur serveur', err);
    }
  });
}



}
