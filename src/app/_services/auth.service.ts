import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  base1Url = environment.apiUrl;

  // userLogin = new BehaviorSubject<User>();
  // currentPhotoUrl = this.photoUrl.asObservable();

  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  avatar = new BehaviorSubject<string>('');
  currentAvatar = this.avatar.asObservable();

constructor(private http: HttpClient) { }

chooseAvatar(avatar: string){
  this.avatar.next(avatar);
}

changeMemberPhoto(photoUrl: string){
  this.photoUrl.next(photoUrl);
}

checkEmailExists(email: string) {
  return this.http.get(this.baseUrl + 'emailexists?email=' + email);
}

login(model: any){
  return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
      // Store the token locally
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
}

getUser(id: number) {
  return this.http.get(this.base1Url + 'users/userInfo/' + id);
}

register(user: User) {
  return this.http.post(this.baseUrl + 'register', user);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}

