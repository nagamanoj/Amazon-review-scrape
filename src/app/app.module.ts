import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
// Imports commented out for brevity
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ReviewsComponent } from './reviews/reviews.component';
// Imports commented out for brevity
import { ReviewsService } from './reviews.service';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataTableModule} from "angular2-datatable";
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    //BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatButtonModule, 
    MatCheckboxModule,
    AppRoutingModule,
    DataTableModule
  ],
  providers: [ReviewsService], // Add the posts service
  bootstrap: [AppComponent]
})
export class AppModule { }