import { Injectable } from '@angular/core';
import { Task } from '../app/models/task.inteface';
import { BehaviorSubject } from 'rxjs';
import { Category } from './models/category.class';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  taskList:Array<Task> = new Array();
  list$ = new BehaviorSubject<Task[]>( this.taskList ) ;
  categoryList: Array<Category> = new Array( new Category('default') );
  categories$ = new BehaviorSubject<Category[]>(this.categoryList);

  constructor() {
    this.loadData().then((data:Array<Task>) => {
      data.forEach((item) => {
        this.taskList.push(item)
      })
      this.sortList();
      this.list$.next( this.taskList );
    })

    this.loadCategories().then((data:Array<Category>) => {
      if( data.length == 0 ) {
        this.saveCategories()
      }
      this.categoryList = data;
      this.categories$.next( this.categoryList )
    })
  }

  addToList( task:Task ) {
    this.taskList.push( task );
    this.list$.next( this.taskList );
    this.sortList();
    this.saveData();
  }

  deleteFromList( id:number ) {
    this.taskList.forEach( (task:Task, index ) => {
      if( task.start == id ) {
        this.taskList.splice( index, 1 );
      }
    });
    this.saveData();
    this.list$.next( this.taskList );
  }

  saveData() {
    let data = JSON.stringify( this.taskList );
    try {
      window.localStorage.setItem("tasks" , data );
      if( !window.localStorage.getItem("tasks") ) {
        throw("local storage not available");
      }
    }
    catch( exc ) {
      console.log( exc );
    }
  }

  loadData() {
    return new Promise( (resolve,reject) => {
      if( !window.localStorage.getItem("tasks") ) {
        reject( false );
      }
      else{
        let data = JSON.parse( window.localStorage.getItem("tasks") );
        resolve( data );
      }
    } );
  }

  sortList(){
    this.taskList.sort( (task1:Task, task2:Task ) => {
      return task2.stop - task1.stop;
    })
  }

  addCategory(name) {
    return new Promise( (resolve, reject) => {
      if( this.checkIfCategoryExists(name) == false ) {
        this.categoryList.push( new Category(name) );
        this.saveCategories();
        this.categories$.next(this.categoryList);
        resolve( true );
      }
      else {
        reject( false );
      }
    })
  }

  checkIfCategoryExists( name :string ){
    let arr:Array<Category> = this.categoryList.filter( (category) => {
      if( category.name.toLocaleLowerCase() == name.toLowerCase() ) {
        return category;
      }
    })
    return ( arr.length > 0 ) ? true : false;
  }

  saveCategories() {
    let data = JSON.stringify( this.categoryList );
    try {
      window.localStorage.setItem("categories" , data );
      if( !window.localStorage.getItem("categories") ) {
        throw("local storage not available");
      }
    }
    catch( exc ) {
      console.log( exc );
    }
  }

  loadCategories() {
    return new Promise( (resolve,reject) => {
      if( !window.localStorage.getItem("categories") ) {
        reject( false );
      }
      else{
        let data = JSON.parse( window.localStorage.getItem("categories") );
        resolve( data );
      }
    } );
  }
}
