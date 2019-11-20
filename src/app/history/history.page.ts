import { Component, OnInit } from '@angular/core';

import { Task } from '../models/task.inteface';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  history:Array<Task> = [];
  historySub:Subscription;

  constructor(
    private dataService:DataService
  ) { }

  ngOnInit() {
    this.historySub = this.dataService.list$.subscribe( taskData => this.history = taskData );
  }

  duration(stop,start) {
    return ((stop - start) / 1000).toFixed(2);
  }

  delete( itemStart ) {
    this.dataService.deleteFromList( itemStart );
  }
}
