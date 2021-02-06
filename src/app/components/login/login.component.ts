import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string
  constructor(private authService: AuthService, private router: Router) { }

  // tslint:disable-next-line:typedef
  ngOnInit(){
    // tslint:disable-next-line:no-unused-expression
    this.initForm();
  }

  // tslint:disable-next-line:typedef
  initForm(){
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  // tslint:disable-next-line:typedef
  loginProcess(){
    if (this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe(
        result => {
          localStorage.setItem('token', 'Bearer ' + result['token']);
          localStorage.setItem('username', result['username']);
          localStorage.setItem('roles', result['roles']);
          this.router.navigate(['tools'], {skipLocationChange: true});
      },
      error => {
          this.loginError = error['error']['message'];
        }
      );
    }
  }
}
