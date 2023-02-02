import {Component, OnInit, ViewChild} from '@angular/core';
import {CookieService} from "ngx-cookie";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {map, Observable, startWith, Subject, Subscription} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {RentDTO} from "../dto/RentDTO";
import {CommonService} from "../services/common.service";
import {Confirm, Notify} from 'notiflix';
import {UpdateRentsComponent} from "./components/update-rents/update-rents.component";

@Component({
  selector: 'app-manage-rents',
  templateUrl: './manage-rents.component.html',
  styleUrls: ['./manage-rents.component.scss']
})
export class ManageRentsComponent implements OnInit {

  complaintDetailsForm!: FormGroup;
  apiResponse: any;
  today:any
  filterComplaintsForm!: FormGroup;
  dataSource!: MatTableDataSource<Array<RentDTO>>;
  displayedColumns: string[] = ['RitemTitle','RitemLocation', 'RitemPrice', 'RitemDesc','RitemImg','username','action'];
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
      RitemTitle: new FormControl('', [
        Validators.required
      ]),
      RitemLocation: new FormControl('', [
        Validators.required
      ]),
      RitemPrice: new FormControl('', [
        Validators.required
      ]),
      RitemDesc: new FormControl('', [
        Validators.required
      ]),
      RitemImg: new FormControl('', [
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
    this.complaintService.saveaRent(new RentDTO(
      this.complaintDetailsForm.get('RitemTitle')?.value,
      this.complaintDetailsForm.get('RitemLocation')?.value,
      this.complaintDetailsForm.get('RitemPrice')?.value,
      this.complaintDetailsForm.get('RitemDesc')?.value,
      this.complaintDetailsForm.get('RitemImg')?.value,
      "Admin"
    )).subscribe(result => {
      console.log("Item Successfully Added")
      Notify.success('Item Successfully Added');
      console.log(result)
      this.loadTable();
      this.resetfields();

    }, error => {
      console.log(error);
    });
  }

  resetfields(){
    this.complaintDetailsForm.setValue({
      RitemTitle:'',
      RitemLocation:'',
      RitemPrice :'',
      RitemDesc :'',
      RitemImg :''
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
    const dialogRef = this.dialog.open(UpdateRentsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.refreshTable();
    });
  }

  deleteComplaint(row:any) {
    Confirm.show(
      'Notiflix Confirm',
      'Do you agree with me?',
      'Yes',
      'No',
      () => {
        this.complaintService.deleteaRent(row._id).subscribe(result => {
          console.log("Item Successfully deleted")
          Notify.failure('Item Successfully deleted');
          console.log(result)
          this.loadTable();
        }, error => {
          console.log(error);
        });
      },
      () => {
        Notify.failure('Item deleted Unsuccessful ');
      },
      {
      },
    );

  }

  private loadTable(): void {
    this.allItemSub = this.complaintService.getAllRent()
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
