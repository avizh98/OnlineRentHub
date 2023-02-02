import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ItemDTO} from "../dto/ItemDTO";
import {RentDTO} from "../dto/RentDTO";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  Url = environment.baseUrl;
  username:any
  userdetail:any

  constructor(private http: HttpClient,private cookieService: CookieService) { }

  saveaFood(complaintDTO: ItemDTO): Observable<any> {
    return this.http.post<any>(this.Url+'/item/create', {
      itemTitle: complaintDTO.itemTitle,
      itemLocation: complaintDTO.itemLocation,
      itemPrice: complaintDTO.itemPrice,
      itemDesc: complaintDTO.itemDesc,
      itemImg: complaintDTO.itemImg
    }, {
      headers:new HttpHeaders({


      })
    })
  }

  getAllFood(): Observable<any> {
    return this.http.get(this.Url+'/item/getAll', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',

      })
    });
  }

  deleteaFood(fid: any): Observable<any> {
    return this.http.delete(this.Url+'/item/delete/'+fid, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    });
  }

  updateaComplaint(complaintDTO: ItemDTO) : Observable<any> {
    return this.http.put<any>(this.Url+'/item/update', {
      itemTitle: complaintDTO.itemTitle,
      itemLocation: complaintDTO.itemLocation,
      itemPrice: complaintDTO.itemPrice,
      itemDesc: complaintDTO.itemDesc,
      itemImg: complaintDTO.itemImg
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    })
  }

  saveaRent(rentDTO: RentDTO) : Observable<any> {
    return this.http.post<any>(this.Url+'/rent/create', {
      RitemTitle: rentDTO.RitemTitle,
      RitemLocation: rentDTO.RitemLocation,
      RitemPrice: rentDTO.RitemPrice,
      RitemDesc: rentDTO.RitemDesc,
      RitemImg: rentDTO.RitemImg,
      username: rentDTO.username
    }, {
      headers:new HttpHeaders({


      })
    })

  }

  deleteaRent(cid: any) : Observable<any> {
    return this.http.delete(this.Url+'/rent/delete/'+cid, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    });
  }

  getAllRent() : Observable<any> {
    return this.http.get(this.Url+'/rent/getAll', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',

      })
    });

  }

  updateaRent(rentDTO: RentDTO) : Observable<any> {
    return this.http.put<any>(this.Url+'/rent/update', {
      RitemTitle: rentDTO.RitemTitle,
      RitemLocation: rentDTO.RitemLocation,
      RitemPrice: rentDTO.RitemPrice,
      RitemDesc: rentDTO.RitemDesc,
      RitemImg: rentDTO.RitemImg,
      username: rentDTO.username
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    })
  }
}
