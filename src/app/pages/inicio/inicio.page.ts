import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public usuario: Usuario;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router

    
  ) { 
    this.usuario = new Usuario('','','','','','','',
      NivelEducacional.findNivelEducacionalById(1)!,undefined
    );

    this.activatedRoute.queryParams.subscribe(params => { 
      const nav = this.router.getCurrentNavigation();
      if (nav){
        if (nav.extras.state){
          this.usuario = nav.extras.state['usuario'];
          return;
        }
      }
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {
  }

}
