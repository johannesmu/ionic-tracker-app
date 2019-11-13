import { Injectable } from '@angular/core';
import { Task } from '../app/models/task.inteface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  taskList:Array<Task> = new Array();
  list$ = new BehaviorSubject<Task[]>( this.taskList ) ;
  constructor() { }

  addToList( task:Task ) {
    this.taskList.push( task );
    this.list$.next( this.taskList );
  }
}
