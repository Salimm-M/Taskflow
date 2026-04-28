import { EPeriorite } from "../../enums/e-periorite";
import { EStatus } from "../../enums/e-status";

export interface TaskResponseDTO {
  id: number;
  titre: string;
  description: string;
  status?: EStatus;
  progress: number;
  periorite?: EPeriorite;
  idDeveloppeur?: number | null;
  idProjet: number ;
  idParentTask?:number|null;
  dateFin?: Date | null;
  dateCreation?: Date | null;
  dateModification?: Date | null;
}