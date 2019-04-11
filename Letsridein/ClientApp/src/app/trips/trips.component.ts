import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, PageEvent } from '@angular/material';
import { FilteringComponent } from '../filtering/filtering.component';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isNullOrUndefined, error } from 'util';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { TripsService } from '../services/trips.service';
import { RideModalComponent } from '../ride-modal/ride-modal.component';
import { TripRequestService } from '../services/trip-request.service';
import { FormGroup } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { AdminService } from '../services/admin.service';

@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss']
})
/** trips component*/
export class TripsComponent implements OnInit {

  public allTrips;
  public filter;
  public ads;
  RideDialogRef: MatDialogRef<RideModalComponent>;
    /** trips ctor */
  fileNameDialogRef: MatDialogRef<FilteringComponent>;

  constructor(
    public dialog: MatDialog,
    private tripsService: TripsService,
    public translate: TranslateService,
    public authService: AuthService,
    private router: Router,
    private rideService: TripRequestService,
    private notificationService: NotificationService,
    private adminService: AdminService)
  {
    translate.use(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en');

    this.authService.checkLogin();
  }


  ngOnInit() {
    this.fillTable({}, 1, 10);
    this.getAllAds();
  }

  public getAllAds() {
    this.adminService.getAds().subscribe(response => {
      this.ads = response;

      console.log(response);

    }, error => {
      console.log("failed");
    })
  }
  fillTable(filter = {} as any, pageNo , pageSize) {
    this.tripsService.getAllTrips(filter, pageNo, pageSize).subscribe(response => {
      this.allTrips = response;
    }, error => {
      console.log(error)
      })

   
  }

  navigateToDetails(id)
  {
    this.router.navigate(["/trip-details/" + id]);
  }
  openRideDialog(id) {
    this.RideDialogRef = this.dialog.open(RideModalComponent);
    this.RideDialogRef.afterClosed().subscribe(data => this.fillRide(data, id));
  }
  fillRide(ride = {} as FormGroup ,tripid) {

    console.log(ride);

    this.rideService.createRate(ride, Number(tripid)).subscribe(response => {

      this.notificationService.createNotificationService('success', 'Request Success', 'Your request has been sent');
      console.log("success");

    }, error => {
      console.log("failed");

    });

  }


  onPageChanged(page: PageEvent) {
    console.log(page);
    this.fillTable({}, page.pageIndex + 1, page.pageSize)
  }


  openDialog() {
    this.fileNameDialogRef = this.dialog.open(FilteringComponent);
    this.fileNameDialogRef.afterClosed().subscribe(
      data => this.fillTable(data , 1 , 10)
    );    
  }
    
}
