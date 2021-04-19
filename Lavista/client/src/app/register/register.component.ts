import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { RegisterService } from 'src/app/services/register.service';
import {
  SocialAuthService,
  SocialUser,
  GoogleLoginProvider,
} from 'angularx-social-login';

// import * as statesData from 'src/app/json/states.json';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']  
})

export class RegisterComponent implements OnInit {
  // states: any = (statesData as any).default;
   _user!: SocialUser;
  _msg: string = '';
 
  userModel = new User('', '', '', '', '', '', '', '', '');
  isInvalid: boolean = false;
  signupSuccess: boolean = false;

  constructor(
    private _signupService: RegisterService,
    // private _socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    // this._socialAuthService.authState.subscribe((user) => {
    //   this._user = user;
    // });
  }


  

  onSubmit() {
    this._signupService.register(this.userModel).subscribe(
      (msg: any) => {
        this.signupSuccess = true;
        this._msg = msg.message;
      },
      (err) => {
        this.isInvalid = true;
        this._msg = err.error.message;
      }
    );
  }


}
