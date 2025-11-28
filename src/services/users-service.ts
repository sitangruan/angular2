import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls } from '../common/urls';
import { User, Company, Address } from '../modals/user';
import { SortingInfo } from '../modals/SortingInfo';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _userApiUrl = apiUrls.users;
  private _sortInfo: SortingInfo = { sortBy: '', sortOrder: undefined };

  constructor(private http: HttpClient) {}

  get sortInfo(): SortingInfo {
    return this._sortInfo;
  }

  set sortInfo(sortInfo: SortingInfo) {
    this._sortInfo = sortInfo;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this._userApiUrl);
  }

  getUserById(userId: number): Observable<User> {
    const url = `${this._userApiUrl}/${userId}`;
    return this.http.get<User>(url);
  }
}
