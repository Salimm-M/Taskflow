import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { TaskService } from '../../../service/task-service';

import { MatIcon } from "@angular/material/icon";
import { TaskTreeNode } from '../../../interface/task/task-tree-node';

import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-liste-tache',
  standalone: true,
  imports: [MatTreeModule, MatIcon, CommonModule,FormsModule],
  templateUrl: './liste-tache.html',
  styleUrl: './liste-tache.css',
})
export class ListeTache {


  constructor(private taskService: TaskService) {}

 treeControl = new NestedTreeControl<TaskTreeNode>(
  node => node.children
);

dataSource = new MatTreeNestedDataSource<TaskTreeNode>();

childrenAccessor = (node: TaskTreeNode) => node.children ?? [];

ngOnInit(): void {
  this.taskService.getTreeTasks(1).subscribe(res => {
    this.dataSource.data = res;
  });
}

hasChild = (_: number, node: TaskTreeNode) =>
  node.estParent==true;
}