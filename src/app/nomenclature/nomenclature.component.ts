import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AfbcoreService } from 'afbcore';
import { ConsultService } from '../service/consult.service';
import { ParamformComponent } from '../components/paramform/paramform.component';

@Component({
  selector: 'app-nomenclature',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.css']
})
export class NomenclatureComponent implements OnInit {

  obj:any;
  collapseShow : boolean = false;
  collapseShow1 : boolean = true;
  nomenData!: any; //liste de toutes les categ de nomenclature
  evidence!:any;
  formValue!: FormGroup;
  prop_in: boolean = false;

  constructor(private formBuilder: FormBuilder, private api: ConsultService, private afbcore:AfbcoreService) {
    this.evidence = {}
    this.evidence.code = ""
    this.evidence.codeCategorie = ""
    this.evidence.categorie = ""
    this.evidence.libelle = ""
  }

  ngOnInit() {
    this.formValue = this.formBuilder.group({})
    this.obj = {};
    this.obj.actif = true;
    this.searchRegion(this.obj);
  }

  toggleCollapseShow() {
    this.collapseShow = true;
    this.collapseShow1 = !this.collapseShow;
    this.prop_in = !this.prop_in;
  }
  toggleCollapseShow1() {
    this.collapseShow1 = true;
    this.collapseShow = !this.collapseShow1;
    //this.obj = {};
    //this.obj.actif = true;
    this.searchRegion(this.obj);
    this.prop_in = !this.prop_in;
  }

  searchRegion(info) {
    this.api.searhCateg(info)
      .subscribe(res => {
        this.nomenData = res.datas;
      },
      err => {
      })
  }
  
  save() {
    this.evidence.actif = true;
    console.log("this.evidence: ",JSON.stringify(this.evidence))
    if (this.evidence.code == "" || this.evidence.codecat == "" || this.evidence.categ == "" ) {
      this.afbcore.showMessage('DANGER', 'Veuillez renseigner les champs obligatoire');
      return;
    }
    this.api.addCategorie(this.evidence)
    .subscribe(res => {
      this.afbcore.showMessage('SUCCESS', 'Categorie cr??e avec succ??s');
      this.getAllNomcl();
    },
      err => {
        this.afbcore.showMessage('DANGER', JSON.stringify(err.error.message));
      });
  }
  
  getAllNomcl() {
    this.api.getNomenc()
      .subscribe(res => {
        this.nomenData = res;
      })
  }

}
