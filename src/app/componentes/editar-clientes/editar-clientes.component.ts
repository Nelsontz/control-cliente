import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClientesComponent implements OnInit {
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }
  id!:string;

  constructor(private clientesServicios: ClienteServicio,
    private flashMessages: FlashMessagesService,
    private route: ActivatedRoute,
    private router: Router    
    ){ }

  ngOnInit() {
    this.id= this.route.snapshot.params['id'];
    this.clientesServicios.getCliente(this.id).subscribe( cliente =>{
      this.cliente = cliente;
    })
  }

  guardarCliente({value,valid}: NgForm){
    if(!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente'),{
        cssClass: 'alert-danger', timeout: 4000
      };
    }
    else{
      value.id = this.id;
      // modificar el cliente
      this.clientesServicios.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }
  eliminar(){
    if(confirm('seguro que desea elimiar el cliente?')){
      this.clientesServicios.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
  }

}
}
