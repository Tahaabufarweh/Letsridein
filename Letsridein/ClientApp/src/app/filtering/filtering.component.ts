import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css']
})
export class FilteringComponent implements OnInit {

  constructor(public translate: TranslateService, private dialogRef: MatDialogRef<FilteringComponent>) {

    translate.use(localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en');

  }
  FilterForm = new FormGroup({
    FromDest: new FormControl(''),
    ToDest: new FormControl(''),
    PriceMax: new FormControl(0),
    PriceMin: new FormControl(0),
    StartTime: new FormControl('')
  })

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(this.FilterForm.value);
  }
}
