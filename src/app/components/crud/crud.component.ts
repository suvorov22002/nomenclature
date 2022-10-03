import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ViewChild } from '@angular/core';
import { del } from 'selenium-webdriver/http';
import { skip } from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { AjouterComponent } from '../ajouter/ajouter.component';
import { ParamformComponent } from '../paramform/paramform.component';
import { DialogService } from 'primeng/dynamicdialog';
import { EditformComponent } from '../editform/editform.component';
import { CrudModel } from '../crud.model';
import { ConsultService } from '../../service/consult.service';
import { DeleteComponent } from '../delete/delete.component';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  providers: [ DialogService]

})
export class CrudComponent implements OnInit {
  formValue!: FormGroup;
  CrudModelobj: CrudModel = new CrudModel();
  employeeData!: any;
  searchValue: string;

  //  Del: any;
  // firstName: any;
  // Students: Student[];
  constructor(private formBuilder: FormBuilder, private api: ConsultService,public dialog: MatDialog,private dialogService: DialogService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({

     

    })
    this.getAllEmployee();

  }
  getAllEmployee() {
    this.api.getNomenc()
      .subscribe(res => {
        this.employeeData = res;
      })
  }


  onView(obj) {
    let data = obj;
    const ref = this.dialogService.open(ParamformComponent, {
      width: 'auto',
      closeOnEscape: false,
     data: { obj:data }
  });
  ref.onClose.subscribe(res => {
   
  })
  }

 
  onDeletemat(obj){
    let data = obj;
    if(data.organi!="Afriland First Bank"){
      alert('Sorry you can not delete invidual from this organisation')
      this.formValue.reset();
      this.getAllEmployee();
          }
          else{
    const ref = this.dialogService.open(DeleteComponent, {
      width: 'auto',
      closeOnEscape: false,
      // header: 'INFORMATIONS PARAMETRAGE',
     data: { obj:data }
  });
  
  ref.onClose.subscribe(res => {
   
  })
}
  }


  onEditmat(obj) {
    console.log(JSON.stringify(obj))
    let data = obj;
    if(data.organi!="Afriland First Bank"){
alert('Sorry you can not Edit invidual from this organisation')
this.formValue.reset();
this.getAllEmployee();
    }
    else{
    const ref = this.dialogService.open(EditformComponent, {

      width: 'auto',
      closeOnEscape: false,
     data: { obj:data }
  });
  ref.onClose.subscribe(res => {
  })
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

}
  }



  addBlack() {
    const ref = this.dialogService.open(AjouterComponent, {
      width: 'auto',
      closeOnEscape: false,
    header: 'AJOUTER BLACKLIST INTERN ',
  });
  ref.onClose.subscribe(res => {
   
  })
  }
}
