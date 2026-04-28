import { EStatus } from "../../enums/e-status";

export interface TaskTreeNode {
  id: number;
  name: string;
  status: EStatus;
  progress: number;
  children: TaskTreeNode[];
  mere: number | null;
  estParent: boolean;
}
