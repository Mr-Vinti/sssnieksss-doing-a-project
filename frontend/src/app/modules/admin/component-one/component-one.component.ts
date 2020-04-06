import { Component, OnInit } from '@angular/core';
import { TestserviceService } from '../../../core/http/testrest/testservice.service';
import { UserService } from '../../../core/user.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styleUrls: ['./component-one.component.scss']
})
export class ComponentOneComponent implements OnInit {

  message: string;
  user: User;

  constructor(private service: TestserviceService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  testJavaApi() {
    this.service.testJavaApi().subscribe(mess => {
      console.log(mess);
      this.message = mess.response;
    })
  }
}
