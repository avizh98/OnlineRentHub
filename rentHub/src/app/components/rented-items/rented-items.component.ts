import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {CommonService} from "../services/common.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ItemDetailsComponent} from "../items/components/item-details/item-details.component";
import {RentedItemDetailsComponent} from "./components/rented-item-details/rented-item-details.component";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-rented-items',
  templateUrl: './rented-items.component.html',
  styleUrls: ['./rented-items.component.scss']
})
export class RentedItemsComponent implements OnInit {

  itemDetails!: any[];
  private allComponentsSub!: Subscription;
  cookieValue :any

  constructor(private itemsservice: CommonService,public dialog: MatDialog,private cookieService: CookieService) { }

  ngOnInit(): void {
    this.cookieValue = JSON.parse(<string>this.cookieService.get('User'));
  }

  ngAfterViewInit(): void {
    this.refreshTable();
  }

  public refreshTable(): void {
    this.loadTable();
  }

  public loadTable(): void {

    this.allComponentsSub = this.itemsservice.getAllRItems(this.cookieValue)
      .subscribe(result => {
        console.log("search items")
        console.log(result)
        // this.paginator.length = result.data.length;
        // this.dataSource = result.data;
        this.itemDetails =result;
        // this.refreshPageCount();
      }, error => {
        console.log(error);
      });
  }

  viewDetails(itemId: any) {
    this.itemsservice.getRItemDetails(itemId).subscribe(res => {
      console.log(res)
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = res;
      console.log('----------------------------');
      const dialogRef = this.dialog.open(RentedItemDetailsComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        console.log("response code1")
        console.log(result)
        console.log("response code2")
        this.refreshTable();
      });

    })
  }

}
