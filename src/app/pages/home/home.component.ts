import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides: string[]
  constructor() {
    this.slides = [
      '../../../assets/slide-home/slide-1.jpg',
      '../../../assets/slide-home/slide-2.jpg',
      '../../../assets/slide-home/slide-3.jpg',
      '../../../assets/slide-home/slide-4.jpg',
      '../../../assets/slide-home/slide-5.jpg',
    ]
  }

  ngOnInit(): void {
  }

}
