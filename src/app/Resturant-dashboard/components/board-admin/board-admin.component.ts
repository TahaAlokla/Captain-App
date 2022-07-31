import { RegistrationUsersService } from './../../../shared/services/registration-users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit {

  constructor(private RegistrationUsersService:RegistrationUsersService) { }

  ngOnInit(): void {
    this.RegistrationUsersService.VisitRestHome.next(true)
  }
  ngOnDestroy(): void {
    this.RegistrationUsersService.VisitRestHome.next(false)
  }

}
