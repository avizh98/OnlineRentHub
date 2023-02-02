import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CommonService} from "../../../services/common.service";
import {Confirm} from "notiflix";
import {RentDTO} from "../../../dto/RentDTO";
import * as Notiflix from "notiflix";

@Component({
  selector: 'app-rented-item-details',
  templateUrl: './rented-item-details.component.html',
  styleUrls: ['./rented-item-details.component.scss']
})
export class RentedItemDetailsComponent implements OnInit {

  idLoading = true;
  apiResponse!: false;
  ItemDetailFrom!: FormGroup;
  checked = false;
  disabled = false;
  fileObj:any
  itemname!:any;
  itemdesc!:any;
  itemimg!:any;
  itemLocation!:any;
  itemprice!:any;

  latitude!: number;
  longitude!: number;
  zoom!: number;
  mapLink!: string;
  safeHtml!: SafeHtml;


  constructor(private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,private sanitizer: DomSanitizer,
              public dialogRef: MatDialogRef<RentedItemDetailsComponent>,private itemsservice: CommonService) { }

  ngOnInit(): void {
    console.log(this.data.data.RitemTitle);
    this.itemname = this.data.data.RitemTitle;
    this.itemdesc = this.data.data.RitemDesc;
    this.itemimg = this.data.data.RitemImg;
    this.itemLocation = this.data.data.RitemLocation;
    this.itemprice = this.data.data.RitemPrice;
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.itemLocation)
  }



  onNoClick(): void {
    this.dialogRef.close();

  }

  maplocation(){

  }

  addCart() {
    Confirm.show(
      'Finish Rent period',
      'Do you want to Finish the Rent period?',
      'Yes',
      'No',
      () => {
        this.itemsservice.deleteItem(this.data.data._id).subscribe((result: any) => {
          Notiflix.Report.success('Successful','Item Renting Finished Successfully!','ok');
          console.log(result)
        }, (error: any) => {
          console.log(error);
          Notiflix.Report.failure('error',error.error.name,'ok');
        });
      },
      () => {
        Notiflix.Report.failure('Unsuccessful','Item Renting Finish Unsuccessful!','ok');
      },
      {
      },
    );

  }

}
