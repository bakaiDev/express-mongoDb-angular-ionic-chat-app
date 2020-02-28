import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import * as  moment from 'moment';
import _ from 'lodash';

import {TokenService} from '../../services/token.service';
import {PostService} from '../../services/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts = [];
  socket: any;
  user: any;

  constructor(private postService: PostService,
              private tokenService: TokenService,
              private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.user = this.tokenService.getPayload();
    this.getAllPosts();
    this.socket.on('refreshPage', (data) => {
      this.getAllPosts();
    });
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data.posts;
    }, error => {
      if (error.error.token === null) {
        this.tokenService.deleteToken();
        this.router.navigate(['']);
      }
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  likePost(post) {
    this.postService.addLike(post).subscribe((data) => {
      this.socket.emit('refresh', {});
    }, error => {
      console.log(error);
    });
  }

  checkInLikeArray(arr, username) {
    // _.some from lodash
    return _.some(arr, {username});
  }

  openCommentsBox(post) {
    this.router.navigate(['post', post._id]);
  }
}
