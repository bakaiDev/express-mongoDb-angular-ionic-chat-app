import { Component, OnInit } from '@angular/core';
import * as  moment from 'moment';

import {PostService} from '../../services/post.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts = [];
  socket: any;

  constructor(private postService: PostService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.getAllPosts();
    this.socket.on('refreshPage', (data) => {
      this.getAllPosts();
    });
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data.posts;
      console.log(this.posts);
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  likePost(post) {
    this.postService.addLike(post).subscribe((data) => {
      console.log(data);
      this.socket.emit('refresh', {});
    }, error => {
      console.log(error);
    });
  }
}
