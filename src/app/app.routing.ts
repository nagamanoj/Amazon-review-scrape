import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewsComponent } from './reviews/reviews.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'reviews',
    pathMatch: 'full'
  },
  {
    path: 'reviews',
    component: ReviewsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}