import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/post';

@Component({
  selector: 'app-post-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  @Input() post:Post;
  @Input() update:boolean = false;
  postForm: FormGroup;
  submitAttempt: boolean = false;
  loader: boolean = false;
  updateTitle:string = 'Update Post';
  createTitle:string = 'Create Post';

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: [this.post ? this.post.title : '', Validators.required],
      body: [this.post ? this.post.body : '', Validators.required]
    });
  }

  save() {
    this.submitAttempt = true;

    if(this.postForm.valid) {
      if(this.update) {
        this.updatePost();
      } else {
        this.createPost();
      }
    }
  }

  createPost() {
    this.loader = true;
    this.postForm.value.userId = 1;
    this.postService.addPost(this.postForm.value).subscribe(
      data => {
        this.activeModal.close(data);
      },
      err => {
        this.activeModal.dismiss();
        alert("Error creating the post. Try again");
      },
      () => {
        this.loader = false;
      }
    );
  }

  updatePost() {
    this.loader = true;
    this.postForm.value.id = this.post.id;
    this.postForm.value.userId = this.post.userId;

    this.postService.updatePost(this.postForm.value).subscribe(
      data => {
        this.activeModal.close(data);
      },
      err => {
        this.activeModal.dismiss();
        alert("Error updating the post. Try again");
      },
      () => {
        this.loader = false;
      }
    );
  }

  close() {
    this.activeModal.dismiss();
  }

}
