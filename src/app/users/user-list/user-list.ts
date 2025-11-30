import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users-service';
import { FullUserInfo, User } from '../../../modals/user';
import { SpinnerService } from '../../../services/spinner-service';
import { compareWrapper, delay } from '../../../common/utils';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  users: User[] | null = null;
  fullUsersInfos: FullUserInfo[] | null = null;

  private usersService = inject(UsersService);
  private spinnerService = inject(SpinnerService);

  get currentSortField(): string {
    return this.usersService.sortInfo.sortBy;
  }

  get isSortAscending(): boolean {
    return this.usersService.sortInfo.sortOrder === 'asc';
  }

  get sortedFullUserInfos(): FullUserInfo[] {
    if (!this.fullUsersInfos || this.fullUsersInfos.length === 0) {
      return Array<FullUserInfo>();
    }

    const sortBy = this.usersService.sortInfo.sortBy;
    const sortOrder = this.usersService.sortInfo.sortOrder;

    if (!sortBy || !sortOrder) {
      return this.fullUsersInfos;
    }

    const sorted = [...this.fullUsersInfos].sort(compareWrapper(sortBy, sortOrder === 'asc'));
    return sorted;
  }

  setSorting(fieldName: string) {
    const currentSortBy = this.usersService.sortInfo.sortBy;
    const currentSortOrder = this.usersService.sortInfo.sortOrder;
    let newSortOrder: 'asc' | 'desc' = 'asc';

    if (currentSortBy === fieldName) {
      newSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      newSortOrder = 'asc';
    }
    this.usersService.sortInfo = {
      sortBy: fieldName,
      sortOrder: newSortOrder,
    };
  }

  gotoUserDetail(userId: number) {
    // this.router.navigateByUrl(`/users/${userId}`);
    // this.router.navigate(['/users', userId]);
    this.router.navigate([userId], { relativeTo: this.route });
  }

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.usersService.getUsers().subscribe(async (users) => {
      if (this.usersService.willForceRefreshCache) {
        await delay(1000);
      }
      this.users =  [...users, ...users, ...users, ...users, ...users, ...users]; // Duplicate for testing scroll
      this.fullUsersInfos = this.users.map(user => {
        const address = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
        return {
          ...user,
          fullAddressInfo: address,
          fullCompanyInfo: user.company.name,
        };
      });
      this.spinnerService.hideSpinner(); // Simulate loading delay
    });
  }
}
