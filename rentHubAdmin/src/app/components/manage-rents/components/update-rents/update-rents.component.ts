import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CommonService} from "../../../services/common.service";
import {RentDTO} from "../../../dto/RentDTO";
import {Notify} from "notiflix";

@Component({
  selector: 'app-update-rents',
  templateUrl: './update-rents.component.html',
  styleUrls: ['./update-rents.component.scss']
})
export class UpdateRentsComponent implements OnInit {

  statusForm: FormControl = new FormControl();
  itemDetailsForm!: FormGroup;
  apiResponse!: boolean;

  myControl = new FormControl('');
  options: string[] = ['Available', 'Unavailable'];
  filteredOptions!: Observable<string[]>;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<UpdateRentsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private complaintService: CommonService) { }

  ngOnInit(): void {
    this.itemDetailsForm = this.formBuilder.group({
      RitemTitle: ['', Validators.required],
      RitemLocation: ['', Validators.required],
      RitemPrice: ['', Validators.required],
      RitemDesc: ['', Validators.required],
      RitemImg: ['', Validators.required],
      username: ['', Validators.required]
    });

    this.itemDetailsForm.setValue({
      RitemTitle: this.data.RitemTitle,
      RitemLocation: this.data.RitemLocation,
      RitemPrice: this.data.RitemPrice,
      RitemDesc: this.data.RitemDesc,
      RitemImg: this.data.RitemImg,
      username: this.data.username,
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
    this.complaintService.updateaRent(new RentDTO(
      this.data.RitemTitle,
      this.data.RitemLocation,
      this.data.RitemPrice,
      this.data.RitemDesc,
      this.data.RitemImg,
      this.data.username,
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
