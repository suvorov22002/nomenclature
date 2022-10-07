import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AfbcoreModule, AfbcoreService } from 'afbcore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyComponent } from './body/body.component';
import { MenuComponent } from './menu/menu.component';
import { CrudComponent } from './components/crud/crud.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
// import { AppinitService } from './service/appinit.service';
import { ConsultService } from './service/consult.service';
import { SearchfilterPipe } from './pipe/searchfilter.pipe';
import { AjouterComponent } from './components/ajouter/ajouter.component';
import { ParamformComponent } from './components/paramform/paramform.component';
import { EditformComponent } from './components/editform/editform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatInputModule, MatButtonModule, MatAutocompleteModule, MatCheckboxModule, MAT_DATE_LOCALE, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import { FilterService, PrimeNGConfig } from 'primeng/api';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DeleteComponent } from './components/delete/delete.component';
import { DialogService, DynamicDialogModule, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppinitService } from './service/appinit.service';
import { NomenclatureComponent } from './nomenclature/nomenclature.component';
import { CardTableComponent } from './card-table/card-table.component';
import { RegionBanqueComponent } from './region-banque/region-banque.component';
import { RegionUniteComponent } from './region-unite/region-unite.component';
import { RegionRessourceComponent } from './region-ressource/region-ressource.component';
import { CardRegionComponent } from './card-region/card-region.component';
import { CardUniteComponent } from './card-unite/card-unite.component';

export function initializeApp1(appInitService: AppinitService) {
  return (): Promise<any> => { 
    return appInitService.init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    MenuComponent,
    CrudComponent,
    DashboardComponent,
    SearchfilterPipe,
    AjouterComponent,
    ParamformComponent,
    EditformComponent,
    DeleteComponent,
    NomenclatureComponent,
    CardTableComponent,
    RegionBanqueComponent,
    RegionUniteComponent,
    RegionRessourceComponent,
    CardRegionComponent,
    CardUniteComponent
  ],
  imports: [
    AfbcoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule ,
    ReactiveFormsModule,RouterModule,
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonModule,
    TableModule,
    InputTextModule,
    MatCheckboxModule,
    NgxPermissionsModule.forRoot(),
    MatAutocompleteModule
  ],
  entryComponents: [
    ParamformComponent,EditformComponent,DeleteComponent,AjouterComponent
  ],
  exports: [
    DashboardComponent,
    CrudComponent,SearchfilterPipe],
  providers: [ ConsultService,DialogService,AfbcoreService,  FilterService,
    PrimeNGConfig,DynamicDialogConfig,
    DynamicDialogRef,
  //  { provide: APP_INITIALIZER,useFactory: initializeApp1, deps: [AppinitService], multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}, //format datepicker dd/MM/yyyy
    {provide: APP_BASE_HREF, useValue: ''}
],
  bootstrap: [AppComponent]
})
export class AppModule { }

