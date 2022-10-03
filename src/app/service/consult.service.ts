import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Fichier } from '../fichier';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  apiHost = environment.API_BASE_URL;

  constructor(private http: HttpClient) { }

  postEmploye(data: any) {
    return this.http.post<any>(this.apiHost+"/nomenclature/add/", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getNomenc() {
    return this.http.get<any>(this.apiHost+"/nomenclature/getall/")
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getCodecategorie() {
    return this.http.get<any>(this.apiHost+"/nomenclature/findallcodecategorie/")
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getSrch(data: any) {
    return this.http.post<any>(this.apiHost+"/nomenclature/findnomenclature", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getData(data: any, first_name: string, second_name: string, organi: string, sexe_gel: string) {
    return this.http.get<any>("http://172.21.10.39:8080/api/v1/blacklistsearch/" + first_name+"/"+second_name+"/"+organi+"/"+sexe_gel, data)
      .pipe(map((res: any) => {

        return res;
      }))
  }

  updateEmployee(data: any) {
    return this.http.put<any>(this.apiHost+"/nomenclature/update/", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }




  deleteEmploye(data: any, id: number) {
    return this.http.delete<any>(this.apiHost+"/nomenclature/delete/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }


}
