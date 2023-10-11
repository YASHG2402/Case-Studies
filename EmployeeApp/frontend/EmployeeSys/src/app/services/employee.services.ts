import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../employee/employee.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
    private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  insertEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit-employee`, employeeData);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/get-all-employees`);
  }

  updateEmployee(id: number, updatedEmployee: Employee): Observable<any> {
    const url = `${this.apiUrl}/update-employee/${id}`; // Construct the URL with the employee's ID
    return this.http.put(url, updatedEmployee).pipe(
      catchError((error: any) => {
        console.error('Error updating employee:', error);
        throw error;
    })
  );
}
deleteEmployee(id: number): Observable<any> {
  const url = `${this.apiUrl}/delete-employee/${id}`; // Construct the URL with the employee's ID
  return this.http.delete(url).pipe(
      catchError((error: any) => {
          console.error('Error deleting employee:', error);
          throw error;
      })
  );
}


}