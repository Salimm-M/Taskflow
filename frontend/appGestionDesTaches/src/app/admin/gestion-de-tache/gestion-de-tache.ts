import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TaskService } from '../../service/task-service';
import { TaskResponseDTO } from '../../interface/task/task-response-dto';
import { TaskCreateDTO } from '../../interface/task/task-create-dto';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UpdateTacheDialogComponent } from '../update-tache-dialog-component/update-tache-dialog-component';
import { CreateTaskDialogComponent } from '../create-task-dialog-component/create-task-dialog-component';

@Component({
  selector: 'app-gestion-task',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './gestion-de-tache.html',
  styleUrls: ['./gestion-de-tache.css']
})
export class GestionDeTache implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ["titre","description","status","progress","periorite","actions"];

  dataSource!: MatTableDataSource<TaskResponseDTO>;

  colors: string[] = ["avatar-green", "avatar-purple", "avatar-cyan", "avatar-blue", "avatar-orange"];
  taskColors: Map<number, string> = new Map();

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTasks();
  }


  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(data => {
      data.forEach((task, index) => {
        this.taskColors.set(task.id, this.colors[index % this.colors.length]);
      });
      this.dataSource = new MatTableDataSource<TaskResponseDTO>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

 
  applyFilter(filter: HTMLInputElement) {
    const filterValue = filter.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ------------------------------------------
  // Avatar color
  // ------------------------------------------
  getColor(taskId: number): string {
    return this.taskColors.get(taskId) || 'avatar-blue';
  }

 
  openUpdateDialog(task: TaskResponseDTO): void {
    const dialogRef = this.dialog.open(UpdateTacheDialogComponent, {
      width: '550px',
      data: { ...task }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("testtttt"+result)
      if (result) {
        this.taskService.updateTask(result.id, result).subscribe(() => {
          this.loadTasks();
        });
      }
    });
  }


  deleteTask(taskId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe((result: TaskCreateDTO | undefined) => {
      if (result) {
        this.taskService.createTask(result).subscribe(() => {
          this.loadTasks(); 
        });
      }
    });
  }
}
