import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/utils/global';
import { LAUFEN } from '../laufen';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  public getAllMessagesReceived(){
    return this.http.get < LAUFEN.message[] >(BASE_URL+'/messages/',{
      withCredentials: true
    })
  }
  public getDetailMessage(id:number){
    return this.http.get < LAUFEN.message[] >(BASE_URL+`/messages/detail/${id}`,{
      withCredentials: true
    })
  }

  public getMessagesNotRead(){
    return this.http.get < LAUFEN.message[] >(BASE_URL+`/messages/not/read`,{
      withCredentials: true
    })
  }
}
