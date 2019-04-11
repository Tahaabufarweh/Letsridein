import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-ads-dialog',
  templateUrl: './ads-dialog.component.html',
  styleUrls: ['./ads-dialog.component.css']
})
export class AdsDialogComponent implements OnInit {
  img;
  adForm = new FormGroup({

    AdvLink: new FormControl('', Validators.required),


    ImageName: new FormControl('', Validators.required),

  })
  constructor(private dialogRef: MatDialogRef<AdsDialogComponent>) { }
  get AdvLink() {
    return this.adForm.get('AdvLink') as FormControl;
  }

  get ImageName() {
    return this.adForm.get('ImageName') as FormControl;
  }
  
  createnewAd() {
    console.log(this.img);
    this.adForm.setValue({
      AdvLink: this.AdvLink.value,

      ImageName: this.img

    });
    console.log(this.adForm.value);
    this.dialogRef.close(this.adForm.value);

  }
  url;
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result.toString();
         }
      
      reader.readAsDataURL(event.target.files[0]);
      this.img = event.target.files[0];
      console.log(event.target.files[0])
      return this.img;
    }
  }
  ngOnInit() {
    //let imgName = this.ImageName.value;
  }

}
