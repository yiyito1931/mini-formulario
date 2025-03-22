import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioRoutingModule } from './formulario-routing.module';
import { CrearFormularioComponent } from './pages/crear-formulario/crear-formulario.component';

@NgModule({
  imports: [
    CommonModule,
    FormularioRoutingModule,
    CrearFormularioComponent // Importar el componente standalone
  ]
})
export class FormularioModule { }