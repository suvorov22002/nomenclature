import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudComponent } from './components/crud/crud.component';
import { BodyComponent } from './body/body.component';
import { NomenclatureComponent } from './nomenclature/nomenclature.component';
import { RegionBanqueComponent } from './region-banque/region-banque.component';
import { RegionRessourceComponent } from './region-ressource/region-ressource.component';
import { RegionUniteComponent } from './region-unite/region-unite.component';


const routes: Routes = [
  {
    path: '',
    component: BodyComponent,
    children: [
      
  { path: 'region/banque', component: RegionBanqueComponent },
  { path: 'region/unite', component: RegionUniteComponent },
  { path: 'region/ressource', component: RegionRessourceComponent },
  { path: 'nomencl', component: NomenclatureComponent },
  { path: '', component: NomenclatureComponent },
  {
    path: '',
    redirectTo: 'nomencl',
    pathMatch: 'full'
  }
]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
