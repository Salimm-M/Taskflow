import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task-service';
import { TaskResponseDTO } from '../interface/task/task-response-dto';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTree, MatTreeModule } from '@angular/material/tree';
import { MatIcon } from "@angular/material/icon";
import { NgIf } from '@angular/common';
interface TaskTreeNode {
  id:number;
  name: string;
  status?: string;
  children?: TaskTreeNode[];
  isParent?:boolean
}
@Component({
  selector: 'app-test',
  imports: [MatTreeModule, MatIcon,NgIf],
  templateUrl: './test.html',
  styleUrl: './test.css',
})

export class test implements OnInit {
    treeControl = new NestedTreeControl<TaskTreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TaskTreeNode>();
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTaskParent(2).subscribe(task=>{
     this.dataSource.data=task.map(parent=>({
      id:parent.id,
      name:parent.titre,
      isParent:true,
      status:parent.status,
      children:[]

     }))
     
    })
  }
 
  onToggle(node:TaskTreeNode){
     if (node.children?.length === 0) {
      
    this.taskService.getChildByParent(node.id).subscribe(fils=>{
      node.children=fils.map(child=>({
           id:child.id,
      name:child.titre,
      status:child.status,
      isParent:false

      }))
      
       this.dataSource.data = JSON.parse(JSON.stringify(this.dataSource.data));
    })}

  }
  hasChild = (_: number, node: TaskTreeNode) => node.isParent==true; 


}
