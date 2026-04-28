import { Component, OnInit } from '@angular/core';
import { UserResponseDTO } from '../interface/user/user-response';
import { UserUpdateDTO } from '../interface/user/user-update';
import { UserService } from '../service/user-service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ChangePassword } from '../interface/user/change-password';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.html',
  styleUrl: './parametre.css',
  imports: [FormsModule, NgIf],
})
export class Parametre implements OnInit {
  user!: UserResponseDTO;
  userUpdate!: UserUpdateDTO;
  passwordChange!: ChangePassword;
  selectedFile!: File;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUser();
    this.initUserUpdate();
  }

  loadUser(): void {
    const user = localStorage.getItem('currentUser');
    if (user) this.user = JSON.parse(user);
  }

  get photoUrl(): string | null {
    if (!this.user?.photo) return null;
    return this.user.photo.startsWith('data:')
      ? this.user.photo
      : 'data:image/*;base64,' + this.user.photo;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    
    const reader = new FileReader();
    reader.onload = () => {
      this.user.photo = reader.result as string;
      this.selectedFile = file;
      localStorage.setItem('currentUser', JSON.stringify(this.user));
    };
    reader.readAsDataURL(file);
  }

  initUserUpdate(): void {
    this.userUpdate = {
      email: this.user.email,
      nom: this.user.nom,
      prenom: this.user.prenom,
      adresse: this.user.adresse,
      numTelephone: this.user.numTelephone,
    };
    this.passwordChange = { mtpCourante: '', mtpNew: '' };
  }

  updateUser(): void {
    this.userService.updateUser1(this.user.id, this.userUpdate).subscribe(() => {
      localStorage.setItem('currentUser', JSON.stringify({ ...this.user, ...this.userUpdate }));
      if (this.selectedFile) {
         this.userService.uploadPhoto(this.user.id, this.selectedFile).subscribe(() => {
          this.loadUser();
          alert('Profile updated successfully!');
        });
      } else {
        alert('Profile updated successfully!');
      }
    });
  }

  changePassword(): void {
    this.userService.changePassword(this.user.id, this.passwordChange).subscribe(success => {
      alert(success ? 'mot de passe changé avec succès !' : 'Le mot de passe actuel est incorrect.');
    });
  }
}