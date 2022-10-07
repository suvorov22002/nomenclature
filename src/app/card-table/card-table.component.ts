import { Component, Input, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material';
import { AfbcoreService } from 'afbcore';
import { DialogService } from 'primeng/dynamicdialog';
import { DeleteComponent } from '../components/delete/delete.component';
import { EditformComponent } from '../components/editform/editform.component';
import { ParamformComponent } from '../components/paramform/paramform.component';
import { ConsultService } from '../service/consult.service';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.css'],
  providers: [DialogService]
})
export class CardTableComponent implements OnInit {

  @Input('nomendata')  nomendata:any;
  info?:any;
  nomenData?: any;
  cols: Array<any> =  [
    {header: 'Code',field: 'code'},
    {header: 'Categorie', field: 'categorie'},
    {header: 'Libelle', field: 'libelle'},
    //{header: 'Action', field:'actif'}
  ]

  constructor(private api: ConsultService, private afbcore:AfbcoreService, private dialogService: DialogService) { 
    this.info = {}
    this.info.code = ""
    this.info.codecat = ""
    this.info.categ = ""
    this.info.libelle = ""
  }

  ngOnInit() {
  }

  search(info) {
    this.api.searhCateg(info)
        .subscribe(res => {
          this.nomendata = res.datas;
        },
          err => {
          })
  }

  onView(obj) {
    let data = obj;
    const ref = this.dialogService.open(ParamformComponent, {
      width: 'auto',
      closeOnEscape: false,
      header: 'INFORMATION',
      data: { obj: data }
    });
    ref.onClose.subscribe(res => {

    })
  }

  onEditmat(obj) {
    let data = obj;
    const ref = this.dialogService.open(EditformComponent, {
      width: 'auto',
      closeOnEscape: false,
      header: 'EDITER CATEGORIE',
      data: { obj: data }
    });
    ref.onClose.subscribe(res => {
    })
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  }


  onDeletemat(obj) {
    let data = obj;
    const ref = this.dialogService.open(DeleteComponent, {
      closeOnEscape: false,
      data: { obj: data }
    });
    ref.onClose.subscribe(res => {

    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
