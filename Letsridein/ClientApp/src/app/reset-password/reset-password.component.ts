import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  radioValue;
  setValue(value)
  {
    this.radioValue = value;
  }
  ResetForm = new FormGroup({
    username: new FormControl('', Validators.required),
   
  })
  ResetKeyForm = new FormGroup({
    ResetKey: new FormControl('', Validators.required),

  })
  ResetPassForm = new FormGroup({
    Password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rePass: new FormControl('', Validators.required),
    Username: new FormControl('', Validators.required)

  }, { validators: this.passValidator })
  hide = true;
  usernameWrong = true;
  disableNextButton = true;
  keySent = false;
  resetKey;
  constructor(private userService: UserService, private translate: TranslateService, private notificationService: NotificationService)
  {
    translate.use(localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en');
  }
  get username() {
    return this.ResetForm.get('username') as FormControl;
  }
  get ResetKey() {
    return this.ResetKeyForm.get('ResetKey') as FormControl;
  }
  get Password() {
    return this.ResetPassForm.get('Password') as FormControl;
  }
  get rePass() {
    return this.ResetPassForm.get('rePass') as FormControl;
  }
  
  ngOnInit() {
  }
  ResetPass()
  {
    this.usernameWrong = true;
    this.userService.resetPassword(this.username.value, this.radioValue).subscribe(response => {
      
      this.disableNextButton = false;
      this.keySent = true;
      this.resetKey = response;
    }, error => {
      console.log(error)
      this.usernameWrong = false;
    });
  }
  pass = this.Password.value;
  passValidator(AC: AbstractControl) {
    let password = AC.get('Password').value; // to get value in input tag
    let confirmPassword = AC.get('rePass').value; // to get value in input tag
    if (password != confirmPassword) {

      AC.get('rePass').setErrors({
        "MatchPassword": true
      });

    } else {

      return null
    }

  }
  UpdatePassword()
  {
    this.ResetPassForm.setValue({
      Password: this.Password.value,

      rePass: this.rePass.value,
      Username: this.username.value
    });
    this.userService.updatePassword(this.ResetPassForm.value).subscribe(response => {

      this.notificationService.createNotificationService('success', 'Reset Success', 'Your Password has been updated');
      
    }, error => {
      var errormsg = error.error;
      console.log(error);
      this.notificationService.createNotificationService('error', 'Reset Failed', errormsg);
    });
  }
}
