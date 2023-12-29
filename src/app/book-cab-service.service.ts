import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookCabServiceService {
  constructor(private http: HttpClient) { }
  public getAllDestinations() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>("http://localhost:8087/getAllDestinations")
      .pipe(
        catchError(this.handleError)
      );
  }
  public getPrice(source:any, destination:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>("http://localhost:8087/getPrice/" + source + "/" + destination, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  public getSelectedDestination(source:any, destination:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>("http://localhost:8087/findDestination/" + source + "/" + destination, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  public getAllCabs(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>("http://localhost:8086/getAllCabs", httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  public findDrivers(cabType:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>("http://localhost:8086/findDrivers/" + cabType, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  public findDriverByName(driverName:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>("http://localhost:8086/findDriverByName/" + driverName, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  public bookCab(bookingData:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>("http://localhost:8088/bookCab", bookingData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  public myBookings(userId:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>("http://localhost:8088/getUserBookings/" + userId, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteBooking(bookingId: number): Observable<any> {
    return this.http.delete(`http://localhost:8088/deleteBooking/${bookingId}`, { responseType: 'text' });
  }
  public getBookingById(bookingId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const url = `http://localhost:8088/getBookingById/${bookingId}`;

    return this.http.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public updateBooking(bookingId: number, bookingDate, bookingTime, paymentType): Observable<any> {
    return this.http.post(`http://localhost:8088/updateBooking/${bookingId}/${bookingDate}/${bookingTime}/${paymentType}`, null, { responseType: 'text' });
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }


}
