import { ERole } from "../../enums/e-role";

export interface UserUpdateByAdminDTO {
  photo?: string | null; // Base64 string ou null
  nom?: string;
  prenom?: string;
  email?: string;
  role?: ERole;

  adresse?: string;
  numTelephone?: string;
  dateDeNaissance?: string; // Format ISO: 'YYYY-MM-DD'
}
