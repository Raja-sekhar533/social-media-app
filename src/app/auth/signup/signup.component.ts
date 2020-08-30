import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../auth.service';

import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { mimeType } from './../../post-create/mime-type.validator';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

isLoading = false;
private userId : string;
hide = true;
imagePreview:string
form:FormGroup;


private authStatusSub: Subscription
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
this.authStatusSub = this.authService.getAuthStatusListener().subscribe();
this.form = new FormGroup({

  image: new FormControl(null, {validators:[Validators.required], asyncValidators:[mimeType]}),

  name: new FormControl(null,{ validators: [Validators.required]}),
  
  email: new FormControl(null, {validators: [Validators.required]}),

  password: new FormControl(null, {validators: [Validators.required]}),

  mobile: new FormControl(null, {validators: [Validators.required]}),

  gender: new FormControl(null, {validators: [Validators.required]}),

  address: new FormControl(null, {validators: [Validators.required]}),



})
  }

  onSignup(){
    if(this.form.invalid){
      return;
    }
    this.isLoading = false;
    
    this.authService.createUser(this.form.value.image,this.form.value.name,this.form.value.email, this.form.value.password ,this.form.value.mobile, this.form.value.gender, this.form.value.address);

  }
  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () =>{
    this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  
ngOnDestroy(){
  this.authStatusSub.unsubscribe();
}
  }