import { mergeMap } from 'rxjs/operators';
import { LinkParentsService } from './../shared/link-parents.service';
import { ParentsInterface } from './../shared/parents.model';
import { LinkParentInterface } from './../shared/link-parents.interface';
import { ParentsService } from './../shared/parents.service';
import { Component, Input, OnInit } from '@angular/core';
import { PoListViewAction, PoNotificationService } from '@po-ui/ng-components';
import { from } from 'rxjs';

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.css']
})
export class ParentListComponent implements OnInit {
  @Input() studentId: string;
  linkStudentxParent: LinkParentInterface
  studentParents: any[] = [];
  allParents: any[];

  readonly actions: Array<PoListViewAction> = [
    {
      label: 'Vincular',
      action: this.addParent.bind(this),
      icon: 'po-icon-ok'
    }
  ];

  constructor(private parentsService: ParentsService, private linkParentsService: LinkParentsService, private poNotificationService: PoNotificationService) {
  }

  ngOnInit(): void {
    this.getLinkParents();
    this.parentsService.getAll().subscribe({
      next: res => { this.allParents = res; console.log('tetetet  ')  },
      error: error => { console.log('erro busca de parents', error) }
    })

  }

  getLinkParents(): void {
    this.linkParentsService.getAll({ field: 'studentId', operator: '==', value: this.studentId }).pipe(
    ).subscribe({
      next: res => {
        this.studentParents = [];
        console.log('res',res)
        res.forEach(async (parent) => {
          const teste = await this.parentsService.getById(parent.parentId);
          console.log(teste.data())
          this.allParents = this.allParents.filter(a => a.id !== teste.id)
          this.studentParents.push(teste.data())
        })
      },
      error: error => console.error('deu erro', error)
    })
  }

  addParent(e: ParentsInterface): void {
    this.linkStudentxParent = { studentId: this.studentId, parentId: e.id }
    this.linkParentsService.post(this.linkStudentxParent).then(
      res => { this.poNotificationService.success("Vinculo Realizado com Sucesso") }
    ).catch(
      error => { this.poNotificationService.error("Erro ao vincular") }
    )
  }

}
