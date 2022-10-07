import { Component, OnInit } from '@angular/core';
import { AfbcoreService } from 'afbcore';
import { ConsultService } from '../service/consult.service';

@Component({
  selector: 'app-region-unite',
  templateUrl: './region-unite.component.html',
  styleUrls: ['./region-unite.component.css']
})
export class RegionUniteComponent implements OnInit {

  obj:any;
  collapseShow : boolean = false;
  collapseShow1 : boolean = true;
  unite?:any
  afbcolor:any; 
  listUnit?: any; //liste de toutes les regions
  allComplete: boolean = false;
  prop_in: boolean = false;
  region ?: any;
  agency: Array<any> =  [
    
  ]

  categories: Array<any> = [
    {name: '', code: ''},
    {name: 'Credit', code: 'DDCE'},
    {name: 'Juriste', code: 'DJ',},
    {name: 'Analyste', code: 'AN',},
    {name: 'Risque', code: 'DRISK',}
  ]

  responsables?:  Array<any> = [
    {name: '', email: ''},
    {name: 'Charline NOUYEP', email: 'charline_nouyep'},
    {name: 'Rocchy TCHATCHOUA', email: 'rocchy_tchatchoua'},
    {name: 'Christian YEMELI', email: 'christian_yemeli'},
    {name: 'Danielle TCHUENTE', email: 'danielle_tchuente'},
    {name: 'Alain FEUTSEU', email: 'alain_feutseu'}
  ]

  constructor(private api: ConsultService, private afbcore:AfbcoreService) { }

  ngOnInit() {
    this.unite = {}
    this.unite.libelle = ""
    this.afbcolor = 'warn';
    this.searchRegion();

    this.obj = {};
    this.obj.actif = true;
    this.obj.categorie = "REGIONS BANQUE";
    this.searchUnit(this.obj);
  }

  toggleCollapseShow() {
    this.collapseShow = true;
    this.collapseShow1 = !this.collapseShow;
    this.setAll(this.allComplete);
    this.unite.libelle = ""
    this.prop_in = !this.prop_in;
    //this.agency.forEach(t => {
    //  console.log(JSON.stringify(t.region));
    //});
   
  }
  toggleCollapseShow1() {
    this.collapseShow1 = true;
    this.collapseShow = !this.collapseShow1;
    //this.obj = {};
    //this.obj.actif = true;
    //this.obj.categorie = "REGIONS BANQUE";
    this.searchUnit(this.obj);
    this.prop_in = !this.prop_in;
  }

  setAll(completed: boolean) {
    console.log(completed)
    if (this.agency == null) {
      return;
    }
    this.agency.forEach(t => (t.completed = completed)); //change all
  }

  searchRegion() {
    var info : any
    info = {};
    info.actif = true;
    info.categorie = "REGIONS BANQUE";
    this.api.searhCateg(info)
      .subscribe(res => {
        //console.log("res ",JSON.stringify(res.datas));
        res.datas.forEach(t => {
          if(t.val2 == null){
            this.agency.push({
              completed : false,
              region : t
            });
          }
        });
        //console.log(JSON.stringify(this.agency));
      },
      err => {
        console.log(err.message)
      }) 
  }

  searchUnit(info) {
    this.listUnit = [];
    this.api.searhCateg(info)
      .subscribe(res => {
        res.datas.forEach(t => {
          if(t.val2 != null && t.val4 == null){
            this.listUnit.push(t);
          }
        });
       
       // this.listRegion.forEach(t => console.log(JSON.stringify(t)));
      },
      err => {
        console.log(err.message)
      })
  }

  onChange(catg){
    console.log(catg.value);
  }

  onChange1(catg){
    console.log(catg.value);
  }

  updateAllComplete() {
    this.allComplete = this.agency != null && this.agency.every(t => t.completed);
  }

  save() {
    console.log(JSON.stringify(this.agency));

    console.log("selected direction: "+this.unite.libelle)
    if (typeof this.unite.val2 === "string" && this.unite.val2.trim().length == 0) {
      this.afbcore.showMessage("DANGER", "Veuillez indiquer le metier.");
      return;
    }

    if (typeof this.unite.libelle === "string" && this.unite.libelle.trim().length == 0) {
      this.afbcore.showMessage("DANGER", "Veuillez indiquer l'unité.");
      return;
    }

    if (typeof this.unite.val3 === "string" && this.unite.val3.trim().length == 0) {
      this.afbcore.showMessage("DANGER", "Veuillez indiquer un responsale.");
      return;
    }
    
    
    var unit : string = '';
    var reg : any
    reg = {}
    reg.codeCategorie = "014";
    reg.val2 = this.unite.val2;
    reg.val3 = this.unite.val3;
    reg.categorie = "REGIONS BANQUE"
    reg.libelle = "REGION-"+this.unite.libelle
    reg.code = "014-REGION-"+this.unite.libelle
    reg.actif="true";

    this.agency.forEach(t => {
      if (t.completed) {
        unit = unit + t.region.code + ";"
      }
    });
   
    unit = unit.substring(0, unit.lastIndexOf(';'));
   
    if (typeof unit === "string" && unit.trim().length == 0 ) {
      this.afbcore.showMessage("DANGER", "Veuillez ajouter au moins une agence.");
      return
    }
    reg.val1 = unit

    console.log(JSON.stringify(reg));

  }

}
