import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/modelos/empleado-modelo';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css'],
})
export class ListarEmpleadoComponent implements OnInit {
  listaEmpleados: Empleado[] = [];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.getDatosEmpleados();
  }
  /**
   * metodo que llama a servicio empleados
   */
  getDatosEmpleados() {
    this.empleadoService.listEmpleados().subscribe((data) => {
      this.listaEmpleados = data;
    });
  }

  /**
   * metodo que llama al servicio para eliminar empleado por id
   */
  eliminarEmpleado(id: string) {
    this.empleadoService.deletetEmpleadoById(id).subscribe((data) => {
      if (data) {
        Swal.fire({
          title: 'Correcto!',
          text: 'Se eliminó el empleado!!!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.getDatosEmpleados();
      }
    });
  }
}
