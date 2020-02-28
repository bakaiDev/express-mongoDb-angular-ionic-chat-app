import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  users = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe((data) => {
      console.log(data);
    });
  }

}
