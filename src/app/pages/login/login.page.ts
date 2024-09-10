import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public usuario: Usuario;

  constructor(
    private toastController: ToastController,
    private router: Router
  ) { 
    this.usuario = new Usuario ('','','','','','','',
    NivelEducacional.findNivelEducacionalById(1)!,undefined);
    this.usuario.cuenta ='atorres';
    this.usuario.password ='1234';
  }

  public ngOnInit(): void {
    //if (this.usuario.correo !== '') this.ingresar();
  }

   public ingresar(): void {
    if(this.usuario){
      
      if (!this.validarUsuario(this.usuario)) return;
       
      const usu: Usuario | undefined = this.usuario.buscarUsuarioValido(
        this.usuario.cuenta, this.usuario.password);
        
      if (usu) {
        const navigationExtras: NavigationExtras = {
           state: {
            usuario: usu
          }
        };
        this.mostrarMensaje('Bienvenido!');
        this.router.navigate(['/inicio'], navigationExtras);
      }
    }
  }

  public validarUsuario(usuario: Usuario): boolean{
    const mensajeError = usuario.validarUsuario();
    if(mensajeError){
      this.mostrarMensaje(mensajeError);
      return false;
    }
    return true;
  }

  async mostrarMensaje (mensaje: string, duracion?: number){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion? duracion:2000
    });
    toast.present();
  }

}