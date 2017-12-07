import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchReviews'
})
export class SearchReviewsPipe implements PipeTransform {

  transform(reviews: any, filterText: any): any {
    if(filterText === undefined) return reviews;
      return reviews.filter((review)=>{
        return review.reviewTitle.toLowerCase().includes(filterText.toString().toLowerCase());
      })
  }
  
}
