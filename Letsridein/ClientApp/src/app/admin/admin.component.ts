import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TripsService } from '../services/trips.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { PageEvent, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material';
import { AdminService } from '../services/admin.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from 'selenium-webdriver/http';
import { User } from '../modelInterfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { AdsDialogComponent } from '../ads-dialog/ads-dialog.component';
import { NotificationService } from '../services/notification.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
/** admin component*/
export class AdminComponent {
  /** admin ctor */

 
  public allTrips;
  public all;
  public allUsers;
  public users;
  public allReports;
  public totalReports;
  public reports;
  public ads;
  totalusers;
  filter = new FormControl("");
  constructor(public authService: AuthService,
    private tripsService: TripsService,
    public translate: TranslateService,
    public userService: UserService,
    public adminService: AdminService,
    private router: Router,
    private notificationService:NotificationService,
    public dialog: MatDialog,) {
      this.authService.checkLogin();
  }
  ngOnInit() {
    this.getAlltrips({}, 1, 5);
    
    this.getAllUsers(this.filter.value, 1, 5);
    this.getAllreports(1, 5);
    this.getAllAds();
  }
  

  public getAlltrips(filter = {} as any, pageNo, pageSize) {
    this.tripsService.getAllTrips(filter, pageNo, pageSize).subscribe(response => {
      this.all = response;
      this.allTrips = this.all.trips;
      console.log(this.allTrips);

    }, error => {
      console.log(error)
    })
  }

  public DeleteAd(id) {
    this.adminService.deleteAd(id).subscribe(response => {
      this.notificationService.createNotificationService('success', 'Ad Removed', 'Your Advertisement has been deleted');

      this.ads = this.getAllAds();
     
    }, error => {
      console.log(error)
    })
  }

  public getAllAds() {
    this.adminService.getAds().subscribe(response => {
      this.ads = response;

      console.log(this.ads);

    }, error => {
      console.log("failed");
    })
  }
  AdsDialogRef: MatDialogRef<AdsDialogComponent>;
  openAdsDialog() {
    this.AdsDialogRef = this.dialog.open(AdsDialogComponent);
    this.AdsDialogRef.afterClosed().subscribe(data => this.fillAd(data));
  }
  fillAd(AD) {

    console.log("bla bla",AD);

    this.adminService.CreateAd(AD.AdvLink, AD.ImageName).subscribe(response => {

      this.notificationService.createNotificationService('success', 'Ad Success', 'Your Advertisement has been published');
      console.log("success");
      this.ads = this.getAllAds();
    }, error => {
      console.log("failed");

    });
  }
  public getAllreports(pageNo, pageSize) {
    this.adminService.getReports(pageNo, pageSize).subscribe(response => {
      this.allReports = response;
      this.reports = this.allReports.reports;
      this.totalReports = this.allReports.totalReports;
      console.log(this.allReports);
      console.log(this.totalReports);
    }, error => {
      console.log("failed")
    })
  }
  public reportUsers;
  public reportUsername;
  public getUserById(id) {
    return this.userService.getUserById(id).subscribe(response => {
      this.reportUsers = response;
     this.reportUsername = this.reportUsers.username;
     console.log(this.reportUsername);
      return this.reportUsername;
      })
  }
  
 
 
  public getAllUsers(filter,pageno, pagesize) {
    this.userService.getUsers(filter,pageno, pagesize).subscribe(res => {
      this.allUsers = res;
      this.users = this.allUsers.users;
      this.totalusers = this.allUsers.totalUsers;
      console.log(this.totalusers);
      console.log(this.users);

   
    }), error => {
      console.log("failedd");
      }

  }
  onPageChanged(page: PageEvent) {
    console.log(page);
    this.getAllUsers(this.filter.value, page.pageIndex + 1, page.pageSize)
  }

  tripsPageChanged(page: PageEvent) {
    console.log(page);
    this.getAlltrips({}, page.pageIndex + 1, page.pageSize)
  }

  reportsPageChanged(page: PageEvent) {
    console.log(page);
    this.getAllreports(page.pageIndex + 1, page.pageSize)
  }
  
  
  applyUserFilter(filterValue: string) {
    
    this.getAllUsers(filterValue.trim().toLowerCase(),1,2);
    
  }

 
  
}


