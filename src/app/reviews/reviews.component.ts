import { Component } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import {MatTableDataSource, MatSort} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchReviewsPipe } from '../search-reviews.pipe';

import { Url }    from '../Url';

@Component({
  selector: 'app-posts',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

  searchQuery: FormGroup;
  isDesc: boolean = false;
  column: string = 'Date';
  direction: number;

  flota: any[] = [];

  model = new Url('https://www.amazon.com/SanDisk-Ultra-Class-Memory-SDSDUNC-032G-GN6IN/product-reviews/B0143RT8OY');

  submitted = false;

  constructor(private reviewsService: ReviewsService) {}

  // instantiate posts to an empty array
  reviews: any = [];

  search() {
    this.submitted = true;
    console.log(this.model);
    this.reviewsService.getAllReveiws(this.model) 
      .subscribe(data => {
        this.reviews = data;
      })
  }

  sortDate(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.reviews.sort(function(a, b){
        console.log(a);
        console.log(new Date (a[property]).getTime());
        if(new Date (a[property]).getTime() < new Date (b[property]).getTime()){
            return -1 * direction;
        }
        else if(new Date (a[property]).getTime() > new Date (b[property]).getTime()){
            return 1 * direction;
        }
        else{
            return 0;
        }
    });
  };

  sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.reviews.sort(function(a, b){
        console.log(a[property]);
        if(a[property] < b[property]){
            return -1 * direction;
        }
        else if(a[property] > b[property]){
            return 1 * direction;
        }
        else{
            return 0;
        }
    });
  };
}