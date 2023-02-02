import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../services/common.service";
import {ItemDTO} from "../dto/ItemDTO";
import {ToastrService} from "ngx-toastr";
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {


  itemDetailsForm!: FormGroup;

  constructor(private complaintService: CommonService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.itemDetailsForm = new FormGroup({
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
  }

  saveItem() {
    this.complaintService.saveItem(new ItemDTO(
      this.itemDetailsForm.get('itemTitle')?.value,
      this.itemDetailsForm.get('itemLocation')?.value,
      this.itemDetailsForm.get('itemPrice')?.value,
      this.itemDetailsForm.get('itemDesc')?.value,
      this.itemDetailsForm.get('itemImg')?.value,
    )).subscribe((result: any) => {
      console.log("Item Successfully Added")
      Notiflix.Report.success('Successful','Item Added Successfully!','ok');
      console.log(result)
      this.resetfields();
    }, (error: any) => {
      console.log(error);
      Notiflix.Report.failure('error',error.error.name,'ok');
    });
  }

  resetfields(){
    this.itemDetailsForm.setValue({
      itemTitle:'',
      itemLocation:'',
      itemPrice :'',
      itemDesc :'',
      itemImg :''
    })
  }
}
