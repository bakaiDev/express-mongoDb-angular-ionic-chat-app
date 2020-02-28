import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StreamsComponent} from '../components/steams/streams.component';
import {TokenService} from '../services/token.service';
import {ToolbarComponent} from '../components/toolbar/toolbar.component';
import { SideComponent } from '../components/side/side.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';
import {PostService} from '../services/post.service';
import {ReactiveFormsModule} from '@angular/forms';
import { CommentsComponent } from '../components/comments/comments.component';
import {RouterModule} from '@angular/router';
import { PeopleComponent } from '../components/people/people.component';



@NgModule({
  declarations: [StreamsComponent, ToolbarComponent, SideComponent, PostFormComponent, PostsComponent, CommentsComponent, PeopleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [StreamsComponent, ToolbarComponent],
  providers: [TokenService, PostService]
})
export class StreamsModule { }
