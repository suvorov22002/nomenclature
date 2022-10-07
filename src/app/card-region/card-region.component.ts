import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-region',
  templateUrl: './card-region.component.html',
  styleUrls: ['./card-region.component.css']
})
export class CardRegionComponent implements OnInit {

  @Input('regdata')  listRegion:any;
  info?:any;
  cols: Array<any> =  [
    {header: 'Code',field: 'code'},
    {header: 'Libelle', field: 'libelle'},
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
