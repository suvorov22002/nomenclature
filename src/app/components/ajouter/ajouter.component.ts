import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CrudModel } from '../crud.model';
import { ConsultService } from 'src/app/service/consult.service';
@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']

})
export class AjouterComponent implements OnInit {
 
  formValue!: FormGroup;
  CrudModelobj: CrudModel = new CrudModel();
  employeeData!: any;
  codeCate! : any;
  info: any = {};
  actifs = [
    { code: true, name: 'OUI' },
    { code: false, name: 'NON' }
  ]
  myControl = new FormControl();
  options: any[];
  optionscat: any[];

  filteredOptions: Observable<string[]>;

  constructor(private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig, private api: ConsultService, public dialog: MatDialog) { }


  ngOnInit(): void {
   
    this.getAllCodecategori();

    this.info.actif = false;
    if (this.config.data != null && this.config.data != undefined) this.info = this.config.data.obj;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(value);
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getAllCodecategori() {
    this.api.getCodecategorie()
      .subscribe(res => {
        this.codeCate = [];
        this.options = [];
        for(let i of res.datas) {
          this.options.push(i.codeCategorie);

        }
        console.info(this.options)
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)),
        );
        this.formValue = this.formBuilder.group({
        })
      })
  }
  onNoClick(): void {
    this.ref.close();
  }

  postEmployeeDetails(info) {
    info.actif="true";
    this.api.addCategorie(info)
      .subscribe(res => {
        alert("Individual added sucessfully")
        let ref = document.getElementById('cancel');
        this.formValue.reset();
        this.getAllEmployee();
      },
        err => {
          alert("something went wrong");
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

  getAllEmployee() {
    this.api.getNomenc()
      .subscribe(res => {
        this.employeeData = res;
      })
  }

}
