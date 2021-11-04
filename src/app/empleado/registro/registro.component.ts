import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/modelos/empleado-modelo';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  formEmpleado!: FormGroup;
  empleadoNuevo: Empleado = new Empleado();

  bandera!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
    private ruta: Router
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.bandera = false;
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
   * envia el modelo empleado al servicio para adicionar a la bas de daotos
   */

  addEmpleado() {
    const form = this.formEmpleado.value;
    this.empleadoNuevo.id = Math.random();
    this.empleadoNuevo.firstName = form.firstName;
    this.empleadoNuevo.lastName = form.lastName;
    this.empleadoNuevo.documentNumber = form.documentNumber;
    this.empleadoNuevo.Title = form.Title;
    this.empleadoNuevo.avatar = form.avatar;
    this.empleadoService.addEmpleado(this.empleadoNuevo).subscribe((data) => {
      if (data) {
        this.bandera = true;
        Swal.fire({
          title: 'Correcto!',
          text: 'Se registro el empleado!!!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.ruta.navigateByUrl('/listar');
      }
    });
  }
}
