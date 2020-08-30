import { PostsService } from './../posts.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from './../auth/auth.service';
import { AuthData } from '../auth/auth-data.model';
import { formatCurrency } from '@angular/common';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { name: 'first posts name', content: 'first posta content' },
  //   { name: 'second posts name', content: 'second posts content' },
  //   { name: 'third posta name', content: 'third posts content' },
  // ];
  posts: Post[] = [];
  isLoading = false;

 
  likeDisable = false ;
  disLikeDisable = false;
 
  likes = 0;
  dislikes = 0;

  users=[];
  form:FormGroup;
  likeanddis:string = "";
  totalPosts = 0;
  postsPerPage = 10;
  currentPage = 1;
  postId:string;
  userId: string;
  postsSizeOptions = [1, 2 , 5 ,10];
  userIsAuthenticated = false;
  private postsSub: Subscription;
  private authStatus : Subscription;
  constructor(public postsservice: PostsService, private authService: AuthService) {}

onDelete(postId:string){
  this.isLoading = true;
  this.postsservice.deletePost(postId).subscribe(()=>{
    this.postsservice.getPosts(this.postsPerPage, this.currentPage)
  }, () => {this.isLoading =false});
}

  ngOnInit(): void {
    this.isLoading=true;



    this.postsservice.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsservice.getUsers().subscribe(userData => {
     this.users = userData.user;
    })
    this.postsSub = this.postsservice
      .getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount:number}) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
     this.authStatus = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
this.userIsAuthenticated = isAuthenticated;
this.userId = this.authService.getUserId()
     })
  }
 

  // paginator
onChangePage(pageData: PageEvent){
  this.isLoading = true;
  this.currentPage = pageData.pageIndex +1;
  this.postsPerPage = pageData.pageSize;
  this.postsservice.getPosts(this.postsPerPage, this.currentPage);
}

like(postId:string){
  let likes = this.likes++;
  this.postsservice.like(this.likes);
  console.log(likes)
}
dislike(){
    this.dislikes++;
}

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatus.unsubscribe();
  }
  
}
