import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
})
export class ManageUsersComponent {
  users!: User[];

  constructor(private usersService: UsersService) {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe((response) => {
      console.log(response);

      if (response.success && response.data) {
        this.users = response.data;
      }
    });
  }
}
