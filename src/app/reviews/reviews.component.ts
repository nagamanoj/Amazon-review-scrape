/*import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import {MatTableDataSource, MatSort} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

  searchQuery: FormGroup;
  flota: any[] = [];

  submitted = false;
  
    onSubmit() { this.submitted = true; }

  //ngOnInit() {
    // Retrieve posts from the API
    //this.reviewsService.getAllReveiws().subscribe(reviews => {
    //  this.reviews = reviews;
    //});  
  //}

  // instantiate posts to an empty array
  reviews: any = [];

   search(searchQuery) {
    this.reviewsService.getAllReveiws(searchQuery.value.fleetname) 
      .subscribe(data => {
        this.flota = data;
        this.searchQuery.reset();
      })
  }
}*/


import { Component } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import {MatTableDataSource, MatSort} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Url }    from '../Url';

@Component({
  selector: 'app-posts',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

  searchQuery: FormGroup;
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
}