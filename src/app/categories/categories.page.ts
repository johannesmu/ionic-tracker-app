import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { Category } from '../models/category.class';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categoryForm:FormGroup;
  categoriesSub:Subscription;
  categories:Array<Category> = new Array();
  constructor(
    private formBuilder: FormBuilder, 
    private dataService: DataService,
    private toast:ToastController
  ) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3) ] ]
    });

    this.categoriesSub = this.dataService.categories$.subscribe((categoriesData) => { 
      this.categories = categoriesData;
    })
  }

  addCategory() {
    const name = this.categoryForm.get('name').value;
    this.dataService.addCategory( name )
    .then((response) => {
      //success
      console.log(response)
    })
    .catch((error) => {
      this.showToast(`category ${name} already exists`)
    });
    this.categoryForm.reset();
  }

  async showToast( msg:string ) {
    const toastElement = await this.toast.create({
      message: msg,
      duration: 2000,
      color: "tertiary"
    })
    toastElement.present();
  }
}
