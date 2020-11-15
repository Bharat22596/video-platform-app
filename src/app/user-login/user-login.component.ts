import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { AuthenticateService } from '../services/authenticate.service';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent  implements OnInit {

  // email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  loginError :string ="";

  constructor(private userService:UserService,
    private authenticationService:AuthenticateService,
    private route:ActivatedRoute,
    private router:Router){

  }
  ngOnInit() {
    // this.userService.
  }

  getErrorMessage(type:string) {
    // if (this.email.hasError('required') && type=='email') {
    //   return 'You must enter a value';
    // }
    // if (this.email.hasError('email') && type=='email') {
    //   return 'Not a valid email';
    // } 
    if (this.username.hasError('required') && type=='username') {
      return 'You must enter a value';
    } 
    if (this.password.hasError('required') && type=='password') {
      return 'You must enter a value';
    }
    return '';
  }

  login(){
    var userId:number;
    this.authenticationService.login(this.username.value,this.password.value).subscribe(res =>{
      if(res!=null && res.data!=null){
        userId = res.data
        console.log(userId);
        this.loginError='';
        localStorage.setItem('userId',userId.toString());
        this.router.navigate(['/dashboard'])

      }
      else{
        this.loginError = "User Not Found. Please Enter correct Details";
        console.log(this.loginError);
        
        
      }
    }, error =>{
      this.loginError = "User Not Found. Please Enter correct Details";
    })
    
  }

  signup(){
    this.router.navigate(['/sign-up'])
  }

}
