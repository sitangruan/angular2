import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls } from '../common/urls';
import { User, Company, Address } from '../modals/user';
import { SortingInfo } from '../modals/SortingInfo';
import { maxUsersCacheAgeInMs } from '../common/constants';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _userApiUrl = apiUrls.users;
  private _sortInfo: SortingInfo = { sortBy: '', sortOrder: undefined };
  private _cacheUsers: User[] | null = null;

  private lastFetchTimeStamp: number | null = null;

  constructor(private http: HttpClient) {}

  get willForceRefreshCache(): boolean {
    const currentTime = new Date().getTime();
    const cacheAge = this.lastFetchTimeStamp ? currentTime - this.lastFetchTimeStamp : null;
    return cacheAge !== null && cacheAge >= maxUsersCacheAgeInMs;
  }

  get sortInfo(): SortingInfo {
    return this._sortInfo;
  }

  set sortInfo(sortInfo: SortingInfo) {
    this._sortInfo = sortInfo;
  }

  updateUsersCacheById(userId: number, updatedUserData: User) {
    if (this._cacheUsers) {
      const allFound = this._cacheUsers.filter(u => u.id === userId);
      if (!allFound) {
        return;
      }

      allFound.forEach(u => {
        u.name = updatedUserData.name;
        u.username = updatedUserData.username;
        u.email = updatedUserData.email;
        u.phone = updatedUserData.phone;
        u.website = updatedUserData.website;
        u.address = updatedUserData.address;
        u.company = updatedUserData.company;
      });
    }
  }

  getUsers(forceRefresh: boolean = false): Observable<User[]> {
    const currentTime = new Date().getTime();
    const cacheAge = this.lastFetchTimeStamp ? currentTime - this.lastFetchTimeStamp : null;

    if (!forceRefresh && this._cacheUsers && cacheAge !== null && cacheAge < maxUsersCacheAgeInMs) {
      return new Observable<User[]>(observer => {
        observer.next(this._cacheUsers as User[]);
        observer.complete();
      });
    }

    return new Observable<User[]>(observer => {
      this.http.get<User[]>(this._userApiUrl).subscribe({
        next: (users: User[]) => {
          this._cacheUsers = users;
          this.lastFetchTimeStamp = new Date().getTime();
          observer.next(users);
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  getUserById(userId: number, forceRefresh: boolean = false): Observable<User> {
    const currentTime = new Date().getTime();
    const cacheAge = this.lastFetchTimeStamp ? currentTime - this.lastFetchTimeStamp : null;

    if (!forceRefresh && this._cacheUsers && cacheAge !== null && cacheAge < maxUsersCacheAgeInMs) {
      const cachedUser = this._cacheUsers.find(u => u.id === userId);
      if (cachedUser) {
        return new Observable<User>(observer => {
          observer.next(cachedUser);
          observer.complete();
        });
      }
    }

    const url = `${this._userApiUrl}/${userId}`;
    return this.http.get<User>(url);
  }

  updateUser(userId: number, updatedUserData: User): Observable<User> {
    const url = `${this._userApiUrl}/${userId}`;
    return this.http.put<User>(url, updatedUserData);
  }
}
