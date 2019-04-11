import { Component, OnInit, Input } from '@angular/core';
import { InternationalizationService } from './services/internationalization.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { interval, Subscription } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { DeviceDetectorService } from 'ngx-device-detector';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}


export const ROUTES: RouteInfo[] = [
  { path: '/new-trip', title:'New Trip', icon: 'directions_car', class: '' },
  { path: '/trips', title: 'Trips', icon: 'card_travel', class: '' },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  deviceInfo = null;
  isMobile;
  isDesktopDevice;
  epicFunction() {
    console.log('hello Home component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();    
    this.isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
            
    console.log(this.isDesktopDevice); // returns if the app is running on a Desktop browser.
  }
  menuItems: any[];
  public userNotifications : any = [];
  intervalId: number;
  @Input() themeColor = '';

  constructor(public translate: TranslateService,
    public authService: AuthService,
    private deviceService: DeviceDetectorService,
    private router: Router,
    private langService: InternationalizationService, private notificationService: NotificationService) {

    this.langService.getLanguage()
    this.authService.checkLogin();
    this.epicFunction();
  }
  
  isLoginOrSignUp() {
    if (this.router.url == "/register" || this.router.url == "/login") {
      return true;
    }
    return false;
  }
  ngOnInit() {
    this.getUserNotifications()
    const source = interval(1000 * 60);
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    source.subscribe(val => this.getUserNotifications());
  }
  
  setPrefLang(value) {
    this.langService.setLang(value)
  }
  getUserNotifications() {
    this.notificationService.getUserNotification(this.authService.getLoggedInUserId()).subscribe(response => {
      this.userNotifications = response;
      console.log(this.userNotifications)
    }, error => { console.log("failed") }
    )
  }
  navigateToTrip(link)
  {
    this.router.navigate(['/' + link]);
  }
  title = 'app';
  isRtl() {
    return this.langService.isRtl();
  }
  
}
