import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TrackerPage } from './tracker.page';
import { TimeModule } from '../time/time.module';

const routes: Routes = [
  {
    path: '',
    component: TrackerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    TimeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TrackerPage]
})
export class TrackerPageModule {}
