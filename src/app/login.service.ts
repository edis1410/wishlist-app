import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  signOut,
  User,
  user,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public email: string = "";
  public loggedIn: boolean = false;

  constructor(private auth: Auth, public router: Router, public jwtHelper: JwtHelperService,) {
    this.user$ = user(this.auth);
    onAuthStateChanged(this.auth, (user) => {
      if(user){
        this.loggedIn = true;
        this.email = user.email!
      }
      else{
        this.loggedIn = false;
      }
    })
  }
  private user$: Observable<User | null>;

  public loginTry(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  public logOut(): Promise<void> {
    return signOut(this.auth);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(map((user: User | null) => user !== null));
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    console.log(token);
    return !this.jwtHelper.isTokenExpired(token);
  }

  public register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}
