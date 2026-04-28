import { ERole } from "../../enums/e-role";

export interface UserResponseDTO {
  id: number;
  photo: string | null; 
  nom: string;
  prenom: string;
  email: string;
  role: ERole;
  adresse: string;
  numTelephone: string;
  dateDeNaissance: Date;
}