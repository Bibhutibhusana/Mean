
import { Injectable } from "@angular/core";
import { Post } from "./post";
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PostService{
  private posts:Post[] = [];
  baseUrl = "http://localhost:3000/api"
  private postUpdated = new Subject<Post[]>();
  private dumm : Observable<Object> = new Observable<Object>();
  constructor(private http:HttpClient){}
  getPosts():any{
    this.getPostFromDb().subscribe(
      (data:any) => {this.posts = data
        this.postUpdated.next([...this.posts])
      },
      (err : any) => console.log(err)
    )

    return this.dumm;
  }
  getPostFromDb():any{
    let post = this.http.get(`${this.baseUrl}/get`)
    return post;
  }
  defaultPosts():Observable<Object>{
    this.getPosts().subscribe();
    return this.dumm;
  }
  getPostUpdateListener(){
    return this.postUpdated.asObservable();
  }

  addPost(title:string,content:string):any{
    const post:Post = {
      title:title,
      content:content
    }

    //this.postUpdated.next(this.getPosts())
    let posts =  this.http.post(`${this.baseUrl}/add`,post)
    return posts;
    // this.posts.push(post);
    // this.postUpdated.next([...this.posts])
    // console.log(this.postUpdated)
  }
}
