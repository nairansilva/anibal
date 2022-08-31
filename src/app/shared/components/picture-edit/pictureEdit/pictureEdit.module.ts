import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureEditComponent } from './pictureEdit.component';
import { ImageCropperModule} from 'ngx-image-cropper'
import { PoAvatarModule, PoButtonModule, PoFieldModule, PoLoadingModule } from '@po-ui/ng-components';

@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule,
    PoAvatarModule,
    PoFieldModule,
    PoButtonModule,
    PoLoadingModule
  ],
  declarations: [PictureEditComponent],
  exports:[PictureEditComponent]
})
export class PictureEditModule { }
