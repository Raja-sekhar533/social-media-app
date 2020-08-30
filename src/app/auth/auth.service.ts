import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Router } from '@angular/router'
import { AuthData } from './auth-data.model';
import { Subject, Observable, pipe } from "rxjs";

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { EmailValidator } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';



const BACKEND_URL = environment.apiUrl +"/user/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
private token: string;
private tokenTimer:any;
private userId : string;
private users : AuthData[] = [];
private AuthStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

  getToken(){
    return this.token;
  }
  getIsAuth(){
    return this.isAuthenticated;
  }
  
  getUserId(){
    return this.userId;
  }

getAuthStatusListener(){
  return this.AuthStatusListener.asObservable();
}


  createUser(image:File,name: string, email:string , password: string, mobile:string, gender:string, address:string){
    const authData = new FormData();

    authData.append("image",image,name);
    authData.append("name", name);
    authData.append("email", email);
    authData.append("password", password);
    authData.append("mobile", mobile);
    authData.append("gender", gender);
    authData.append("address", address);


    //  const authData = {imagePath:imagePath,id:null,name:name, email: email, password: password, mobile:mobile , gender:gender, address:address};
    
     return this.http.post(BACKEND_URL+"signup", authData).subscribe(()=>{
       this.router.navigate(['/'])
     }, error => {
       this.AuthStatusListener.next(false);
     })
  }



  login(email: string, password: string){
    const authData: AuthData = {imagePath:null,id:null, name: null,email: email, password: password,mobile:null, gender:null, address:null};
this.http.post<{token: string, expiresIn: number, userId: string}>(BACKEND_URL + "/login", authData)
.subscribe(response => {
  const token = response.token;
  this.token = token;
  if(token){
    const expiresInDuration = response.expiresIn;
    this.setAuthTimer(expiresInDuration);
    this.isAuthenticated = true
    this.userId = response.userId;
  this.AuthStatusListener.next(true);
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
    this.saveAuthData(token, expirationDate, this.userId);
  this.router.navigate(['/']);
  }
}, error => { 
  this.AuthStatusListener.next(false);
})
  }
  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return ;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.AuthStatusListener.next(true);
    }
;  }
  logout(){
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.AuthStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
    
  }
private setAuthTimer(duration: number)
{

  this.tokenTimer = setTimeout(()=>{
    this.logout();
  }, duration * 1000)
}
  private saveAuthData(token:string, expirationDate:Date, userId: string){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration', expirationDate.toString());
    localStorage.setItem('userId', userId)
  }
  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }
  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if(!token || !expirationDate){
      return;
    }
    return {
      token : token,
      expirationDate: new Date(expirationDate),
      userId: userId

    }
  }

  getUser(id:string){
     return this.http.get<{message:string,user:AuthData[]
    }>(BACKEND_URL + id)

    // <{_id:string, name:string, email:string, password:string, mobile:number, gender:string, address:string}

  
  }
  getUsers(){
    return this.http.get<{message:string,user:AuthData[]
   }>(BACKEND_URL )

   // <{_id:string, name:string, email:string, password:string, mobile:number, gender:string, address:string}

 
 }
}
