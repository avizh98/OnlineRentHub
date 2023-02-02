import { Injectable } from '@angular/core';
import {ItemDTO} from "../dto/ItemDTO";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {RentDTO} from "../dto/RentDTO";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  Url = environment.baseUrl;
  username:any
  userdetail:any

  constructor(private http: HttpClient) { }

  saveItem(itemDTO: ItemDTO) : Observable<any> {
    return this.http.post<any>(this.Url+'/item/create', {
      itemTitle: itemDTO.itemTitle,
      itemLocation: itemDTO.itemLocation,
      itemPrice: itemDTO.itemPrice,
      itemDesc: itemDTO.itemDesc,
      itemImg: itemDTO.itemImg,
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    })
  }

  getAllItems(): Observable<any> {
    return this.http.get(this.Url+'/item/getAll', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    });

  }

  getAllRItems(username:any): Observable<any> {
    return this.http.get(this.Url+'/rent/getItembyId/'+username,{
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    });

  }

  getItemDetails(componetID: any): Observable<any> {
    return this.http.post(this.Url+'/item/getItem', {
      _id:componetID
    },{
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });
  }

  getRItemDetails(componetID: any): Observable<any> {
    return this.http.post(this.Url+'/rent/getItem', {
      _id:componetID
    },{
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });
  }

  rentItem(rentDTO: RentDTO)  : Observable<any> {
    console.log(rentDTO)
    return this.http.post<any>(this.Url+'/rent/create', {
      RitemTitle: rentDTO.RitemTitle,
      RitemLocation: rentDTO.RitemLocation,
      RitemPrice: rentDTO.RitemPrice,
      RitemDesc: rentDTO.RitemDesc,
      RitemImg: rentDTO.RitemImg,
      username: rentDTO.username,
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    })

  }

  deleteItem(_id:any) : Observable<any> {
    return this.http.delete(this.Url+'/rent/delete/'+_id,{
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });

  }
}
