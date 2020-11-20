import { Component, OnInit, Inject } from '@angular/core';

import { ApiService } from './api.service';
import { todoItem } from './todo-item.interface';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template: `

  <div style="text-align:center">

  <mat-toolbar color="primary">
    <mat-toolbar-row class="topo">
      <span>TODO LIST</span>
      <span class="example-spacer"></span>
      <button mat-button>INICIO</button>
    </mat-toolbar-row>
  </mat-toolbar>

<div class="card">
  <mat-card class="example-card">
    <mat-card-header>

      <form class="example-form2">
        <mat-form-field class="example-form">
          <input #todoName matInput placeholder="Tarefa" value="">
        </mat-form-field>
        <button mat-fab color="accent" class="mais" (click)="add(todoName.value)" style="margin-top: 0px;"> <mat-icon>add</mat-icon> </button>
      </form>

    </mat-card-header>
  </mat-card>
</div>

</div>

<div>

  <div *ngFor="let item of items">
    <div class="card2">
      <mat-card class="example-card">
        <mat-card-header>
         <div style="margin-left: 20px; left: 0px; position: absolute; margin-top: 6px;">
          <button mat-mini-fab color="accent" (click)="feito(item.id, item.tarefa, item.enable)"> <mat-icon>done</mat-icon> </button>
         </div>
  
          <form class="example-form" style="margin-top: 0px; margin-left: 35px;" *ngIf="item.enable === true">
            <mat-form-field class="example-full-width" style="width: 83%;">
              <input #tarefa style="font-weight: bolder; font-size: 15px; text-decoration: line-through;" matInput placeholder="" value="{{ item.tarefa }}">
            </mat-form-field>
            <button mat-raised-button color="primary"  (click)="editar(item.id, tarefaa.value, item.enable)" style="margin-right: 90px; margin-top: 8px; right: 0px; position: absolute;" > <mat-icon>save</mat-icon> </button>
            <button mat-raised-button color="primary" (click)="delete(item.id) " style="margin-right: 20px; margin-top: 8px; right: 0px; position: absolute;"> <mat-icon>delete</mat-icon> </button>
          </form>

          <form class="example-form" style="margin-top: 0px; margin-left: 35px;" *ngIf="item.enable === false">
            <mat-form-field class="example-full-width" style="width: 83%;">
              <input #tarefaa style="font-weight: bolder; font-size: 15px; " matInput placeholder="" value="{{ item.tarefa }}">
            </mat-form-field>
            <button mat-raised-button color="primary"  (click)="editar(item.id, tarefaa.value, item.enable)" style="margin-right: 90px; margin-top: 8px; right: 0px; position: absolute;" > <mat-icon>save</mat-icon> </button>
            <button mat-raised-button color="primary" (click)="delete(item.id) " style="margin-right: 20px; margin-top: 8px; right: 0px; position: absolute;"> <mat-icon>delete</mat-icon> </button>
          </form>

          <div class="right">

           {{ error?.message }}
          </div>
       </mat-card-header>
      </mat-card>
    </div>
  </div>

</div>
  <br>
  <br>
  <br>
  
{{ error?.message }}

  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  items: todoItem[];
  error: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getTodoItems().subscribe(
      (items: todoItem[]) => this.items = items,
      (error: any) => this.error = error
    );
    
  }


  add(todoName: string) {
    this.api.createTodoItem(todoName, false).subscribe(
      (item: todoItem) => this.items.push(item)
    );
  }

  delete(id: number) {
    this.api.deleteTodoItem(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    window.location.reload();
  }

  feito(id: number, tarefal: string, feitos: boolean) {
 
    this.api.feitoTodoItem(id, tarefal, feitos).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    window.location.reload();
  }

  editar(id: number, tarefal: string, feitos: boolean) {
 
    this.api.editarTodoItem(id, tarefal, feitos).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
    window.location.reload();
  }

}
