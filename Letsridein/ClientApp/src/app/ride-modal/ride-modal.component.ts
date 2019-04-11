import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { MatDialogRef } from '@angular/material';



@Component({
  selector: 'app-ride-modal',
  templateUrl: './ride-modal.component.html',
  styleUrls: ['./ride-modal.component.css']
})
export class RideModalComponent implements OnInit {
  rideForm = new FormGroup({

    passengerId: new FormControl('', Validators.required),
    
    passengerNote: new FormControl(''),
    status: new FormControl('', Validators.required),
    paymentMethod: new FormControl('', Validators.required),
    
  })
  constructor(public translate: TranslateService,
    
    private router: ActivatedRoute,
    public auth: AuthService,
    private userService: UserService,
    private dialogRef: MatDialogRef<RideModalComponent>
  )
  {
    translate.use(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en');
 }

  ngOnInit() {
  }
  get passengerNote() {
    return this.rideForm.get('passengerNote') as FormControl;
  }
  createnewRide() {
    let date = new Date();
    this.rideForm.setValue({
      passengerId: Number(this.auth.getLoggedInUserId()),
      
      passengerNote: this.passengerNote.value,
      status:1,
      paymentMethod: 1,
      
  });
console.log(this.rideForm.value);
this.dialogRef.close(this.rideForm.value);
   
  }
}
