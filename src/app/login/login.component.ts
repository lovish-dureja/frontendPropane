import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  loadingLogin = false;
  login = { name: "", pincode: ""}
  formError = {}
  constructor(private userService: UserService,
     private commonService: CommonService,
     private authService: ApiService,
       private router: Router,) { }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      'name': new FormControl(null, [
        Validators.required, Validators.email
      ]),
      'pincode': new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  /*
  * @name handleForm
  * @param Form
  * @description handle form                       
  * @return none
  */
  handleForm(loginForm) {
    console.log(loginForm, 'here I am ')
      this.loadingLogin = true;
      this.userService.login(loginForm.value).subscribe(
        (response) => {
          this.loadingLogin = false;
          try {
            console.log(response, '----here is the response');
            //this.commonService.showSnakeBar(response.message);
            this.loginForm.reset();
            this.formError = {};
            this.authService.setToken(response['data']['authToken']);
            this.authService.setUserData(response['data']);
            if (response['data']['role'] == 1) {
              setTimeout(() => {
                location.href = '/admin/dashboard';
              }, 5)
            } else {
              setTimeout(() => {
                //location.reload();
                this.router.navigate(['get-started']);
              }, 5)
            }
          } catch (e) {

          }
        },
        (err) => {
          let response = err.json();
          this.loadingLogin = false;
          if (response.message) {
            // this.handleServerFormError(response.errors)
            // this.commonService.showSnakeBar(response.message);
          } else {
            // this.commonService.commonSnakeBar();
          }
        },
        () => { }
      );
  }
}
