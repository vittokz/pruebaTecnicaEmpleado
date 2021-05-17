import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DxDataGridModule } from 'devextreme-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarEmpleadoComponent } from './empleado/listar-empleado/listar-empleado.component';
import { RegistroComponent } from './empleado/registro/registro.component';
import { VerEmpleadoComponent } from './empleado/ver-empleado/ver-empleado.component';

import { EmpleadoService } from './servicios/empleado.service';
import { EditarEmpleadoComponent } from './empleado/editar-empleado/editar-empleado.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarEmpleadoComponent,
    RegistroComponent,
    VerEmpleadoComponent,
    EditarEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxDataGridModule,
    ReactiveFormsModule,
    HttpClientModule,
   ],
  providers: [EmpleadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
