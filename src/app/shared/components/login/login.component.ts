import { TokenStorageService } from './../../services/token-storage.service';
import { RegistrationUsersService } from './../../services/registration-users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// for test token
// const staticToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg4ZTI3MDlkNTMxYzA2YTNkY2QzNWUiLCJ1c2VybmFtZSI6ImtyZWVtIHNlaWYgdWxkZWVuIiwicm9sZSI6ImFkbWluIiwiYWRtaW5UeXBlIjoib3duZXIiLCJpYXQiOjE2NTYxODg2NDgsImV4cCI6MTY1NjE5NTg0OH0.xGi_OLvlDwKgy_acEIvNqnxbY9XiQO5VQM73OW4yyxE"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  msgErrorLogin: string = ""

  constructor(private fb: FormBuilder, private RegistrationUsers: RegistrationUsersService,
    private TokenStorageService: TokenStorageService,
    private toastr: ToastrService , private router:Router) { }
  loginUser = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    choiceType: ['', Validators.required]
  })

  ngOnInit(): void {
  }

  loginUserSubmit() {
    // sysAdmin
    // sysRestaurant
    // call login service admin
    if (this.loginUser.value.choiceType === 'sysAdmin') {
      //  "username":"kreem seif uldeen",
      // "password" : "abd96abd9611"
      let username: string = this.loginUser.value.username as string;
      let password: string = this.loginUser.value.password as string

      this.RegistrationUsers.PostLoginAdmin(username, password).subscribe({
        next: (data) => {
          // Content-Type وX-Access-Token
          console.log(data.token);
          this.TokenStorageService.saveToken(data.token)
          this.TokenStorageService.saveAdmin(data.admin)
          this.RegistrationUsers.isAdmin$.next(true)
          this.RegistrationUsers.isLogin$.next(true)
          this.loginUser.reset()
          this.router.navigate(['captain-service'])
        },
        error: (err) => {
          this.toastr.error('كلمة المرور او اسم المستخدم غير صحيح', ' خطاء في تسجيل الدخول', {
            timeOut: 5000,
          });
          // this.msgErrorLogin = "اسم السمتخدم أو كلمة المرو غير صحيحة"
          this.loginUser.reset()
          console.log(err.error);
        }
      })
    } else {
      // login restaurant service
      let username: string = this.loginUser.value.username as string;
      let password: string = this.loginUser.value.password as string
      this.RegistrationUsers.PostLoginRestaurant(username, password).subscribe({
        next:(data)=>{
        console.log(data);
        this.TokenStorageService.saveToken(data.token)
        this.TokenStorageService.saveUser(data.restaurant)
        this.RegistrationUsers.isRestaurantAdmin$.next(true)
        this.RegistrationUsers.isLogin$.next(true)
        this.loginUser.reset()
        this.router.navigate(['restaurant-dashboard'])
        },
        error:(err)=>{
          this.toastr.error('كلمة المرور او اسم المستخدم غير صحيح', ' خطاء في تسجيل الدخول', {
            timeOut: 5000,
          });

          this.loginUser.reset()
          console.log(err.error);

        }
      })

    }


  }

}
