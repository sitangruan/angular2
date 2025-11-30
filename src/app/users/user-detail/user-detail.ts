import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Address, User } from '../../../modals/user';
import { UsersService } from '../../../services/users-service';
import { SpinnerService } from '../../../services/spinner-service';
import { delay } from '../../../common/utils';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail implements OnInit {
  userId: number | null = null;
  userInfo: User | null = null;
  userDetailForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(12)]),
    website: new FormControl('', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/)]),
    company: new FormControl('', [Validators.required, Validators.minLength(2)]),
    street: new FormControl('', [Validators.required, Validators.minLength(2)]),
    suite: new FormControl('', [Validators.required, Validators.minLength(2)]),
    city: new FormControl('', [Validators.required, Validators.minLength(2)]),
    zipcode: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]),
  });

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
            this.userDetailForm.patchValue({
              name: user.name,
              username: user.username,
              email: user.email,
              phone: user.phone,
              website: user.website,
              company: user.company?.name,
              street: user.address?.street,
              suite: user.address?.suite,
              city: user.address?.city,
              zipcode: user.address?.zipcode,
            });
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

  onSubmit() {
    if (this.userDetailForm.valid && this.userId) {
      const updatedUser: User = { ...this.userInfo } as User;
      updatedUser.name = this.userDetailForm.value.name;
      updatedUser.username = this.userDetailForm.value.username;
      updatedUser.email = this.userDetailForm.value.email;
      updatedUser.phone = this.userDetailForm.value.phone;
      updatedUser.website = this.userDetailForm.value.website;
      updatedUser.company = { name: this.userDetailForm.value.company } as any;
      updatedUser.address = {
        street: this.userDetailForm.value.street,
        suite: this.userDetailForm.value.suite,
        city: this.userDetailForm.value.city,
        zipcode: this.userDetailForm.value.zipcode,
        geo: this.userInfo?.address?.geo,
      } as Address;
      this.spinnerService.showSpinner();
      this.usersService.updateUser(this.userId, updatedUser).subscribe({
        next: () => {
          alert('User details updated successfully in the cache.');
          this.usersService.updateUsersCacheById(this.userId as number, updatedUser);
          this.router.navigate(['/users']);
        },
        error: (error: any) => {
          alert('Error updating user details: ' + error.message);
        },
        complete: () => {
          this.spinnerService.hideSpinner();
        }
      });
    } else {
      alert('Please correct the errors in the form before submitting.');
    }
  }
}
