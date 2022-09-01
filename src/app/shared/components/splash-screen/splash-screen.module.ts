import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[SplashScreenComponent],
  declarations: [SplashScreenComponent]
})
export class SplashScreenModule { }
