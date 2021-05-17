import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/modelos/empleado-modelo';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
 

  formEmpleado!: FormGroup;
  empleadoNuevo: Empleado = new Empleado;
 
  opciones!: number;
  edad!: number;
  nombreOpcion!:string;
  bandera!: boolean;
  estadoComision!: boolean;
  listaPaises: any[] = [];
  constructor(private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
    private ruta :Router) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.opciones=0;
    this.bandera=false;
    this.estadoComision = false;
    this.gerServicioPaises();
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
      nombre: ['',Validators.compose([
        Validators.required, Validators.minLength(3)
      ])],
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
   * envia el modelo empleado al servicio para adicionar a la bas de daotos
   */

  addEmpleado(){
    const form = this.formEmpleado.value;
    this.empleadoNuevo.nombre = form.nombre;
    this.empleadoNuevo.fechaNacimiento = form.fechaNacimiento;
    this.empleadoNuevo.pais= form.pais;
    this.empleadoNuevo.nombreUsuario = form.nombreUsuario;
    this.empleadoNuevo.fechaContratacion=form.fechaContratacion;
    this.empleadoNuevo.estado = form.estado;
    this.empleadoNuevo.area = this.nombreOpcion;
    this.empleadoNuevo.cargo = form.cargo;
    this.empleadoNuevo.comision=form.comision;
    this.empleadoService.addEmpleado(this.empleadoNuevo).subscribe(data=>{
      if(data=='ok'){
        this.bandera = true;
        Swal.fire({
          title: 'Correcto!',
          text: 'Se registro el empleado!!!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.ruta.navigateByUrl('/listar');
      }
    });
  }
  /**
   * activa el menu de cargos tecnologia 
   */
  btnTecnologia(){
    this.opciones=1;
    this.nombreOpcion="Tecnologia";
    this.estadoComision=false;
  }
  /**
   * activa el menu de cargos admnistrativos 
   */

  btnAdmin(){
    this.opciones=2;
    this.nombreOpcion="Administrativa";
    this.estadoComision=false;
  }

  /**
   * verifica el cargo para visualizar la comision
   */
  verificarCargo(evento: any){
     if(evento.target.value=='Fundador y CEO'){
      this.estadoComision=true;
     }else{
      this.estadoComision=false;
     }
  }
  /**
   * verifica fecha de nacimiento mayor a 18 años
   */
   verificarFecha(evento: any){
    const convertir = new Date(evento.target.value);
    const tiempo = Math.abs(Date.now()- convertir.getTime());
    this.edad = Math.floor((tiempo/(1000*3600*24))/365);
 }
}


