import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from 'src/app/modelos/empleado-modelo';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-ver-empleado',
  templateUrl: './ver-empleado.component.html',
  styleUrls: ['./ver-empleado.component.css'],
})
export class VerEmpleadoComponent implements OnInit {
  dato!: {
    id: string;
  };

  nombreEmpleado!: any;
  bandera!: boolean;
  empleadoEditar: Empleado = new Empleado();
  formEmpleado!: FormGroup;
  constructor(
    private rutaActiva: ActivatedRoute,
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
}
