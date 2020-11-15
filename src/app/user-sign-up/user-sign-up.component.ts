import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { AuthenticateService } from '../services/authenticate.service';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})
export class UserSignUpComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  signupError :string ="";

  constructor(private userService:UserService,
    private authenticationService:AuthenticateService,
    private route:ActivatedRoute,
    private router:Router){

  }
  ngOnInit() {
    // this.userService.
  }

  getErrorMessage(type:string) {
    if (this.email.hasError('required') && type=='email') {
      return 'You must enter a value';
    }
    if (this.email.hasError('email') && type=='email') {
      return 'Not a valid email';
    } 
    if (this.username.hasError('required') && type=='username') {
      return 'You must enter a value';
    } 
    if (this.password.hasError('required') && type=='password') {
      return 'You must enter a value';
    }
    return '';
  }

  signup(){
    var userId:number;
    var user = new User();
    user.emailId = this.email.value;
    user.password = this.password.value;
    user.userName = this.username.value;
    this.userService.createUser(user).subscribe(res =>{
      if(res!=null && res.data!=null){
        user = res.data;
        userId = res.data.id;
        console.log(userId);
        this.signupError='';
        localStorage.setItem('userId',new Number().toString(userId));
        this.router.navigate(['/dashboard'])
      }
      else{
        this.signupError = "User Not Create. Please try Again";
        console.log(this.signupError);
        
        
      }
    }, error =>{
      this.signupError = "User Not Create. Please try Again";
    })
    
  }


}
