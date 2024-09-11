import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {
  public correo: string = '';

  constructor(
    private router: Router
  ) 
  { 

  }

  ngOnInit() {
  }

  public ingresarPaginaValidarRespuestaSecreta():void{
    const usuario = new Usuario('','','','','','','',
      NivelEducacional.findNivelEducacionalById(1)!, undefined);
    const usuarioEncontrado = usuario.buscarUsuarioPorCorreo(this.correo);
    if (!usuarioEncontrado){
      alert('El correo no existe dentro del sistema');
    }else{
      const navigationExtras: NavigationExtras ={
        state:{
          usuario: usuarioEncontrado
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    }
  }

}
