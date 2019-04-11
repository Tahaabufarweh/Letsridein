import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
const baseUrl = 'api/Users/'
const postFileRoute = 'PostFile/';

const reportUrl = 'api/Reports/'
const newReportRoute = 'InsertNewReport';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient, private router: Router) { }


  saveProfilePic(id, file)
  {
    const formData: FormData = new FormData();
    formData.append('File', file);
    console.log(formData);
    return this.httpClient.post(baseUrl + postFileRoute  + id, formData);
  }

  createReport(report, id) {
    console.log(id);
    return this.httpClient.post(reportUrl + newReportRoute + "?id=" + id, JSON.stringify(report), httpOptions);
  }
}
