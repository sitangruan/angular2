import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Address, User } from '../../../modals/user';
import { UsersService } from '../../../services/users-service';
import { SpinnerService } from '../../../services/spinner-service';
import { delay } from '../../../common/utils';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCard } from "./user-card/user-card";

@Component({
  selector: 'app-user-detail',
  imports: [ReactiveFormsModule, CommonModule, UserCard],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail implements OnInit {
  userId: number | null = null;
  userInfo: User | null = null;

  private usersService = inject(UsersService);
  private spinnerService = inject(SpinnerService);
  private router = inject(Router);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
    this.userId = Number(params.get('id')); // 'id' is the name of the route parameter

      if (this.userId && this.userId > 0) {
        this.spinnerService.showSpinner();
        await delay(1000);
        this.usersService.getUserById(this.userId).subscribe({
          next: (user: User) => {
            this.userInfo = user;
          },
          error: (error) => {
            alert('Error fetching user details: ' + error.message);
            this.router.navigate(['']);
          },
          complete: () => {
            this.spinnerService.hideSpinner();
          }
        });
      } else {
        alert('Invalid user ID. Please enter a valid integer greater than 0.');
      }
    });
  }

  gotoList() {
    this.router.navigate(['/users']);
  }

  handleRefresh(updatedUser: User) {
    this.userInfo = updatedUser;
    this.usersService.updateUsersCacheById(updatedUser.id, updatedUser);
    this.router.navigate(['/users']);
  }
}
