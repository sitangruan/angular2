import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users-service';
import { User } from '../../../modals/user';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  gotoUserDetail(userId: number) {
    // this.router.navigateByUrl(`/users/${userId}`);
    // this.router.navigate(['/users', userId]);
    this.router.navigate([userId], { relativeTo: this.route });
  }

  private usersService = inject(UsersService);
  users: User[] | null = null;

  ngOnInit() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
