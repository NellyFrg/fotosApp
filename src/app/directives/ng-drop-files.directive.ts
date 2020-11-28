import { Directive, EventEmitter,ElementRef,
                    HostListener, Input, Output } from '@angular/core';
import { runInThisContext } from 'vm';
import { FileItem } from '../models/file-item';


@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any ) {
    this.mouseSobre.emit(true);
    this._prevenirdetener(event);

  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    this.mouseSobre.emit(true);

  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any ) {

    const tranferencia = this._getTransferencia(event);

    if( !tranferencia){
      return;
    }
    this._extraerArchivos( tranferencia.files);
    this._prevenirdetener(event);
    this.mouseSobre.emit(false);

  }

  private _getTransferencia( event: any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos ( archivosLista: FileList){
    //console.log(archivosLista);
      
    for( const propiedad in Object.getOwnPropertyNames( archivosLista) ){
      
      const archivoTemporal = archivosLista[propiedad];

      if( this._archivoPuedeSerCargado(archivoTemporal )){
        const nuevoArchivo = new FileItem( archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }
  }

  //Validaciones
  private _archivoPuedeSerCargado( archivo: File): boolean{
    if ( !this._archivoYaFueDropeado(archivo.name ) && this._esimagen (archivo.type) ) {
      return true;
    }else{
      return false;
    }
  }


  private _prevenirdetener(event ){
      event._prevenirdetener();
      event.stoppropagation();
  }

  private _archivoYaFueDropeado( nombreArchivo: string): boolean{
    for ( const archivo of this.archivos){
      if ( archivo.nombreArchivo == nombreArchivo ){
        console.log('El archivo' + nombreArchivo + 'ya fue agregado');
        return true;

      }
    }
    return false;
  }

  private _esimagen( tipoArchivo: string): boolean{
    return (tipoArchivo === '' || tipoArchivo === undefined)? false: tipoArchivo.startsWith('image');
  }

}
