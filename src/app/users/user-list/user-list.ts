import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [],
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
}
