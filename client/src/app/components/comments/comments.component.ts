import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  toolbarElement: any;

  constructor() { }

  ngOnInit(): void {
    this.toolbarElement = document.querySelector('.nav-content');
  }

  ngAfterViewInit(): void {
    this.toolbarElement.style.display = 'none';
  }

}
