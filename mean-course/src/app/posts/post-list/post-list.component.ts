import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Post } from "../post";
import { PostService } from "../post.service";
import {Subscription} from 'rxjs';

@Component({
  selector:'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls:['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy{
  // posts = [
  //   {title:"First Post",content: 'This is the first Post\'s content'},
  //   {title:"Second Post",content: 'This is the Second Post\'s content'},
  //   {title:"Third Post",content: 'This is the Third Post\'s content'},
  //   {title:"Fourth Post",content: 'This is the Fourth Post\'s content'},
  // ]
  //@Input() posts:Post[] = []
  posts:Post[] = []
  private postSub :Subscription = new Subscription();
  constructor(private postService:PostService){}
  ngOnInit(){
    this.postService.getPostFromDb().subscribe(
      (data:any) => this.posts = data
    )
    this.postSub = this.postService.getPostUpdateListener().subscribe(
      (data:any) => {
        this.posts = data,
        console.log("This is post list",this.posts)
      },
      (err:any) => console.log(err)
    )
    this.postService.getPosts();
  }
  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

}
