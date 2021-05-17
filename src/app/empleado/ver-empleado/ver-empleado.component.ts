import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from 'src/app/modelos/empleado-modelo';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-ver-empleado',
  templateUrl: './ver-empleado.component.html',
  styleUrls: ['./ver-empleado.component.css']
})
export class VerEmpleadoComponent implements OnInit {
  dato!: {
    id:string
  };
  opciones!: number;
  edad!: number;
  nombreOpcion!:string;
  areaSelec!:any;
  cargo!:any;
  nombreEmpleado!:any;
  bandera!: boolean;
  estadoComision!: boolean;
  empleadoEditar!: Empleado[] ;
  formEmpleado!: FormGroup;
  constructor(private rutaActiva: ActivatedRoute,
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.dato = {
      id: this.rutaActiva.snapshot.params.id
    };
    this.crearFormulario();
    this.getEmpleadoById(this.dato.id);
  }

  /**
   * crea el fomulario de empleados ya que es un formulario reactivo
   */
  crearFormulario() {
    this.formEmpleado = this.formBuilder.group({
      fechaNacimiento: ['', Validators.required],
      pais: ['', Validators.required],
      nombreUsuario:  ['',Validators.compose([
        Validators.required, Validators.minLength(3)
      ])],
      fechaContratacion: ['', Validators.required],
      estado: ['', Validators.required],
      cargo: ['', Validators.required],
      comision: [''],
    });
  }
   /**
   * consultar servicio con id empleado
   */
  getEmpleadoById(id: string) {
    this.empleadoService.getEmpleadoById(id).subscribe(data=>{
      this.empleadoEditar =data;
      this.nombreEmpleado = this.empleadoEditar[0].nombre;
      this.areaSelec = this.empleadoEditar[0].area;
      this.cargo = this.empleadoEditar[0].cargo;
      this.asignarValoresForm(this.empleadoEditar);
    });
  }

  asignarValoresForm(empleado: Empleado[]){
    this.formEmpleado.controls['fechaNacimiento'].setValue(empleado[0].fechaNacimiento);
    this.formEmpleado.controls['pais'].setValue(empleado[0].pais);
    this.formEmpleado.controls['nombreUsuario'].setValue(empleado[0].nombreUsuario);
    this.formEmpleado.controls['fechaContratacion'].setValue(empleado[0].fechaContratacion);
    this.formEmpleado.controls['estado'].setValue(empleado[0].estado);
    this.formEmpleado.controls['cargo'].setValue(empleado[0].cargo);
    this.formEmpleado.controls['comision'].setValue(empleado[0].comision);  
  }
}
