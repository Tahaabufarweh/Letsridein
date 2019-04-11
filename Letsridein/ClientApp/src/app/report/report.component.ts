import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportForm = new FormGroup({

    userId: new FormControl('', Validators.required),

    
    note: new FormControl('', Validators.required),
    
  })
  constructor(public translate: TranslateService,

    private router: ActivatedRoute,
    private auth: AuthService,
    private userService: UserService,
    private dialogRef: MatDialogRef<ReportComponent>)
  {
      translate.use(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en');
  }

  get note() {
    return this.reportForm.get('note') as FormControl;
  }

  createnewReport() {

    this.reportForm.setValue({
      userId: Number(this.auth.getLoggedInUserId()),

      note: this.note.value,
      
    });
    console.log(this.reportForm.value);
    this.dialogRef.close(this.reportForm.value);

  }
  ngOnInit() {
  }

}
