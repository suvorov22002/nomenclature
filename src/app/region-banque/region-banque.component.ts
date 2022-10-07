import { Component, OnInit } from '@angular/core';
import { AfbcoreService } from 'afbcore';
import { ConsultService } from '../service/consult.service';

@Component({
  selector: 'app-region-banque',
  templateUrl: './region-banque.component.html',
  styleUrls: ['./region-banque.component.css']
})
export class RegionBanqueComponent implements OnInit {

  obj:any;
  collapseShow : boolean = false;
  collapseShow1 : boolean = true;
  region?:any
  afbcolor:any; 
  listRegion?: any; //liste de toutes les regions
  allComplete: boolean = false;
  prop_in: boolean = false;
  agency: Array<any> =  [
    {name: 'Hippodromme', code: '00001', completed: false},
    {name: 'Bonanjo', code: '00002', completed: false},
    {name: 'Bafoussam', code: '00003', completed: false},
    {name: 'New-Bell', code: '00004', completed: false},
    {name: 'Messa', code: '00005', completed: false},
    {name: 'Bamenda', code: '00007', completed: false},
    {name: 'Garoua', code: '00008', completed: false},
    {name: 'Retraite', code: '00010', completed: false},
    {name: 'Nkongsamba', code: '00012', completed: false},
    {name: 'Kousseri', code: '00013', completed: false},
    {name: 'Limbé', code: '00015', completed: false},
    {name: 'Mboppi', code: '00016', completed: false},
    {name: 'Akwa', code: '00017', completed: false},
    {name: 'Maroua', code: '00018', completed: false},
    {name: 'Ngaoundéré', code: '00019', completed: false},
    {name: 'Ndokoti', code: '00020', completed: false},
    {name: 'Etoudi', code: '00021', completed: false},
    {name: 'Bonamoussadi', code: '00022', completed: false},
    {name: 'Akwa Millénium', code: '00024', completed: false},
    {name: 'Biyem-Assi', code: '00013', completed: false},
    {name: 'Mvog-Mbi', code: '00025', completed: false},
    {name: 'Bonaberi', code: '00027', completed: false},
    {name: 'Kribi', code: '00028', completed: false},
    {name: 'Douala-Dakar', code: '00029', completed: false},
    {name: 'Fenêtre-Islamique', code: '00042', completed: false}
  ];

  constructor(private api: ConsultService, private afbcore:AfbcoreService) { }

  ngOnInit() {
    this.region = {}
    this.region.libelle = ""
    this.afbcolor = 'warn';
    this.obj = {};
    this.obj.actif = true;
    this.obj.categorie = "REGIONS BANQUE";
    this.searchRegion(this.obj);
  }

  toggleCollapseShow() {
    this.collapseShow = true;
    this.collapseShow1 = !this.collapseShow;
    this.setAll(this.allComplete);
    this.region.libelle = ""
    this.prop_in = !this.prop_in;
  }
  toggleCollapseShow1() {
    this.collapseShow1 = true;
    this.collapseShow = !this.collapseShow1;
   // this.obj = {};
   // this.obj.actif = true;
    //this.obj.categorie = "REGIONS BANQUE";
    this.searchRegion(this.obj);
    this.prop_in = !this.prop_in;
  }

  updateAllComplete() {
    this.allComplete = this.agency != null && this.agency.every(t => t.completed);
  }

  setAll(completed: boolean) {
    console.log(completed)
    if (this.agency == null) {
      return;
    }
    this.agency.forEach(t => (t.completed = completed)); //change all
  }

  save(){
    console.log("selected agency: "+this.region.libelle)
    if (typeof this.region.libelle === "string" && this.region.libelle.trim().length == 0) {
      this.afbcore.showMessage("DANGER", "Veuillez indiquer une region.");
      return;
    }
    
    var unit : string = '';
    var reg : any
    reg = {}
    reg.codeCategorie = "014";
    reg.categorie = "REGIONS BANQUE"
    reg.libelle = "REGION "+this.region.libelle
    reg.code = "014-REGION-"+this.region.libelle
    reg.actif="true";
   
    this.agency.forEach(t => {
      if (t.completed) {
        unit = unit + t.code + ";"
      }
    });
   
    unit = unit.substring(0, unit.lastIndexOf(';'));
   
    if (typeof unit === "string" && unit.trim().length == 0 ) {
      this.afbcore.showMessage("DANGER", "Veuillez ajouter au moins une agence.");
      return
    }
    
    reg.val1 = unit
    //console.log(JSON.stringify(reg))

    this.api.addCategorie(reg)
        .subscribe(res => {
          this.afbcore.showMessage('SUCCESS', "Region ajoutée avec succes.")
          this.searchRegion(this.obj);
        },
        err => {
            console.log(err.message);
        });
  
  }

  searchRegion(info) {
    this.listRegion = [];
    this.api.searhCateg(info)
      .subscribe(res => {
        res.datas.forEach(t => {
          if(t.val2 == null){
            this.listRegion.push(t);
          }
        });
       
       // this.listRegion.forEach(t => console.log(JSON.stringify(t)));
      },
      err => {
        console.log(err.message)
      })
  }

  new() {
    this.setAll(this.allComplete);
    this.region.libelle = ""
  }


}
