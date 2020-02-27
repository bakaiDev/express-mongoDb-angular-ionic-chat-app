import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  loginUser() {
    this.showSpinner = true;
    this.authService.loginUser(this.loginForm.value).subscribe(data => {
      console.log(data);
      this.loginForm.reset();
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
