
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudModel } from '../crud.model';
import { ConsultService } from 'src/app/service/consult.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']

})
export class DeleteComponent implements OnInit {
  formValue!: FormGroup;
  CrudModelobj: CrudModel = new CrudModel();
  employeeData!: any;
   stats: String = 'Supprimer'; 


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
  }
  onNoClick(): void {
    this.ref.close();
  }
  postDeletes(info){
    this.ref.close();
    this.api.deleteEmploye(info,info.id)
    .subscribe(res=>{
      alert("Member Deleted sucessfully")

      let ref = document.getElementById('cancel');
      this.ref.close();

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

