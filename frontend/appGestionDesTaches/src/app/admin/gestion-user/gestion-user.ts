import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {  NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../service/user-service';
import { UserResponseDTO } from '../../interface/user/user-response';
import { UpdateUserDialog } from '../update-user-dialog/update-user-dialog';
import { CreateUserDialog } from '../create-user-dialog/create-user-dialog';

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.html',
  styleUrls: ['./gestion-user.css'],
  imports: [
    NgClass,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  standalone: true
})
export class GestionUser implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ["nom", "prenom", "email", "role", "adresse", "numTelephone", "dateDeNaissance", "actions"];
  dataSource!: MatTableDataSource<UserResponseDTO>;

  colors: string[] = ["avatar-green", "avatar-purple", "avatar-cyan", "avatar-blue", "avatar-orange"];
  userColors: Map<number, string> = new Map();

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(data => {
      data.forEach((user, index) => {
        this.userColors.set(user.id, this.colors[index % this.colors.length]);
      });
      this.dataSource = new MatTableDataSource<UserResponseDTO>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filter: HTMLInputElement) {
    const filterValue = filter.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getColor(userId: number): string {
    return this.userColors.get(userId) || 'avatar-blue';
  }

  openUpdateDialog(user: UserResponseDTO): void {
    const dialogRef = this.dialog.open(UpdateUserDialog, { width: '550px', data: { ...user } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result.id, result).subscribe(() => this.loadUsers());
      }
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur?')) {
      this.userService.deleteUser(userId).subscribe(() => this.loadUsers());
    }
  }

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialog, { width: '550px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.createUser(result).subscribe(() => this.loadUsers());
      }
    });
  }
}
