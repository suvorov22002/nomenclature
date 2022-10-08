import { Component, OnInit } from '@angular/core';
import { AfbcoreService } from 'afbcore';
import { ConsultService } from '../service/consult.service';

@Component({
  selector: 'app-region-ressource',
  templateUrl: './region-ressource.component.html',
  styleUrls: ['./region-ressource.component.css']
})
export class RegionRessourceComponent implements OnInit {

  obj:any;
  collapseShow : boolean = false;
  collapseShow1 : boolean = true;
  resource?:any
  afbcolor:any; 
  listUnit?: any; //liste de toutes les regions
  allComplete: boolean = false;
  prop_in: boolean = false;
  region ?: any;
  users : any [];
  units: Array<any> =  [
    
  ]
  agencies: Array<any> =  [
    
  ]
  agence : string;
  ressources: Array<any> =  [
    
  ]
  selRessources: Array<any> =  [
    
  ]
  

  constructor(private api: ConsultService, private afbcore:AfbcoreService) { }

  ngOnInit() {
    this.resource = {}
    this.resource.libelle = ""
    this.afbcolor = 'warn';

    this.obj = {};
    this.obj.actif = true;
    this.obj.categorie = "REGIONS BANQUE";
    this.searchUnit(this.obj);
  }

  toggleCollapseShow() {
    this.collapseShow = true;
    this.collapseShow1 = !this.collapseShow;
  //  this.setAll(this.allComplete);
    this.resource.libelle = ""
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
  //  this.searchUnit(this.obj);
    this.prop_in = !this.prop_in;
  }

  searchUnit(info) {
    this.api.searhCateg(info)
      .subscribe(res => {
        res.datas.forEach(t => {
          if(t.val2 != null && t.val4 == null){
            this.units.push(t);
          }
        //  console.log(JSON.stringify(this.units))
        });
      },
      err => {
        console.log(err.message)
      })
  }

  async onChange(catg){
    console.log(catg.value);
    var res = catg.value.val1
    var regions = res.split(';')
    var info;
    var dir;
    this.agence = '';
    this.agencies = []
    this.ressources = []
    this.users = []

    var val;
    
    for(var i=0;i< regions.length;i++){
      val = regions[i]
      info = {};
      info.actif = true;
      info.categorie = "REGIONS BANQUE";
      info.code = val
       this.searchRegion(info)
    }
     
/*
    regions.forEach(async val => {
      info = {};
      info.actif = true;
      info.categorie = "REGIONS BANQUE";
      info.code = val
      await this.searchRegion(info)
    });
*/
    dir = {}
    dir.service = 'DCE' //catg.value.val2
    this.selectRessources(dir)

    console.log("this.agence ",JSON.stringify(this.agencies))
  }

  onChange1(catg){
    //console.log(catg.value);
    this.selRessources = catg.value
    this.selRessources.forEach(s => {
      console.log(s.codeAge+' : '+s.firstname)
    })
  }

 searchRegion(info) {
    var sel = [];
    this.api.searhCateg(info)
      .subscribe(res => {
        res.datas.forEach(t => {
          if(t.val2 == null){
            //console.log("t.libelle ",t.libelle)
            //console.log("t.val1 ",t.val1)
            sel = t.val1.split(';')
            sel.forEach(s => {
              this.agencies.push(s)
            });
          }
        });
      },
      err => {
        console.log(err.message)
      })
  }

  selectRessources(data) {

    this.api.searchRessources(data)
      .subscribe(res => {
        this.ressources = res
      //  console.log("ressources: "+JSON.stringify(res))
      },
      err =>{

      });
  }

  save() {
    console.log("ressources: "+JSON.stringify(this.selRessources))
  }


}
