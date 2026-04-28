export interface ProjetCreateDTO {
  titre: string;
  description: string;
  dateDebut: string; // LocalDate -> string (yyyy-MM-dd)
  dateFin: string;
  chefDeProjetId: number;
}
