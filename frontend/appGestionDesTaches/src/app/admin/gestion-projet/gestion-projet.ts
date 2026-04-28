import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { ProjetService } from '../../service/projet-service';
import { UserService } from '../../service/user-service';
import { ProjetResponseDTO } from '../../interface/Projet/projet-response-dto';
import { CreateProjetDialog } from '../create-projet-dialog/create-projet-dialog';
import { UpdateProjetDialog } from '../update-projet-dialog/update-projet-dialog';

@Component({
  selector: 'app-gestion-projet',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './gestion-projet.html',
  styleUrl: './gestion-projet.css'
})
export class GestionProjet implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = [
    'titre',
    'description',
    'progres',
    'dateDebut',
    'dateFin',
    'chefDeProjet',
    'actions'
  ];

  dataSource!: MatTableDataSource<ProjetResponseDTO>;
  noms = new Map<number, string>();

  constructor(
    private projetService: ProjetService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadChefs();
    this.loadProjets();
  }

  loadChefs(): void {
    this.userService.getAllUsers().subscribe(users => {
      users.forEach(u =>
        this.noms.set(u.id, `${u.nom} ${u.prenom}`)
      );
    });
  }

  loadProjets(): void {
    this.projetService.getAllProjets().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(input: HTMLInputElement) {
    this.dataSource.filter = input.value.trim().toLowerCase();
  }

  openCreateDialog(): void {
    const ref = this.dialog.open(CreateProjetDialog, { width: '550px' });
    ref.afterClosed().subscribe(res => {
      if (res) this.projetService.createProjet(res).subscribe(() => this.loadProjets());
    });
  }

  openUpdateDialog(p: ProjetResponseDTO): void {
    const ref = this.dialog.open(UpdateProjetDialog, {
      width: '550px',
      data: { ...p }
    });
    ref.afterClosed().subscribe(res => {
      console.log(res)
      if (res) this.projetService.updateProjet(p.id, res).subscribe(() => this.loadProjets());
    });
  }

  deleteProjet(id: number): void {
    if (confirm('Supprimer ce projet ?')) {
      this.projetService.deleteProjet(id).subscribe(() => this.loadProjets());
    }
  }
}
