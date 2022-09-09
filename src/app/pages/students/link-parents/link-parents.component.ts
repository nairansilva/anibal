import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-link-parents',
  templateUrl: './link-parents.component.html',
  styleUrls: ['./link-parents.component.css']
})
export class LinkParentsComponent implements OnInit {
  id: string = '';
  constructor(private route: ActivatedRoute) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
  }

}
