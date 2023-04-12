import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { updateProfile } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(
    private login: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.login.logOut();
  }

  public regErr: boolean = false;

  public registerForm = this.fb.group({
    username: this.fb.control<string | null>(null, [
      Validators.required,
      Validators.min(4),
    ]),
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

  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get passwordCheck() {
    return this.registerForm.get('passwordCheck');
  }

  public attemptRegister(): void {
    if (this.registerForm.valid && this.password?.value === this.passwordCheck?.value) {
      this.login.register(this.email?.value!, this.password?.value!)
      .then((userCredential) => { 
        const user = userCredential.user;
        updateProfile(user, {displayName: this.username?.value})
        this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
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
