import { BaseResourceFirebaseService } from 'src/app/shared/service/base-resource-firebase.service';
import { Router } from '@angular/router';
import { EmployeesService } from './../shared/employees.service';
import { EmployeesInterface } from './../shared/employees.model';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoTableAction, PoUploadComponent } from '@po-ui/ng-components';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  @Input() value: any;
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  close: PoModalAction = {
    action: () => {
      this.recebeFormulario();
    },
    label: 'Cancelar',
    danger: true
  };

  employees: EmployeesInterface[];
  employeesDisplayed: EmployeesInterface[];

  resume: string;
  isLoading: boolean = true;
  includeEmployee = false;

  private subscription: Subscription;

  public actions: Array<PoTableAction> = [
    {
      icon: 'po-icon-plus',
      label: 'Incluir',
      action: this.newEmployee.bind(this)
    }

  ];
  constructor(private employeesService: EmployeesService, private router: Router
  ) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    this.subscription = this.employeesService.getAll().subscribe(
      {
        next: (res) => {
          this.isLoading = false;
          this.employees = res;
          this.employeesDisplayed = this.employees;
        }

      }
    )
  }


  recebeFormulario() {
    this.includeEmployee = false;
    this.poModal.close()
  }

  newEmployee(): void {
    this.includeEmployee = true;
    this.router.navigate(['/employees/form'])
    this.poModal.open();
  }

  inputSearch(search: string): void {
    if (search.length > 0) {
      this.employeesDisplayed = this.employees.filter(employee => employee.name.includes(search))
    } else {
      this.employeesDisplayed = this.employees
    }
  }

}
