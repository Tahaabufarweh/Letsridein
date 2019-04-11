import { Component, Input, OnInit } from '@angular/core';
import { TripDetailsComponent } from '../trip-details/trip-details.component';
import { TranslateService } from '@ngx-translate/core';
import { TripRequestService } from '../services/trip-request.service';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'util';

@Component({
    selector: 'app-trip-owner-details',
    templateUrl: './trip-owner-details.component.html',
    styleUrls: ['./trip-owner-details.component.scss']
})
/** trip-owner-details component*/
export class TripOwnerDetailsComponent implements OnInit {
  @Input() requests;
  public tripRequests;
  public newRequests;
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
    this.tripRequests = this.requests.tripRequest;
    console.log(this.requests.tripRequest)
  }
  status: any;
  public show_dialog: boolean = true;
  acceptOrReject(requestId, status)
  {
    console.log(requestId);
    this.requestService.AcceptOrApproveRequest(requestId, status).subscribe(response => {
      this.show_dialog = !this.show_dialog;
      this.tripRequests = response;


      
      console.log("success", this.tripRequests)
    }, error => {
      console.log(error)
      });
  }
  
}
