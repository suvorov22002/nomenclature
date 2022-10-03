import { Pipe, PipeTransform } from '@angular/core';
import { CrudModel } from '../components/crud.model';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform { 

//   transform(employeeData: CrudModel[], searchValue: String): CrudModel[] {
//     if (!employeeData || searchValue){

//       return employeeData; 
//     }
// return employeeData.filter(row  => 
//   row.IdRegistre.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
//   }
transform(employeeData: CrudModel[], searchValue: String): CrudModel[] | null {
  if (!employeeData) return null;
  if( !searchValue){
    return employeeData; 
  }
return employeeData.filter(row  => {
return  JSON.stringify(row).toLowerCase().includes(searchValue.toLowerCase());
})
}


}




