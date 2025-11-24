import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls } from '../common/urls';
import { User, Company, Address } from '../modals/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userApiUrl = apiUrls.users;
  userListCache: User[] | null = null;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl);
  }

  getUserById(userId: number): Observable<User> {
    const url = `${this.userApiUrl}/${userId}`;
    return this.http.get<User>(url);
  }
}
