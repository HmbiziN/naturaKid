import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/utils/global';
import { LAUFEN } from '../laufen';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public showCategory(){
    return this.http.get < LAUFEN.Category[] >(BASE_URL+'/category/',{
      withCredentials: true
    })
  }
}
