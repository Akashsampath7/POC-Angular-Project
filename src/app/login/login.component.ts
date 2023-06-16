import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, Roles } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userRole: string;
  role: string;
  fullname: string;
  password: string;
  errorMessage: string;
  loggedInUser: string;
  adminPhotoUrl: SafeResourceUrl;
  
  public loginForm !: FormGroup
  apiService: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private api: ApiService, private authService: AuthService, private sanitizer: DomSanitizer) { 
    const imagePath = 'assets/loginn-logo.png';
    this.adminPhotoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    });
  }
  login(){
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      const response=res.find((user)=>
        user.fullname === this.fullname && user.password === btoa(this.password) 
      );
      console.log(response);
     
      if(response){
        console.log(response);
        sessionStorage.setItem('userRole', response.role);
        if(response.role === 'admin'){
        this.router.navigate(['/author']);
        alert("Logged in as admin");
      } 
      else if (response.role === 'teacher'){
        this.router.navigate(['/dashboard']);
        alert("Logged in as teacher");
      } 
      else if (response.role === 'student'){
        this.router.navigate(['/dashboard']);
        alert("Logged in as student");
      } else {
        console.log('Invalid credentials');
        alert("user not found!!");
        this.loginForm.reset();
      }}
      else{
        alert("Invalid User")
      }
      
  })
  }
}