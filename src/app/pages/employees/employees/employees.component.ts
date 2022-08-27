import { EmployeesService } from './../shared/employees.service';
import { EmployeesInterface } from './../shared/employees.model';
import { Component, OnInit } from '@angular/core';
import { PoTableAction } from '@po-ui/ng-components';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  reactiveForm: FormGroup;
  employees: EmployeesInterface[];
  employeesDisplayed: EmployeesInterface[];
  private subscription: Subscription;

  public actions: Array<PoTableAction> = [
    {
      icon: 'po-icon-plus',
      label: 'Incluir',
      action: this.newEmployee.bind(this)
    }

  ];
  constructor(private employeesService: EmployeesService,   private fb: FormBuilder
    ) {
    this.criaFormularioPesquisar();
  }

  ngOnInit(): void {
    this.employeesService.getAll().subscribe(
      {
        next: (res) => {
          console.log(res);
          this.employees = res;
          this.employeesDisplayed = this.employees;
        }

      }
    )

    this.subscription = this.reactiveForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(
      res => {
        if( res.pesquisa.length > 0) {
          this.employeesDisplayed = this.employees.filter(employee => employee.name.includes(res.pesquisa))
        } else {
          this.employeesDisplayed = this.employees
        }
      }
    )
  }

  criaFormularioPesquisar(): void {
    this.reactiveForm = this.fb.group({
      pesquisa: [''],
    });
  }

  newEmployee(): void {
    alert('inclui')
  }

}
