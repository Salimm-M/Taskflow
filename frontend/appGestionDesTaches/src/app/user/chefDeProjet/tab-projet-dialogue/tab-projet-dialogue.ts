import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjetResponseDTO } from '../../../interface/Projet/projet-response-dto';
import { TaskService } from '../../../service/task-service';
import { TaskTreeNode } from '../../../interface/task/task-tree-node';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { EPeriorite } from '../../../enums/e-periorite';
import { E } from '@angular/cdk/keycodes';
import { EStatus } from '../../../enums/e-status';
import { UserService } from '../../../service/user-service';
import { UserResponseDTO } from '../../../interface/user/user-response';

@Component({
  selector: 'app-tab-projet-dialogue',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTreeModule
  ],
  templateUrl: './tab-projet-dialogue.html',
  styleUrls: ['./tab-projet-dialogue.css'],
})
export class TabProjetDialogue implements OnInit {


  dataSource = new MatTreeNestedDataSource<TaskTreeNode>();
  treeControl = new NestedTreeControl<TaskTreeNode>(node => node.children);
  childrenAccessor = (node: TaskTreeNode) => node.children ?? [];

  
  date1 = new Date();
  date2!: Date;
  diffTime!: number;
  diffDays!: number;

 
  isAddingTask = false;
  newTaskTitle = '';
  newTaskDescription = '';
  newTaskStatus = EStatus.AFaire;
  newTaskProgress = 0;
  newTaskPriority =  EPeriorite.Moyen;
  newTaskDeveloperId: number | null = null;

  
  addingSubtaskToNode: TaskTreeNode | null = null;
  newSubtaskTitle = '';
  newSubtaskDescription = '';
  newSubtaskStatus = EStatus.AFaire;
  newSubtaskProgress = 0;
  newSubtaskPriority = EPeriorite.Moyen;
  newSubtaskDeveloperId: number | null = null;

  constructor(
    private serviceTask: TaskService,private userService: UserService,
    public dialogRef: MatDialogRef<TabProjetDialogue>,
    @Inject(MAT_DIALOG_DATA) public data: ProjetResponseDTO
  ) {}

public devs:UserResponseDTO[] = [];
  ngOnInit(): void {
      this.userService.getDevByproject(this.data.id).subscribe(res => {
        this.devs = res;
        console.log('Devs for project:', this.data.id, this.devs);
      });
    this.refreshTree();

    this.date2 = new Date(this.data.dateFin);
    this.diffTime = this.date2.getTime() - this.date1.getTime();
    this.diffDays = Math.ceil(this.diffTime / (1000 * 60 * 60 * 24));
  }

  
refreshTree(): void {
  this.serviceTask.getTreeTasks(this.data.id).subscribe(res => {
    this.dataSource.data = res.map(node => ({
      ...node,
      children: node.children ?? []
    }));
    console.log('dataSource updated with:', this.dataSource.data);
  });
}

  hasChildren = (_: number, node: TaskTreeNode) =>
    node.estParent === true;

  
  showAddTask(): void {
    this.isAddingTask = true;
    this.resetTaskForm();
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;

    const dto = {
      titre: this.newTaskTitle,
      description: this.newTaskDescription || this.newTaskTitle,
      idParentTask: null,
      idDeveloppeur: this.newTaskDeveloperId,
      idProjet: this.data.id,
      progress: this.newTaskProgress,
      periorite: this.newTaskPriority
    };

    this.serviceTask.createTask(dto).subscribe({
      next: () => {
        this.refreshTree();
        this.cancelAddTask();
      },
      error: err => console.error(err)
    });
  }

  cancelAddTask(): void {
    this.isAddingTask = false;
    this.resetTaskForm();
  }

  private resetTaskForm() {
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.newTaskStatus = EStatus.AFaire;
    this.newTaskProgress = 0;
    this.newTaskPriority = EPeriorite.Moyen;
    this.newTaskDeveloperId = null;
  }

  
  showAddSubtask(node: TaskTreeNode): void {
    this.addingSubtaskToNode = node;
    this.resetSubtaskForm();
  }

  addSubtask(): void {
    if (!this.newSubtaskTitle.trim() || !this.addingSubtaskToNode) return;

    const dto = {
      titre: this.newSubtaskTitle,
      description: this.newSubtaskDescription || this.newSubtaskTitle,
      idParentTask: this.addingSubtaskToNode.id,
      idDeveloppeur: this.newSubtaskDeveloperId,
      idProjet: this.data.id,
      progress: this.newSubtaskProgress,
      periorite: this.newSubtaskPriority
      
    };

    this.serviceTask.createTask(dto).subscribe({
      next: () => {
        this.refreshTree();
        this.cancelAddSubtask();
      },
      error: err => console.error(err)
    });
  }

  cancelAddSubtask(): void {
    this.addingSubtaskToNode = null;
    this.resetSubtaskForm();
  }

  private resetSubtaskForm() {
    this.newSubtaskTitle = '';
    this.newSubtaskDescription = '';
    this.newSubtaskStatus =   EStatus.AFaire;
    this.newSubtaskProgress = 0;
    this.newSubtaskPriority = EPeriorite.Moyen;
    this.newSubtaskDeveloperId = null;
  }

  
  deleteTask(taskId: number): void {
    if (!confirm('Supprimer cette tâche ?')) return;

    this.serviceTask.deleteTask(taskId).subscribe({
      next: () => this.refreshTree(),
      error: err => console.error(err)
    });
  }

  
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}