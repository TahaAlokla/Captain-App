import { Route } from '@angular/router';
import { Injectable } from '@angular/core';
const TOKEN_KEY = 'X-Access-Token';
const Admin_KEY="auth-admin"
const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }


  signOut(): void {
    window.localStorage.clear();
  }
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  public saveIdRest(token: string): void {
    console.log(token);
    window.localStorage.removeItem('Id_Rest');
    window.localStorage.setItem('Id_Rest', token);
  }
  public getIdRest(): string  {
    return window.localStorage.getItem('Id_Rest');
  }
  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }


  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveAdmin(Admin: any): void {
    window.localStorage.removeItem(Admin_KEY);
    window.localStorage.setItem(Admin_KEY, JSON.stringify(Admin));
  }

//

  // get User
  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      JSON.parse(window.localStorage.getItem(USER_KEY));
      return JSON.parse(user);
    }
    return {};
  }

  // * get Admin
  public getAdmin(): any {
    const Admin = window.localStorage.getItem(Admin_KEY);
    if (Admin) {
      return JSON.parse(Admin);
    }
    return {};
  }

}
