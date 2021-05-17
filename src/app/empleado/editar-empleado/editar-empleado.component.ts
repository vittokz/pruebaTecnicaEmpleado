import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/modelos/empleado-modelo';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {
  dato!: {
    id:string
  };
  opciones!: number;
  edad!: number;
  nombreOpcion!:string;
  areaSelec!:any;
  cargo!:any;
  id!:any;
  nombreEmpleado!:any;
  empleadoNuevo: Empleado = new Empleado;
  bandera!: boolean;
  estadoComision!: boolean;
  empleadoEditar!: Empleado[] ;
  listaPaises: any[] = [];
  formEmpleado!: FormGroup;
  constructor(private rutaActiva: ActivatedRoute,
    private ruta :Router,
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.dato = {
      id: this.rutaActiva.snapshot.params.id
    };
    this.crearFormulario();
    this.gerServicioPaises();
    this.getEmpleadoById(this.dato.id);
  }
    /**
   * consumir servicio para traer nombres de paises de america
   */
     gerServicioPaises() {
      this.empleadoService.getPaises().subscribe(data=>{
        this.listaPaises = data;
      })
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
      estado: [''],
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
      this.id = this.empleadoEditar[0].id;
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

  editarEmpleado(){
    const form = this.formEmpleado.value;
    this.empleadoNuevo.id = this.id;
    this.empleadoNuevo.nombre = this.nombreEmpleado;
    this.empleadoNuevo.fechaNacimiento = form.fechaNacimiento;
    this.empleadoNuevo.pais= form.pais;
    this.empleadoNuevo.nombreUsuario = form.nombreUsuario;
    this.empleadoNuevo.fechaContratacion=form.fechaContratacion;
    this.empleadoNuevo.estado = form.estado;
    this.empleadoNuevo.area = this.areaSelec;
    this.empleadoNuevo.cargo = form.cargo;
    this.empleadoNuevo.comision=form.comision;
    this.empleadoService.editarEmpleado(this.empleadoNuevo).subscribe(data=>{
      if(data=='ok'){
        Swal.fire({
          title: 'Correcto!',
          text: 'Se edito el empleado!!!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.ruta.navigateByUrl('/listar');
      }
    });
  }

}
