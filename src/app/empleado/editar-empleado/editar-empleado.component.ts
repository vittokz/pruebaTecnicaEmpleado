import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/modelos/empleado-modelo';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css'],
})
export class EditarEmpleadoComponent implements OnInit {
  dato!: {
    id: string;
  };
  opciones!: number;
  edad!: number;
  nombreOpcion!: string;
  areaSelec!: any;
  cargo!: any;
  id!: any;
  nombreEmpleado!: any;
  empleadoNuevo: Empleado = new Empleado();
  bandera!: boolean;
  estadoComision!: boolean;
  empleadoEditar: Empleado = new Empleado();
  listaPaises: any[] = [];
  formEmpleado!: FormGroup;
  constructor(
    private rutaActiva: ActivatedRoute,
    private ruta: Router,
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService
  ) {}

  ngOnInit(): void {
    this.dato = {
      id: this.rutaActiva.snapshot.params.id,
    };
    this.crearFormulario();

    this.getEmpleadoById(this.dato.id);
  }

  /**
   * crea el fomulario de empleados ya que es un formulario reactivo
   */
  crearFormulario() {
    this.formEmpleado = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      documentNumber: ['', Validators.required],
      Title: ['', Validators.required],
      avatar: ['', Validators.required],
    });
  }
  /**
   * consultar servicio con id empleado
   */
  getEmpleadoById(id: string) {
    this.empleadoService.getEmpleadoById(id).subscribe((data) => {
      this.empleadoEditar = data;
      this.nombreEmpleado = this.empleadoEditar.firstName;
      this.id = this.empleadoEditar.id;
      this.asignarValoresForm(this.empleadoEditar);
    });
  }

  asignarValoresForm(empleado: Empleado) {
    this.formEmpleado.controls['firstName'].setValue(empleado.firstName);
    this.formEmpleado.controls['lastName'].setValue(empleado.lastName);
    this.formEmpleado.controls['documentNumber'].setValue(
      empleado.documentNumber
    );
    this.formEmpleado.controls['Title'].setValue(empleado.Title);
    this.formEmpleado.controls['avatar'].setValue(empleado.avatar);
  }

  editarEmpleado() {
    const form = this.formEmpleado.value;
    this.empleadoNuevo.id = this.id;
    this.empleadoNuevo.firstName = form.firstName;
    this.empleadoNuevo.lastName = form.lastName;
    this.empleadoNuevo.documentNumber = form.documentNumber;
    this.empleadoNuevo.Title = form.Title;
    this.empleadoNuevo.avatar = form.avatar;

    this.empleadoService
      .editarEmpleado(this.empleadoNuevo)
      .subscribe((data) => {
        if (data) {
          Swal.fire({
            title: 'Correcto!',
            text: 'Se edito el empleado!!!',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          this.ruta.navigateByUrl('/listar');
        }
      });
  }
}
