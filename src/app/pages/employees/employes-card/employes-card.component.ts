import { EmployeesInterface } from './../shared/employees.model';
import { Component, Input, OnInit } from '@angular/core';
import { PoInfoOrientation } from '@po-ui/ng-components';

@Component({
  selector: 'app-employes-card',
  templateUrl: './employes-card.component.html',
  styleUrls: ['./employes-card.component.css']
})
export class EmployesCardComponent implements OnInit {
  @Input() employee:EmployeesInterface
  poInfoOrientation:PoInfoOrientation = PoInfoOrientation.Horizontal
  constructor() { }

  ngOnInit(): void {
  }

}
