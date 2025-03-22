import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearFormularioComponent } from './pages/crear-formulario/crear-formulario.component';

const routes: Routes = [
  {
    path: '',
    component: CrearFormularioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioRoutingModule { }