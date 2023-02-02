import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {CommonService} from "../../../services/common.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Confirm} from "notiflix";
import * as Notiflix from "notiflix";
import {ItemDTO} from "../../../dto/ItemDTO";
import {RentDTO} from "../../../dto/RentDTO";
import {CookieService} from "ngx-cookie";



@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

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
  cookieValue :any


  constructor(private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,private sanitizer: DomSanitizer,private cookieService: CookieService,
              public dialogRef: MatDialogRef<ItemDetailsComponent>,private itemsservice: CommonService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.itemname = this.data.data.itemTitle;
    this.itemdesc = this.data.data.itemDesc;
    this.itemimg = this.data.data.itemImg;
    this.itemLocation = this.data.data.itemLocation;
    this.itemprice = this.data.data.itemPrice;
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.itemLocation)
    this.cookieValue = JSON.parse(<string>this.cookieService.get('User'));
  }



  onNoClick(): void {
    this.dialogRef.close();

  }

  maplocation(){

  }

  addCart() {
    console.log(this.cookieValue)
    Confirm.show(
      'Confirm Rent Item',
      'Do you want to rent this item?',
      'Yes',
      'No',
      () => {
        this.itemsservice.rentItem(new RentDTO(
          this.data.data.itemTitle,
          this.data.data.itemLocation,
          this.data.data.itemPrice,
          this.data.data.itemDesc,
          this.data.data.itemImg,
          this.cookieValue
        )).subscribe((result: any) => {
          Notiflix.Report.success('Successful','Item Rented Successfully!','ok');
          console.log(result)
        }, (error: any) => {
          console.log(error);
          Notiflix.Report.failure('error',error.error.name,'ok');
        });
        },
      () => {
        Notiflix.Report.failure('Unsuccessful','Item Renting Unsuccessful!','ok');
      },
      {
      },
    );
  }

}
