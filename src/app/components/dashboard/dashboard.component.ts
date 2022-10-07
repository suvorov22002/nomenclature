
import { ParamformComponent } from '../paramform/paramform.component';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AjouterComponent } from '../ajouter/ajouter.component';

import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditformComponent } from '../editform/editform.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DeleteComponent } from '../delete/delete.component';
import { CrudModel } from '../crud.model';
import { ConsultService } from 'src/app/service/consult.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DialogService]

})
export class DashboardComponent implements OnInit {
  formValue!: FormGroup;
  CrudModelobj: CrudModel = new CrudModel();
  employeeData!: any;
  searchValue: string;
  info: any = {};
  actifs = [
    { code: true, name: 'OUI' },
    { code: false, name: 'NON' }
  ]
  
  constructor(private formBuilder: FormBuilder,
    private api: ConsultService, public dialog: MatDialog, private dialogService: DialogService, public config: DynamicDialogConfig, public ref: DynamicDialogRef, private router: Router) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({})
    this.info.actif = false;
    if (this.config.data != null && this.config.data != undefined) this.info = this.config.data.obj;
    this.searchForm(this.info);
  }

  
  getAllEmployee() {
    this.api.getNomenc()
      .subscribe(res => {
        this.employeeData = res.datas;
      })
  }
  onView(obj) {
    let data = obj;
    const ref = this.dialogService.open(ParamformComponent, {
      width: 'auto',
      closeOnEscape: false,
      header: 'INFORMATION INDIVIDUEL',
      data: { obj: data }
    });
    ref.onClose.subscribe(res => {

    })
  }
  searchForm(info) {
    info.actif="true";
      this.api.searhCateg(info)
        .subscribe(res => {
          this.employeeData = res.datas;
          this.formValue.reset();
        },
          err => {
          })
  }

  addBlack() {
    this.getAllEmployee();
    const ref = this.dialogService.open(AjouterComponent, {
      width: 'auto',
      closeOnEscape: false,
      header: 'AJOUTER NOMENCLATURE',
    });
    ref.onClose.subscribe(res => {

    })
  }

  onEditmat(obj) {
    let data = obj;
    const ref = this.dialogService.open(EditformComponent, {
      width: 'auto',
      closeOnEscape: false,
      header: 'EDITER INDIVIDU',
      data: { obj: data }
    });
    ref.onClose.subscribe(res => {
    })
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  }


  onDeletemat(obj) {
    let data = obj;
    const ref = this.dialogService.open(DeleteComponent, {
      closeOnEscape: false,
      data: { obj: data }
    });
    ref.onClose.subscribe(res => {

    })

  }

  logout() {
    this.router.navigate(['login'])
    localStorage.clear();

  }


}
