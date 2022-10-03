import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShareService } from './share.service';
import { AfbcoreService } from 'afbcore';

@Injectable({
  providedIn: 'root'
})
export class AppinitService {

  url: any;
  constructor(
    private afbcore: AfbcoreService,
    private service: ShareService,
    private http: HttpClient,
  ) { }


  
    /*getOAUTH2AccessToken(res) {
      console.log('get token url ' + res);
      console.log(res);
        let grant_type = 'password';
        let clientID = 'USER_CLIENT_APP';
        let clientSecret = 'password';
      const client = btoa(clientID+":"+clientSecret);
      const formData = new FormData()
      formData.append("grant_type", grant_type);
      formData.append("username", "user1");
      formData.append("password", "123456");
     
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'basic '+client);
    
       return new Promise<void>((resolve,reject) =>
        {
          this.http.post(res[0].adresseIP + "/authorization-service/oauth/token",formData, { headers: headers })
          .toPromise()
          .then(
            (res: any) => {
              console.log(res);
                localStorage.setItem('afb_access_token',JSON.stringify(res));
               
    
            resolve();
            }
          )
          .catch(
            error => {
              return error;
            }
          ) 
        } 
      ) 
    }*/
   
  

  init() {
    let url = null;
    let headers = new HttpHeaders();    
     headers = headers.set("Authorization", "Basic " + btoa(this.afbcore.userName + ":" + this.afbcore.password))
     return new Promise<void>((resolve,reject) =>
      {
        this.http.get("/api/jsonws/afbliferayservice.afbparamgeneraux/get-afb-param-generauxs", { headers: headers })
        .toPromise()
        .then(
          (res: any) => {
            this.service.apiHost = res[0].adresseIP + "/nomenclature-service/rest/api";
            this.url = res[0].adresseIP;
            this.service.apiGED = res[0].adresseGedProcess;
            
          resolve(res);
          }
        )
        .catch(
          error => {
            console.log('INITIALIZER FAILED')
          }
        ) 
      } 
    ) 

    
  }



  
}
