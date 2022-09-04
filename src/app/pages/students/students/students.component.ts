import { StudentService } from './../shared/student.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PoModalAction, PoModalComponent, PoTableAction } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { StudentInterface } from '../shared/student.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  @Input() value: any;
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  close: PoModalAction = {
    action: () => {
      this.formReceive();
    },
    label: 'Cancelar',
    danger: true
  };

  students: StudentInterface[];
  studentsDisplayed: StudentInterface[];

  resume: string;
  isLoading: boolean = true;
  includeStudent = false;

  private subscription: Subscription;

  public actions: Array<PoTableAction> = [
    {
      icon: 'po-icon-plus',
      label: 'Incluir',
      action: this.newEmployee.bind(this)
    }

  ];
  constructor(private studentsService: StudentService, private fb: FormBuilder, private router: Router
  ) {

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    this.studentsService.getAll().subscribe(
      {
        next: (res: StudentInterface[]) => {
          this.isLoading = false;
          this.students = res;
          this.studentsDisplayed = this.students;
        }

      }
    )
  }

  inputSearch(search: string): void {
    if (search.length > 0) {
      this.studentsDisplayed = this.students.filter(studant => studant.name.includes(search))
    } else {
      this.studentsDisplayed = this.students
    }
  }

  formReceive() {
    this.includeStudent = false;
    this.poModal.close()
  }

  newEmployee(): void {
    this.includeStudent = true;
    this.router.navigate(['/students/form'])
    this.poModal.open();
  }

}
