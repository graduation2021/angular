import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerError: string;
  emailError: string;
  captchaError: string
  passwordError: string;
  usernameError: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.initForm();
  }

  // tslint:disable-next-line:typedef
  initForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required,
        Validators.pattern('^.{4,}')]),
      password: new FormControl('', [Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      recaptcha: new FormControl('', [Validators.required])
    });
  }

  // tslint:disable-next-line:typedef
  registerProcess() {
    if(this.registerForm.controls.email.invalid){
      this.emailError = 'Nieprawidłowy e-mail';
    }
    else this.passwordError = null;
    if(this.registerForm.controls.password.invalid){
      this.passwordError = 'Nieprawidłowe hasło\nHasło musi zawierać\nCo najmniej jedną wielką litere\nCo najmniej jedną małą litere\nCo najmniej jedną cyfre\nCo najmniej 8 znaków';
    }
    else this.passwordError = null;
    if(this.registerForm.controls.recaptcha.invalid){
      this.captchaError = 'Zatwierdź captcha';
    }
    else this.captchaError = null;
    if(this.registerForm.controls.username.invalid)
      this.usernameError = 'Nieprawidłowa nazwa użytkownika';
    else this.usernameError = null;
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        result => {
          this.router.navigate(['login']);
        },
        error => {
          this.registerError = error['error'];
          this.emailError = null;
          this.captchaError = null;
        });
    }
  }
}
