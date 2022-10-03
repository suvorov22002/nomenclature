


import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AfbcoreService } from 'afbcore';
import { environment } from 'src/environments/environment';
import { ShareService } from './service/share.service';

declare const Liferay: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nomenclature';
  
  logoPath = '/o/precontentieux-0.0.0/precontentieux/assets/images/logo.png';

  constructor(
    private afbcore: AfbcoreService,
    private dialog: MatDialog,
    private service: ShareService
   ) {
      // lorsque la page charge nous postons les informations du module dans le BDD liferay
   
    //this.apimanager.getApiManager();
    /*
    this.afbcore.postModule(environment.name, 
    environment.name, 
    environment.name, "", this.logoPath, 
    true, "",this.service.permission, Liferay); 
      */
   
   }

   @HostListener('mousemove', ['$event'])
   onMouseMove(event: any) {    
    // if(Liferay.Session.get("sessionState") === 'expired')  this.afbcore.logoutPop();
   }
}
