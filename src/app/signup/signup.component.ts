import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  mobile: any;
  public signupForm!: FormGroup;
  myForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
  });

  get password() {
    return this.myForm.get('password');
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router:Router){ }

  ngOnInit(): void{
    this.signupForm = this.formBuilder.group({
      fullname:[''],
      role:[''],
      email:[''],
      password:[''],
      mobile:['']
    })
  }
  signUp(){
    this.signupForm.value.password = btoa(this.signupForm.value.password)
    this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
    .subscribe(res=>{
      alert("Signup Sucessfull");
      this.signupForm.reset();
      this.router.navigate(['login']);
    },err=>{
      alert("Something went wrong")
    })
  }
  get isPhoneNumberValid(): boolean {
    return this.mobile && this.mobile.length === 10;
  }
}
