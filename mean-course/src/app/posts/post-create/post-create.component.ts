import { getLocaleDateFormat } from "@angular/common";
import { Component,EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from "../post.service";

@Component({
  templateUrl:'./post-create.component.html',
  selector:'app-post-create',
  styleUrls:['./post-create.component.css']
})
export class PostCreateComponent{
  enteredContent = ""
  enteredTitle = ""
  //@Output() postCreated:EventEmitter<Post> = new EventEmitter<Post>();
  constructor(private postService:PostService){}
  onAddPost(postForm:NgForm){
    if(postForm.invalid){
      return;
    }
    this.addPost(postForm).then(this.getPost());
  }

  addPost(postForm:any):any{
    return new Promise((resolve,reject) =>{
      this.postService.addPost(postForm.value.title,postForm.value.content).subscribe(
        (data:any) =>{console.log(data)},
        (err:any) =>{console.log(err)},
      )

      postForm.reset();
    })
  }
    getPost(){
      setTimeout(() => {
        this.postService.getPosts().subscribe(
          (data:any) =>console.log("dummy")
        )
      }, 400);

    // const post:Post = {
    //   title:postForm.value.title,
    //   content:postForm.value.content
    // }
    // this.postCreated.emit(post)
    console.log("This is called")
  }
}
