import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {CommonService} from "../services/common.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ItemDetailsComponent} from "./components/item-details/item-details.component";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  itemDetails!: any[];
  private allComponentsSub!: Subscription;

  constructor(private itemsservice: CommonService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.refreshTable();
  }

  public refreshTable(): void {
    this.loadTable();
  }

  public loadTable(): void {
    this.allComponentsSub = this.itemsservice.getAllItems()
      .subscribe(result => {
        console.log("search items")
        console.log(result)
        // this.paginator.length = result.data.length;
        // this.dataSource = result.data;
        this.itemDetails =result.data;
        // this.refreshPageCount();
      }, error => {
        console.log(error);
      });
  }

  viewDetails(itemId: any) {
    this.itemsservice.getItemDetails(itemId).subscribe(res => {
      console.log(res)
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = res;
      console.log('----------------------------');
      const dialogRef = this.dialog.open(ItemDetailsComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        console.log("response code1")
        console.log(result)
        console.log("response code2")
        this.refreshTable();
      });

    })
  }
}
