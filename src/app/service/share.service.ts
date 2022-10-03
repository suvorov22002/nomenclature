import { Injectable } from '@angular/core';
import { AfbcoreService } from 'afbcore';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { MapOperator } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  apiHost: String;//  ="http://172.21.240.12:8181";
  apiGED: String; 
  apiMngLoad = new BehaviorSubject<boolean>(false); // {1}
  tabRoles: any[];

  permission = [
      "NOM_AJOUTER",
      "NOM_SUPPRIMER",
      "NOM_MODIFIER"
      
  ]

  constructor(
    private afbcore: AfbcoreService,
    private http: HttpClient
  ) { }

 
    //conversion d'une chaine de caractere en un tableau
    stringToTable(str: any) {
      console.log('str ' + str);
      this.tabRoles = [];
      for(let s of str.split(';')) {
        this.tabRoles.push(s);
      }
      console.log(this.tabRoles);
      return this.tabRoles;
    }


    getUsers() {
      let headers = new HttpHeaders();
      let username = 'test';
      let password = 'test';
      
      headers = headers.set("Authorization", "Basic " + btoa(username + ":" + password))
      return this.http.get('/api/jsonws/afbliferayservice.afb_module/get-users', { headers: headers })
        .pipe(map((res: any) => {
          return res;
        }))
    }
 

}
