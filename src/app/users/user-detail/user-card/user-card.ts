import { Component, EventEmitter, inject, Input, input, Output, output, SimpleChanges } from '@angular/core';
import { SpinnerService } from '../../../../services/spinner-service';
import { UsersService } from '../../../../services/users-service';
import { Address, User } from '../../../../modals/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-card.html',
  styleUrls: ['./user-card.css'],
})
export class UserCard {
  userId: number = 0;
  userInfo = input.required<User | null>();
 @Output() refreshParent: EventEmitter<User> = new EventEmitter<User>();

  private usersService = inject(UsersService);
  private spinnerService = inject(SpinnerService);

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
  }) ;

  ngOnInit() {
    const user = this.userInfo();
    if (!user) {
      return;
    }
    this.userId = user.id;
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
  }

   ngOnChanges(changes: SimpleChanges): void {
    if (changes['userInfo']) {
      const user = this.userInfo();
      if (!user) {
        return;
      }

      this.userId = user.id;
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
    }
  }

  onSubmit() {
      if (this.userDetailForm.valid && this.userInfo) {
        const updatedUser: User = { ...this.userInfo() } as User;
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
          geo: this.userInfo()?.address?.geo,
        } as Address;

        this.spinnerService.showSpinner();
        this.usersService.updateUser(this.userId, updatedUser).subscribe({
          next: () => {
            alert('User details updated successfully in the cache.');
            this.refreshParent.emit(updatedUser);
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
