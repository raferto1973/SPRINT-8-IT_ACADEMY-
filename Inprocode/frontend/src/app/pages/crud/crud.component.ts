
//crud.component.ts

import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user';


@Component({
  selector: 'app-usersCrud',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss',
})
export class CrudComponent {

  // users: User[] = [];
  // user!: User;

  // constructor(private UserService: UserService){}

  // ngOnInit(): void {
  //   this.getAllUsers();
  // }

  // getAllUsers() {
  //   this.UserService.getAllUsers().subscribe({
  //     next: (response) => {
  //       console.log(response);
  //       if (response.data) {
  //         this.users = response.data;
  //       }
  //     },
  //   });
  // }

  // trackById(index: number, user: User): number {
  //   return user.id_user;
  // }


  // loadUser(user: User) {
  //   this.user = user;

  // }

  // deleteUser(id_user: number) {
  //   this.UserService.deleteUser(id_user).subscribe({
  //     next: (response) => {
  //       this.getAllUsers();
  //     },
  //   });
  // }

}
