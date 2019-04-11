import { Component, Input, OnInit } from '@angular/core';
import { TripDetailsComponent } from '../trip-details/trip-details.component';
import { TranslateService } from '@ngx-translate/core';
import { TripRequestService } from '../services/trip-request.service';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-trip-requester-details',
    templateUrl: './trip-requester-details.component.html',
    styleUrls: ['./trip-requester-details.component.scss']
})
/** trip-requester-details component*/
export class TripRequesterDetailsComponent {
  @Input() requests;
  public tripRequests;

  /** trip-owner-details ctor */
  constructor(private userService: UserService,
    public translate: TranslateService,
    public authService: AuthService,
    private router: ActivatedRoute,
    private route: Router,
    private requestService: TripRequestService,
    private notificationService: NotificationService) {

  }
  ngOnInit() {
    this.tripRequests = this.requests;
    console.log(this.requests)
  }

  deleteRequest(requestId, status) {
    console.log(requestId);
    this.requestService.deleteRequest(requestId).subscribe(response => {

      this.tripRequests = Array(response);
      console.log("success")
     
    }, error => {
      console.log("failed")
    });;
  }
}
