import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject} from 'rxjs';
import { tap, skip, catchError } from 'rxjs/operators';
import { BASE_URL } from 'src/app/utils/global';
import { HttpClient } from '@angular/common/http';
import { LAUFEN } from '../laufen';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private connectionStatus : BehaviorSubject< boolean >= new BehaviorSubject< boolean >(false)
  private stateAdmin : BehaviorSubject< boolean >= new BehaviorSubject< boolean >(false)
  public user: LAUFEN.User | null = null
  private initilized : boolean  = false
  public is_admin : boolean = false
  public idUser: number = 0



  constructor(private http: HttpClient) { 
    this.isUser()
  }

 public isUser(){
  this.http.get<LAUFEN.User | false>(BASE_URL+"/is_connected",{
    withCredentials: true
  }).pipe(
    catchError(_err => of<false>(false))
  ).pipe(
    tap(r => {
      this.initilized = true
      this.user = r ? r : null
      this.is_admin = r ? r.is_admin : false
      this.connectionStatus.next(r != false)
      this.stateAdmin.next(r!=null? (r as LAUFEN.User).is_admin: false)
    })
  )
  .subscribe()
 }


  public login(mail: string, password: string){
    return this
      .http
      .post<LAUFEN.User | false >(BASE_URL+"/user/login", {
        'mail' : mail,
        'password': password
      })
      .pipe(
        tap(r => {
          this.connectionStatus.next(r != false)
          this.stateAdmin.next(r!=null? (r as LAUFEN.User).is_admin: false)
          this.user = r ? r : null
          return this.user
        })
      )

  }

  public isAdmin(): Observable<boolean>{

    if (!this.initilized)
    { 
      return this.stateAdmin.pipe(skip(1))
    }
    return this.stateAdmin
  }



  public isConnected(): Observable<boolean>{
    if (!this.initilized)
    {
      
      return this.connectionStatus.pipe(skip(1))
    }
    return this.connectionStatus 
  }

  public logout(){
    return this.http.post(BASE_URL+"/logout", null,{
      withCredentials: true
    })
    .pipe(
      tap(_=>this.connectionStatus.next(false))
    )
    
  }

}
