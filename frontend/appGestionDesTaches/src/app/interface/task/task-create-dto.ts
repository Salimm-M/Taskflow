import { EPeriorite } from "../../enums/e-periorite";

export interface TaskCreateDTO {
  titre: string;
  description: string;
  idParentTask?: number | null;  
  idDeveloppeur?: number | null;
  idProjet?: number | null;
  progress: number;
  periorite: EPeriorite;
}