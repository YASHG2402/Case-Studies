import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    private users: any[] = [];
  constructor(private http: HttpClient) {}

  loadUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/employees');
  }
  validateUser(username: string, dob: string): Observable<boolean> {
    // Load user data from the JSON file
    return this.loadUsers().pipe(
      map((users) => {
        const user = users.find((u) => u.username === username && u.dob === dob);
        return !!user; // Return true if the user exists, false otherwise
      })
    );
  }
}