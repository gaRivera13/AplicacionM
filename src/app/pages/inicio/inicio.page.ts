import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit , AfterViewInit {
  @ViewChild('titulo',({read: ElementRef}) itemTitulo : ElementRef;

  public usuario: Usuario = new Usuario('','','','','','','',
    NivelEducacional.findNivelEducacionalById(1)!,undefined);

  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();

  constructor(
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private animationController: AnimationController
  )

  { 
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

  ngAfterContentInit(): void{
    throw new Error('Method not implemente.');
  }

  public ngOnInit(): void {

  }

  public ngAfterViewInit(): void {
    if(this.itemTitulo){
      const animation = this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform','translate(0%)','translate(100%)')
      .fromTo('opacity',0.2,1);
    }
  }

  public limpiar1(): void{
  }

  public limpiar2(): void{
  }

  public animateItem1(elementRef: any, duration:number){

  }
  public animateItem2(elementRef: any, duration:number){
  }

  createPageTurnAnimation(){
    
  }
}
