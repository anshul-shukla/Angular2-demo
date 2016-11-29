import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AppService]
})

export class LoginComponent implements OnInit {

  constructor( private appService : AppService) { }

  ngOnInit() {
  }

  login( username: string, password:string, confirmPassword: string) {
  	if(password === confirmPassword) {
  		alert("successful login");
  	}else{
  		alert("password are not matching");
  	}
}

}
