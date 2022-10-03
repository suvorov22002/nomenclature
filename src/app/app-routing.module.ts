import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudComponent } from './components/crud/crud.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BodyComponent } from './body/body.component';
import { NomenclatureComponent } from './nomenclature/nomenclature.component';


const routes: Routes = [
  {
    path: '',
    component: BodyComponent,
    children: [
      
  { path: 'workflow/dashboard', component: DashboardComponent },
  { path: 'nomencl', component: NomenclatureComponent },
  { path: 'crud', component: CrudComponent },
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
