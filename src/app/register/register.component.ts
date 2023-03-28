import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private login: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  public regErr: boolean = false;

  public loginForm = this.fb.group({
    email: this.fb.control<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    password: this.fb.control<string>('', [
      Validators.required,
      Validators.min(6),
    ]),
    passwordCheck: this.fb.control<string>('', [
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
  get passwordCheck() {
    return this.loginForm.get('passwordCheck');
  }

  public attemptRegister(): void {
    if (this.loginForm.valid && this.password?.value === this.passwordCheck?.value) {
      this.login.register(this.email?.value!, this.password?.value!).then(
        () => this.onSuccess(),
        () => this.onFail()
      );
    } else {
      console.log('Passwords do not match');
    }
  }

  public onSuccess(): void {
    this.router.navigate(['dashboard']);
  }

  public onFail(): void {
    this.regErr = true;
  }
}
