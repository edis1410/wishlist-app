import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  constructor(
    private login: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.login.logOut();
  }

  public logErr: boolean = false;

  public loginForm = this.fb.group({
    email: this.fb.control<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    password: this.fb.control<string>('', [
      Validators.required,
      Validators.min(6),
    ]),
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  public attemptLogin(): void {
    if (this.loginForm.valid) {
      this.login.loginTry(this.email?.value!, this.password?.value!).then(
        () => this.onSuccess(),
        () => this.onFail()
      );
    } else {
      console.log('Handle errors');
    }
  }

  public onSuccess(): void {
    this.router.navigate(['dashboard']);
  }

  public onFail(): void {
    this.logErr = true;
  }
}
