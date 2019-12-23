import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { timer, Subscription } from 'rxjs';

import { DataService } from '../data.service';
import { Task } from '../models/task.inteface';
import { Category } from '../models/category.class';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  taskForm:FormGroup;
  started:Boolean = false;
  startTime:number;
  stopTime:number;

  timerSub:Subscription;
  time:number;

  categoriesSub:Subscription;
  categories:Array<Category> = new Array();

  tasksSub:Subscription;
  tasks:Array<Task> = new Array();

  totalTime = new Array();

  constructor(
    private formBuilder:FormBuilder,
    private dataService:DataService
  ) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
     name: ['', [Validators.required, Validators.minLength(3) ] ],
     category: ['', [Validators.required] ]
    });

    this.tasksSub = this.dataService.list$.subscribe( (tasksData) => {
      this.tasks = tasksData;
    })

    this.categoriesSub = this.dataService.categories$.subscribe( (categoriesData) => {
      this.categories = categoriesData;
    })

    this.calculateTotalTime();
  }

  start() {
    this.started = true;
    this.startTime = new Date().getTime();
    const tm = timer(0,1000);
    this.timerSub = tm.subscribe( val => this.time = val );
  }

  stop() {
    this.started = false;
    this.stopTime = new Date().getTime();
    this.timerSub.unsubscribe();
    this.save();
    this.taskForm.reset();
  }

  save() {
    let task:Task = {
      name: this.taskForm.get('name').value,
      category: this.taskForm.get('category').value,
      start: this.startTime,
      stop: this.stopTime
    }
    this.dataService.addToList( task );    
  }

  calculateTotalTime() {
    let totalTime = new Array();
    
    this.categories.forEach( (category) => {
      // check for each items in the category and total the time spent
    })
    
  }
}
