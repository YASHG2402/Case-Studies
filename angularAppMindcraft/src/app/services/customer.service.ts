import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, retry, throwError } from "rxjs";
import { Customer } from "../customer/customer.model";

@Injectable({providedIn:'root',})
export class CustomerRestApiService{
    apiUrl = "http://localhost:3000";

    constructor(private http: HttpClient){
    }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.apiUrl + '/customers')
        .pipe(retry(1), catchError(this.handleError));
    }
    
    createCustomer(customer : any): Observable<Customer> {
        return this.http.post<Customer>(this.apiUrl + '/customers/', JSON.stringify(customer), this.httpOptions).pipe(retry(1), catchError(this.handleError));
    }
    deleteCustomer(id: any) {
        return this.http.delete<Customer>(this.apiUrl + '/customers/' + id, this.httpOptions).pipe(retry(1), catchError(this.handleError));
    }
    updateCustomer(id: any, customer : any): Observable<Customer> {
        return this.http.put<Customer>(this.apiUrl + '/customers/' + id, JSON.stringify(customer), this.httpOptions).pipe(retry(1), catchError(this.handleError));
    }
    getCustomerObject(id : any): Observable<Customer> {
        return this.http.get<Customer>(this.apiUrl + '/customers/' + id).pipe(retry(1), catchError(this.handleError));
    }
    handleError(error: any) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        }else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => {
            return errorMessage
        });
    }
}