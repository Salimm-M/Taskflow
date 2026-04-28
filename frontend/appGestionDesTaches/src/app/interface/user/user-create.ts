import { ERole } from "../../enums/e-role";

export interface UserCreateDTO {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  role: ERole;
  adresse: string;
  numTelephone: string;
  dateDeNaissance:string; 
}