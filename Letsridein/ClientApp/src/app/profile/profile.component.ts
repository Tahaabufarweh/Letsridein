import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { RatingComponent } from '../rating/rating.component';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { CompleteProfileComponent } from '../complete-profile/complete-profile.component';
import { $ } from 'protractor';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { DataSource, ArrayDataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { User } from '../modelInterfaces';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingService } from '../services/rating.service';
import { Validators, FormControl, FormGroup} from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { ProfileService } from '../services/profile.service';
import { error } from 'util';
import { ReportComponent } from '../report/report.component';
enum PaymentMethod {
  Cash = 1,
  Visa = 2
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


/** profile component*/
export class ProfileComponent implements OnInit {
 
  displayedColumns = ['fullName', 'username', 'email', 'password'];  
  url = "https://cdn2.iconfinder.com/data/icons/business-management-52/96/Artboard_20-512.png";
  user = {} as any;
  user2 = {} as any;
 
  /** profile ctor */
  RatingDialogRef: MatDialogRef<RatingComponent>;
  ReportDialogRef: MatDialogRef<ReportComponent>;
  CompleteDialogRef: MatDialogRef<CompleteProfileComponent>;
  constructor(public dialog: MatDialog,
    private userService: UserService,
    public translate: TranslateService,
    public authService: AuthService,
    private router: ActivatedRoute,
    private route: Router,
   
    private profileService: ProfileService,
    private ratingService: RatingService,
    private notificationService: NotificationService) {
    this.authService.checkLogin();
    translate.use(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en');
  }

  ngOnInit() {
    this.router.params.subscribe(param => { 
      this.userService.getUserDetialsById(param.id).subscribe(response => {
      this.user = response;
      console.log(this.user);
    })
    })
  }
 
  
  getPaymentMethod(val) {
    return PaymentMethod[val].toString();
  }

  openRatingDialog()
  {
    this.RatingDialogRef = this.dialog.open(RatingComponent);
    this.RatingDialogRef.afterClosed().subscribe(data => this.fillTable(data));    
  }

  openReportDialog() {
    this.ReportDialogRef = this.dialog.open(ReportComponent);
    this.ReportDialogRef.afterClosed().subscribe(data => this.fillReport(data));
  }

  fillTable(rate = {} as FormGroup) {

    console.log(rate);
    
    this.ratingService.createRate(rate, Number(this.user.id)).subscribe(response => {

      this.notificationService.createNotificationService('success', 'Rating Success', 'Your rate has been sent');
      console.log("success");
    
    }, error => {
      console.log("failed");
     
    });
    
  }
  fillReport(report = {} as FormGroup) {

    console.log(report);
    console.log(this.user.id);
    this.profileService.createReport(report, Number(this.user.id)).subscribe(response => {

      this.notificationService.createNotificationService('success', 'Report Success', 'Your report has been sent');
      console.log("success");

    }, error => {
      console.log("failed");

    });

  }
  editProfileInfo(user) {

    console.log(user);
    console.log(this.user.id);
    this.userService.updateUserInfo(user).subscribe(response => {
      this.user = response;
      this.notificationService.createNotificationService('success', 'Update Success', 'Your Profile has been Updated Successfully');
      console.log("success");

    }, error => {
      console.log("failed");

    });

  }
  

  openCompleteDialog() {
    this.CompleteDialogRef = this.dialog.open(CompleteProfileComponent);
    this.CompleteDialogRef.afterClosed().subscribe(data => this.editProfileInfo(data));

  }
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result.toString();
        
      }
      this.saveUserPhoto(event.target.files[0]);

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  saveUserPhoto(file) {
    console.log(this.url)
    this.profileService.saveProfilePic(this.authService.getLoggedInUserId(), file).subscribe(response => {
      let user;
      this.notificationService.createNotificationService('success', 'Uploading Success', 'Profile picture uploaded successfully');
      user = response;
      this.user.profileImageName = user.profileImageName;
      console.log(this.user.profileImageName )
    }, error => {
        this.notificationService.createNotificationService('danger', 'Uploading Error!', 'Error in uploading your profile pic');


    });
  }
  

}


  
