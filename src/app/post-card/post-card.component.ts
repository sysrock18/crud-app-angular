import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../shared/post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostFormComponent } from '../post-form/post-form.component';
import { Post } from '../shared/post';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() dataPost: Post;
  @Output() getPostUpdated: EventEmitter<Post> = new EventEmitter();
  @Output() getPostDeleted: EventEmitter<number> = new EventEmitter();
  @Output() loading: EventEmitter<boolean> = new EventEmitter();
  disableButtons: boolean = false;

  constructor(private modalService: NgbModal, private postService: PostService) { }

  ngOnInit() {
  }

  updatePost() {
    var modalRef = this.modalService.open(PostFormComponent);
    modalRef.componentInstance.post = this.dataPost;
    modalRef.componentInstance.update = true;
    modalRef.result.then(
      (result:Post) => {
        this.getPostUpdated.emit(result);
      },
      (reason) => {}
    );
  }

  deletePost() {
    var deleted = confirm("Do you want to delete this post?");

    if(deleted) {
      this.disableButtons = true;
      this.loading.emit(true);
      this.postService.deletePost(this.dataPost.id).subscribe(
        data => {
          this.getPostDeleted.emit(this.dataPost.id);
        },
        err => {
          alert("Post not deleted. Try again");
          this.disableButtons = false;
          this.loading.emit(false);
        },
        () => {
          this.disableButtons = false;
          this.loading.emit(false);
        }
      );
    }
  }

}
