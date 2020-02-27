import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string;
  showSpinner = false;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router
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
    this.showSpinner = true;
    this.authService.registerUser(this.signupForm.value).subscribe(data => {
      console.log(data);
      this.signupForm.reset();
      setTimeout(() => {
        this.router.navigate(['streams']);
      }, 2000);
    }, error => {
      this.showSpinner = false;
      if (error.error.msg) {
        this.errorMessage = error.error.msg[0].message;
      }
      if (error.error.message) {
        this.errorMessage = error.error.message;
      }
    });
  }
}
