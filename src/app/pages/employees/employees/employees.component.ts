import { EmployeesService } from './../shared/employees.service';
import { EmployeesInterface } from './../shared/employees.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoTableAction, PoUploadComponent } from '@po-ui/ng-components';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  @Input() value: any;
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  close: PoModalAction = {
    action: () => {
      this.recebeFormulario();
    },
    label: 'Cancelar',
    danger: true
  };

  reactiveForm: FormGroup;
  employees: EmployeesInterface[];
  employeesDisplayed: EmployeesInterface[];

  resume: string;
  isLoading: boolean = true;

  private subscription: Subscription;
  private includeEmployee = false;

  public actions: Array<PoTableAction> = [
    {
      icon: 'po-icon-plus',
      label: 'Incluir',
      action: this.newEmployee.bind(this)
    }

  ];
  constructor(private employeesService: EmployeesService, private fb: FormBuilder
  ) {
    this.criaFormularioPesquisar();
  }


  ngOnInit(): void {
    this.employeesService.getAll().subscribe(
      {
        next: (res) => {
          this.isLoading = false;
          this.employees = res;
          this.employeesDisplayed = this.employees;
        }

      }
    )

    this.subscription = this.reactiveForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(
      res => {
        if (res.pesquisa.length > 0) {
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

  recebeFormulario() {
    this.includeEmployee = false;
    this.poModal.close()
  }

  newEmployee(): void {
    this.includeEmployee = true;
    this.poModal.open();
  }

}
