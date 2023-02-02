import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CommonService} from "../../../services/common.service";
import {ItemDTO} from "../../../dto/ItemDTO";
import {Notify} from "notiflix";

@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  styleUrls: ['./update-items.component.scss']
})
export class UpdateItemsComponent implements OnInit {

  statusForm: FormControl = new FormControl();
  itemDetailsForm!: FormGroup;
  apiResponse!: boolean;

  myControl = new FormControl('');
  options: string[] = ['Available', 'Unavailable'];
  filteredOptions!: Observable<string[]>;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<UpdateItemsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private complaintService: CommonService,
              ) { }

  ngOnInit(): void {
    this.itemDetailsForm = this.formBuilder.group({
      itemTitle: ['', Validators.required],
      itemLocation: ['', Validators.required],
      itemPrice: ['', Validators.required],
      itemDesc: ['', Validators.required],
      itemImg: ['', Validators.required]
    });

    this.itemDetailsForm.setValue({
      itemTitle: this.data.itemTitle,
      itemLocation: this.data.itemLocation,
      itemPrice: this.data.itemPrice,
      itemDesc: this.data.itemDesc,
      itemImg: this.data.itemImg,
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    console.log(this.data)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  btnCancel() {
    this.dialogRef.close();
  }

  UpdateComplaint() {
    this.complaintService.updateaComplaint(new ItemDTO(
      this.data.itemTitle,
      this.data.itemLocation,
      this.data.itemPrice,
      this.data.itemDesc,
      this.data.itemImg,
    )).subscribe(result => {
      console.log("Item Successfully Updated")
      Notify.success('Item Successfully Updated');
      console.log(result)

      this.dialogRef.close();
    }, error => {
      console.log(error);
    });
  }

}
