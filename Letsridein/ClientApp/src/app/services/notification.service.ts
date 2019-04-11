import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'api/Notifications/'
const getNotificationsRoute = 'GetNotifications/';
@Injectable()
export class NotificationService {

  constructor(private _notifications: NotificationsService, private http: HttpClient) {

  }

  getUserNotification(userId) {
    return this.http.get(baseUrl + getNotificationsRoute + userId);
  }

  createNotificationService(type  , title , content) {
   let notifyConfig = {
     timeOut: 5000,
     showProgressBar: true,
     pauseOnHover: true,
     clickToClose: true,
     animate: 'fromRight'
    }

    this._notifications.create(title, content, type, notifyConfig);
  }
}
