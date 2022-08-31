import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ImageCroppedEvent, LoadedImage,base64ToFile } from 'ngx-image-cropper';



@Component({
  selector: 'app-pictureEdit',
  templateUrl: './pictureEdit.component.html',
  styleUrls: ['./pictureEdit.component.css']
})
export class PictureEditComponent implements OnInit, AfterViewInit {
  @ViewChild('inputFile') someInput: ElementRef;
  @Output() pictureSelected: EventEmitter<Object> = new EventEmitter()

  isLoading = false;
  teste:any
  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.someInput.nativeElement.click();

  }

  closeModal(){
    this.pictureSelected.emit({url: this.croppedImage, blob:this.teste});
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      this.isLoading = true;
  }
  async imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;

      this.teste = base64ToFile(String(event.base64));
  }
  imageLoaded(image: LoadedImage) {
  }
  cropperReady() {
    this.isLoading = false;
  }

  startCropImage(){
  }
  loadImageFailed() {
      console.log('cancelei')
  }
}
