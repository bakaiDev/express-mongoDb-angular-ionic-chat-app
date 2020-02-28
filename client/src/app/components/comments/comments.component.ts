import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {ActivatedRoute} from '@angular/router';
import io from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  socket: any;
  commentForm: FormGroup;
  postId: any;
  commentsArray = [];
  post: string;

  constructor(private fb: FormBuilder,
              private postService: PostService,
              private route: ActivatedRoute) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.toolbarElement = document.querySelector('.nav-content');
    this.postId = this.route.snapshot.paramMap.get('id');
    this.init();
    this.getPost();

    this.socket.on('refreshPage', (data) => {
      this.getPost();
    });
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
      this.socket.emit('refresh', {});
      this.commentForm.reset();
    });
  }

  getPost() {
    this.postService.getPost(this.postId).subscribe((data) => {
      this.post = data.post.post;
      this.commentsArray = data.post.comments.reverse();
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }
}
