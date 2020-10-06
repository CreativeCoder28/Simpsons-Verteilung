import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  DistributionData,
  UserEntredData,
  SimpsonsData,
} from '../models/distribution-data';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

// import * from '../../assets/data/data-file.json';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public userData: UserEntredData = new UserEntredData();
  newDistributionData: DistributionData = new DistributionData();
  DataList: DistributionData[] = [];
  public distributionData: DistributionData = new DistributionData();

  // Base url
  /* baseurl_data = 'http://localhost:3000/data/';
  baseurl_user = 'http://localhost:3000/userEntryData/';*/

  /* baseurl_data = 'https://simpsons-app.firebaseio.com/data/.json';
  baseurl_user = 'https://simpsons-app.firebaseio.com/userEntryData/.json';*/

  baseurl_data = '../../assets/data/dataSource.json';
  baseurl_user = '../../assets/data/userEntryData.json'; 

  constructor(private http: HttpClient) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      header: 'data',
    }),
    responseType: 'text' as 'json',
  };

  // GET Distribution Data
  GetEntry(): Observable<DistributionData[]> {
    return this.http.get<DistributionData[]>(this.baseurl_data);
  }
  // GET simpsons Data
  GetuserEntry(): Observable<UserEntredData> {
    return this.http.get<UserEntredData>(this.baseurl_user);
  }

  // POST
  AddEntry(newDistributionData): Observable<DistributionData> {
    this.DataList.push(Object.assign({}, newDistributionData));

    console.log(this.DataList);
    /* return this.http
      .post<DistributionData>(
        this.baseurl_data,
        JSON.stringify(newDistributionData),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));*/
    return this.http
      .put<DistributionData>(
        this.baseurl_data,
        JSON.stringify(this.DataList),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // POST new  Data
  PostuserEntry(userData): Observable<UserEntredData> {
    console.log(userData);
    return this.http
      .put<UserEntredData>(
        this.baseurl_user,
        JSON.stringify(userData),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // Error handling
  // tslint:disable-next-line: typedef
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
