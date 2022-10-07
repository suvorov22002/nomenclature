import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-unite',
  templateUrl: './card-unite.component.html',
  styleUrls: ['./card-unite.component.css']
})
export class CardUniteComponent implements OnInit {

  @Input('unitdata')  listUnit:any;
  info?:any;
  cols: Array<any> =  [
    {header: 'Code',field: 'code'},
    {header: 'Libelle', field: 'libelle'},
    {header: 'Responsable', field: 'val3'},
    {header: 'Action', field: ''}
  ]

  constructor() { }

  ngOnInit() {
    this.info = {}
    this.info.code = ""
    this.info.codecat = ""
    this.info.categ = ""
    this.info.libelle = ""
  }

}
