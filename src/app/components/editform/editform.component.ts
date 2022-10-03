import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudModel } from '../crud.model';
import { ConsultService } from 'src/app/service/consult.service';
@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.css']

})
export class EditformComponent implements OnInit {
  formValue!: FormGroup;
  CrudModelobj: CrudModel = new CrudModel();
  employeeData!: any;
  isChecked:boolean ;
  readOnlyStyleGuideNotes : boolean;
  info: any = {};
  actifs = [
    { code: true, name: 'OUI' },
    { code: false, name: 'NON' }
  ]
  constructor(private formBuilder: FormBuilder, private api: ConsultService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig
  ) { }

  ngOnInit() :void {
    //console.log(this.config);
    this.formValue = this.formBuilder.group({

    })
    this.getAllEmployee();
 
    this.info.actif = false;
    if(this.config.data != null && this.config.data != undefined ) this.info = this.config.data.obj;
    this.isChecked =this.info.actif;
    this.readOnlyStyleGuideNotes=true;
  }
  onNoClick(): void {
    this.ref.close();
  }
  postUpdates(info){
    this.api.updateEmployee(info)
    .subscribe(res=>{
      console.log(res);
      alert("Member Updated sucessfully")
      let ref = document.getElementById('cancel');
      //ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("something went wrong");
    } )
    
  }

  getAllEmployee() {
    this.api.getNomenc()
      .subscribe(res => {
        this.employeeData = res;
        console.log(JSON.stringify(res));
      })
  }
  

}

