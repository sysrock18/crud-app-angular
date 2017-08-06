import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostFormComponent } from '../post-form/post-form.component';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalPosts: Post[] = [];
  shownPosts: Post[] = [];
  page:number = 1;
  size:number = 0;
  limit:number = 10;
  loader:boolean = false;
  msgResult:string = "There're no posts";

  constructor(private modalService: NgbModal, private postService: PostService) { }

  ngOnInit() {
    this.loader = true;
    this.postService.getPosts().subscribe(
      data => {
        this.totalPosts = data;
        this.shownPosts = this.totalPosts.slice((this.page-1)*(this.limit), this.limit*this.page);
        this.size = this.totalPosts.length;
      },
      err => {
        this.loader = false;
        this.msgResult = "Connection Error. Please Try again later."
      },
      () => {
        this.loader = false;
      }
    );
  }

  createPost() {
    this.modalService.open(PostFormComponent).result.then(
      (result:Post) => {
        alert('Post created!');
        this.totalPosts.unshift(result);
        this.size+=1;
        this.updatePostsList();
      },
      (reason) => {}
    );
  }

  updatePost(post:Post) {
    var index = this.totalPosts.findIndex(x=>x.id==post.id);
    if(index >= 0) {
      alert('Post updated!');
      this.totalPosts[index] = post;
      this.updatePostsList();
    }
  }

  deletePost(id:number) {
    var index = this.totalPosts.findIndex(x=>x.id==id);
    if(index >= 0) {
      alert('Post deleted!');
      this.totalPosts.splice(index, 1);
      this.size-=1;
      this.updatePostsList();
    }
  }

  showLoading(loading) {
    this.loader = loading;
  }

  updatePostsList() {
    this.shownPosts = this.totalPosts.slice((this.page-1)*(this.limit), this.limit*this.page);
  }

}
