import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudTableComponent } from './table/crud-table/crud-table.component';

const routes: Routes = [
  { path: '', component: CrudTableComponent , data: { title: 'Home-TEST page' }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
