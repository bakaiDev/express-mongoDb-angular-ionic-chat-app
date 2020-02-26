import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  signupUser() {
    console.log(this.signupForm.value);
    this.authService.registerUser('test').subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
