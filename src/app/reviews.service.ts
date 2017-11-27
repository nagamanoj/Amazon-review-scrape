import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ReviewsService {

  constructor(private http: Http) { }

  // Get all posts from the API
  getAllReveiws(urlString) {
    var obj = {url : urlString};
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
console.log(obj);
    return this.http.post('/api/scrape', obj).map(res => res.json());
  }
}  