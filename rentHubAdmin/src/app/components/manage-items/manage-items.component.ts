import {Component, OnInit, ViewChild} from '@angular/core';
import {CookieService} from "ngx-cookie";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {map, Observable, startWith, Subject, Subscription} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CommonService} from "../services/common.service";
import {ItemDTO} from "../dto/ItemDTO";
import {Confirm, Notify} from "notiflix";
import {UpdateItemsComponent} from "./components/update-items/update-items.component";

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.scss']
})
export class ManageItemsComponent implements OnInit {

  complaintDetailsForm!: FormGroup;
  apiResponse: any;
  today:any
  filterComplaintsForm!: FormGroup;
  dataSource!: MatTableDataSource<Array<ItemDTO>>;
  displayedColumns: string[] = ['itemTitle','itemLocation', 'itemPrice', 'itemDesc','itemImg','action'];
  pageCount = 0;
  pageSizeOptions!: number[];
  tempPageEvent!: PageEvent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  search = new Subject();
  private allItemSub!: Subscription;
  userdetail:any

  myControl = new FormControl('');
  options: string[] = ['Available', 'Unavailable'];
  filteredOptions!: Observable<string[]>;

  constructor(private complaintService: CommonService,private dialog: MatDialog,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    this.complaintDetailsForm = new FormGroup({
      itemTitle: new FormControl('', [
        Validators.required
      ]),
      itemLocation: new FormControl('', [
        Validators.required
      ]),
      itemPrice: new FormControl('', [
        Validators.required
      ]),
      itemDesc: new FormControl('', [
        Validators.required
      ]),
      itemImg: new FormControl('', [
        Validators.required
      ])
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.refreshTable();

  }

  ngAfterViewInit(): void {
    this.refreshTable();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  Test($event: KeyboardEvent) {

  }


  saveComplaint() {
    this.complaintService.saveaFood(new ItemDTO(
      this.complaintDetailsForm.get('itemTitle')?.value,
      this.complaintDetailsForm.get('itemLocation')?.value,
      this.complaintDetailsForm.get('itemPrice')?.value,
      this.complaintDetailsForm.get('itemDesc')?.value,
      this.complaintDetailsForm.get('itemImg')?.value,
    )).subscribe(result => {
      console.log(result)
      Notify.success('Item Added Successfully');
      this.loadTable();
      this.resetfields();

    }, error => {
      console.log(error);
    });
  }

  resetfields(){
    this.complaintDetailsForm.setValue({
      itemTitle:'',
      itemLocation:'',
      itemPrice :'',
      itemDesc :'',
      itemImg :''
    })
  }

  refreshTable(): void {
    this.loadTable();
  }

  updateComplaint(row:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.width = '65%';
    // dialogConfig.height = '55%';
    console.log(row);
    console.log('----------------------------');
    const dialogRef = this.dialog.open(UpdateItemsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.refreshTable();
    });
  }

  deleteComplaint(row:any) {
    Confirm.show(
      'Notiflix Confirm',
      'Do you Delete This Item?',
      'Yes',
      'No',
      () => {
        this.complaintService.deleteaFood(row._id).subscribe(result => {
          console.log("Item Successfully deleted")
          Notify.success('Item Deleted Successfully');
          console.log(result)
          this.loadTable();
        }, error => {
          console.log(error);
        });
      },
      () => {
        Notify.failure('Item Delete Unsuccessful');
      },
      {
      },
    )


  }

  private loadTable(): void {
    this.allItemSub = this.complaintService.getAllFood()
      .subscribe(result => {
        console.log("result")
        console.log(result)
        this.paginator.length = result.data.length;
        this.dataSource = result.data;
        // console.log(result.data);
      }, error => {
        console.log(error);
      });
  }

  pageNavigate(value: string): void {
    this.paginator.pageIndex = Number(value) - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }

  getServerData($event: PageEvent): any {

  }


}
