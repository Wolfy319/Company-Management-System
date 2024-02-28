import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService) {
  }

  loginForm: FormGroup = new FormGroup({
    // Validates that email follows example@example.com pattern
    email: new FormControl<string>('', [Validators.pattern('[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}'), Validators.maxLength(30), Validators.minLength(6), Validators.required]),
    password: new FormControl<string>('', [Validators.minLength(6), Validators.required])
  })

  email = this.loginForm.controls['email']
  password = this.loginForm.controls['password']

  ngOnInit(): void {
    // FOR TESTING, REMOVE ONCE AUTHENTICATION WORKS
    localStorage.setItem('authenticated', 'true')

    // Logout user when routing to login page
    // localStorage.clear()
  }
  
  signIn = () => {
    this.loginService.authenticate(this.email.value, this.password.value)
    .then((user: any) => {
      // Store user data and whether admin privileges are active in localstorage
      localStorage.setItem('admin', user.isAdmin.toString())
      localStorage.setItem('user', JSON.stringify(user))
    })
    .catch((err) => console.log(err))
  }
}