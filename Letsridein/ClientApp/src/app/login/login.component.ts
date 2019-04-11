import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { InternationalizationService } from '../services/internationalization.service';
import { TranslateService } from '@ngx-translate/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotificationsService } from 'angular2-notifications';
import { NotificationService } from '../services/notification.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
/** login component*/
export class LoginComponent {
  
    /** login ctor */
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(public translate: TranslateService,
              private userService: UserService,
              private socialAuthService: AuthService,
    private router: Router,
    private notificationService: NotificationService 
             ) {
 
    translate.use(localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en');
   
  }
  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        localStorage.setItem('login', JSON.stringify(userData))
        // Now sign-in with userData
        // ...

      }
    );
  }
  ngOnInit() {


  }

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }



  login() {
    this.userService.login(this.loginForm.value).subscribe(response => {
      let token = (<any>response).token;
      localStorage.setItem("jwt", token);
      console.log(token)
      this.router.navigate(["/"]);
    }, error => {
        this.notificationService.createNotificationService('error', 'Login Failed', 'Username or password is wrong');
    });

   
  }
  navigateToReset()
  {
    this.router.navigate(["/resetPassword"]);
  }
}
