import { EPeriorite } from "../enums/e-periorite";
import { EStatus } from "../enums/e-status";

export interface TaskValidation {
      id: number;
      titre: string;
      description: string;
      status?: EStatus;
      progress: number;
      periorite?: EPeriorite;
      idDeveloppeur?: number | null;
      idProjet: number ;
      
      dateFin?: Date | null;
      dateCreation?: Date | null;
      dateModification?: Date | null;
     emailDev?: string;
      photo?: string;
      prenomDeveloppeur?: string;
      nomDevloppeur?: string;
}
