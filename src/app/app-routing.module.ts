import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EditarEmpleadoComponent } from './empleado/editar-empleado/editar-empleado.component';
import { ListarEmpleadoComponent } from './empleado/listar-empleado/listar-empleado.component';
import { RegistroComponent } from './empleado/registro/registro.component';
import { VerEmpleadoComponent } from './empleado/ver-empleado/ver-empleado.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  }, 
  {path: 'listar',component: ListarEmpleadoComponent},
  {path: 'registro',component: RegistroComponent},
  {path: 'ver/:id',component: VerEmpleadoComponent},
  {path: 'editar/:id',component: EditarEmpleadoComponent},
  {
    path: '**',
    redirectTo: 'listar'

  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
