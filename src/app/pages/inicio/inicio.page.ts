import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asistencia } from 'src/app/model/asistencia';
import { Usuario } from 'src/app/model/usuario';
import jsQR, { QRCode } from 'jsqr';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})

export class InicioPage implements OnInit {

  @ViewChild('fileinput', { static: false }) private fileinput!: ElementRef;
  @ViewChild('video', { static: false }) private video!: ElementRef;
  @ViewChild('canvas', { static: false }) private canvas!: ElementRef;

//  @ViewChild('video') private video!: ElementRef;
//  @ViewChild('canvas') private canvas!: ElementRef;


//  public usuario: Usuario;
  public asistencia: Asistencia = new Asistencia();
  public escaneando = false;
  public datosQR: string = '';
  public loading: HTMLIonLoadingElement = null;

  public bloqueInicio: number = 0;
  public bloqueTermino: number = 0;
  public dia: string ='';
  public horaFin: string ='';
  public horaInicio: string ='';
  public idAsignatura: string ='';
  public nombreAsignatura: string ='';
  public nombreProfesor: string ='';
  public seccion: string ='';
  public sede: string ='';


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController
  )
  { 
  //  this.usuario = new Usuario();
  //  this.usuario.recibirUsuario(activatedRoute,router);
  }

  
  ngOnInit() {
  }

  public obtenerDatosQR(source?: CanvasImageSource): boolean {
    let w = 0;
    let h = 0;

    if (!source) {
      this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
      this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
    }

    w = this.canvas.nativeElement.width;
    h = this.canvas.nativeElement.height;

    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(source? source : this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert'});
    if (qrCode) {
      this.escaneando = false;
      this.datosQR = qrCode.data;
      this.mostrarDatosQROrdenados(this.datosQR);
    }
    return this.datosQR !== '';
  //  const w: number = this.video.nativeElement.videoWidth;
  //  const h: number = this.video.nativeElement.videoHeight;
  //  this.canvas.nativeElement.width = w;
  //  this.canvas.nativeElement.height = h;
  //  const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
  //  context.drawImage(this.video.nativeElement, 0 , 0, w, h);
  //  const img: ImageData = context.getImageData(0, 0, w, h);
  //  let qrCode: QRCode | null = jsQR(img.data, w, h, {inversionAttempts: 'dontInvert'});
  //  if (qrCode){
  //    if(qrCode.data !== ''){
  //      this.escaneando = false;
  //      this.mostrarDatosQROrdenados(qrCode.data);
  //      return true;
  //    }
  //  }
  //  return false;
  }

  public mostrarDatosQROrdenados(datosQR: string): void{
    //  this.datosQR = datosQR;
      const objetoDatosQR = JSON.parse(datosQR);
      this.bloqueInicio = objetoDatosQR.bloqueInicio;
      this.bloqueTermino = objetoDatosQR.bloqueTermino;
      this.dia = objetoDatosQR.dia;
      this.horaFin = objetoDatosQR.horaFin;
      this.horaInicio = objetoDatosQR.horaFin;
      this.idAsignatura = objetoDatosQR.idAsignatura;
      this.nombreAsignatura = objetoDatosQR.nombreAsignatura;
      this.nombreProfesor = objetoDatosQR.nombreProfesor;
      this.seccion = objetoDatosQR.seccion;
      this.sede = objetoDatosQR.sede;
    }

  public cargarImagenDesdeArchivo(): void{
    //this.limpiarDatos();
    this.fileinput.nativeElement.click();
  }

  public verificarArchivoConQR(files: FileList): void{
    const file = files.item(0);
    const img = new Image();
    img.onload = () => {
      this.obtenerDatosQR(img);
    }
    img.src = URL.createObjectURL(file);
  }

  public async comenzarEscaneoQR() {
    //this.limpiarDatos();
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.loading = await this.loadingController.create({});
    await this.loading.present();
    this.video.nativeElement.play();
    requestAnimationFrame(this.verificarVideo.bind(this));
    //this.escaneando = true;
  }

  async verificarVideo(){
    if ( this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA){
      if(this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.escaneando = true;
      }
      if (this.obtenerDatosQR()) {
        console.log('datos obtenidos');
      }else{
        if (this.escaneando){
          console.log('escaneando...');
          requestAnimationFrame(this.verificarVideo.bind(this));
        }
      }
    }else{
      console.log('video aun no tiene datos...');
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  public limpiarDatos() {
    this.escaneando = false;
    this.datosQR = '';
    this.loading = null;
    (document.getElementById('input-file')  as HTMLInputElement).value ='';
  }


  //navegar(pagina: string){
  //  this.usuario.navegarEnviandousuario(this.router.pagina);
  //}
}
