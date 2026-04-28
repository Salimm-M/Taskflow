import { EPeriorite } from "../../enums/e-periorite";
import { EStatus } from "../../enums/e-status";

export interface TaskUpdateDTO {
  titre: string;
  description: string;
  status: EStatus;
  progress: number;
  periorite: EPeriorite;
  idDeveloppeur?: number | null;
  idProjet?: number | null;
}