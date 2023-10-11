import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, throwError, retry } from "rxjs";
import { Employee } from "../employee/employee.model";

@Injectable({
    providedIn: 'root',
})
export class EmployeeRestApiService {
    apiURL = 'http://localhost:3000/employees/'; // Update the URL

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    // ... Your existing methods ...

    createEmployee(employee : any): Observable<Employee> {
        return this.http.post<Employee>(this.apiURL, JSON.stringify(employee), this.httpOptions).pipe(retry(1), catchError(this.handleError));
    }
    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.apiURL).pipe(
            catchError(this.handleError) // Use the defined handleError function
        );
    }

    updateEmployee(id: any, employee : any): Observable<Employee> {
         return this.http.put<Employee>(this.apiURL + id, JSON.stringify(employee), this.httpOptions).pipe(retry(1), catchError(this.handleError));
     }

     deleteEmployee(id: any) {
        //const url =  `${this.apiURL}${id}`;
         return this.http.delete<Employee>(this.apiURL + id).pipe(retry(1), catchError(this.handleError));
         //return this.http.delete(url);
     }

    // Define the handleError function
    private handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
