import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rating } from '../modelInterfaces';
const baseUrl = 'api/Ratings/'
const createRate = 'InsertNewRate/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class RatingService {

  constructor(private http: HttpClient) {

    }

  createRate(rate, ratedUser) {
    console.log(ratedUser);
    return this.http.post(baseUrl + createRate + "?ratedUser=" + ratedUser, JSON.stringify(rate), httpOptions);
  }
}
