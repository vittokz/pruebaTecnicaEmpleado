import { Component, OnInit } from '@angular/core';
import { Empleado } from './modelos/empleado-modelo';
import { EmpleadoService } from './servicios/empleado.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'empleados'; 
}
