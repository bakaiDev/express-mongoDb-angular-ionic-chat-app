import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  commentForm: FormGroup;
  postId: any;
  commentsArray = [];

  constructor(private fb: FormBuilder,
              private postService: PostService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.toolbarElement = document.querySelector('.nav-content');
    this.postId = this.route.snapshot.paramMap.get('id');
    this.init();
    this.getPost();
  }

  init() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.toolbarElement.style.display = 'none';
  }

  addComment() {
    this.postService.addComment(this.postId, this.commentForm.value).subscribe((data) => {
      console.log(data);
      this.commentForm.reset();
    });
  }

  getPost() {
    this.postService.getPost(this.postId).subscribe((data) => {
      console.log(data);
      this.commentsArray = data.post.comments;
    });
  }
}
