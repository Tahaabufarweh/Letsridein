import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RatingService } from '../services/rating.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
/** rating component*/
export class RatingComponent {
  notificationService: any;
  ratingForm = new FormGroup({

    rating1: new FormControl('', Validators.required),
    note: new FormControl(''),
    userID: new FormControl('', Validators.required),
    
  })
  ratingValue: any;
  user = {} as any;
  constructor(public translate: TranslateService,
    private ratingService: RatingService,
    private router: ActivatedRoute,
    public auth: AuthService,
    private userService: UserService,
    private dialogRef: MatDialogRef<RatingComponent>
  ) {

    translate.use(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en');

  }
  ngOnInit() {
    
  }


  get note() {
    return this.ratingForm.get('note') as FormControl;
  }
  get userId() {
    return this.ratingForm.get('userId') as FormControl;
  }
  get rating1() {
    return this.ratingForm.get('rating1') as FormControl;
  }
  get ratedUser() {
    return this.ratingForm.get('ratedUser') as FormControl;
  }

  
  CreateNewRate() {
    this.ratingForm.setValue({
      userID: Number(this.auth.getLoggedInUserId()),
      rating1: this.ratingValue,
      
      note: this.note.value
    });
    console.log(this.ratingForm.value);
    this.dialogRef.close(this.ratingForm.value);
    //this.ratingService.createRate(this.ratingForm.value).subscribe(response => {

    //  this.notificationService.createNotificationService('success', 'Rating Success', 'Your rate has been sent');
    //  console.log("success");
    //  //this.router.navigate(["/"]);


    //}, error => {
    //  console.log("failed");
    // // this.notificationService.createNotificationService('error', 'Signup Failed', 'Check Your Fields');
    //});
  }
  
  setradio(st)
  {
    this.ratingValue = st;
    
    return this.ratingValue;
    
  }
  
}
