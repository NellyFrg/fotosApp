import { Directive, EventEmitter,ElementRef,
                    HostListener, Input, Output } from '@angular/core';
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

  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    this.mouseSobre.emit(true);

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
