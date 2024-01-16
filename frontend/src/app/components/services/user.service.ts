import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/utils/global';
import { LAUFEN } from '../laufen';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public getUser(id:number){
    return this.http.get < LAUFEN.User[] >(BASE_URL+`/getUser/${id}`,{
      withCredentials: true
    })
  }
}
