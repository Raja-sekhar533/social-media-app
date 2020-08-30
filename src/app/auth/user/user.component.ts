import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { AuthService } from './../auth.service';

import { Subscription, Observable } from 'rxjs';
import { AuthData } from './../auth-data.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user:AuthData[]=[];
  id :string;
  _id:string;
  imagePath:string;
  name:string;
  email:string;
  gender:string;
  mobile:number;
  address:string;
  isLoading =false;


private authStatus : Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit():void {
    this.id = this.authService.getUserId();
    this.authService.getUser(this.id).subscribe((userData)=>{
       this.user = userData.user;
       
       
      console.log(userData.user);
    
    })
    // this.users = this.authService.getUsers();
    

  }
  
}
