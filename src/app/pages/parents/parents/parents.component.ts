import { BaseResourceFirebaseService } from 'src/app/shared/service/base-resource-firebase.service';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PoModalAction, PoModalComponent, PoTableAction } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { ParentsInterface } from '../shared/parents.model';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { ParentsService } from '../shared/parents.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent  implements OnInit, OnDestroy {

  @Input() value: any;
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  close: PoModalAction = {
    action: () => {
      this.recebeFormulario();
    },
    label: 'Cancelar',
    danger: true
  };

  parents: ParentsInterface[];
  parentsDisplayed: ParentsInterface[];

  resume: string;
  isLoading: boolean = true;
  includeParent = false;

  private subscription: Subscription;

  public actions: Array<PoTableAction> = [
    {
      icon: 'po-icon-plus',
      label: 'Incluir',
      action: this.newParent.bind(this)
    }

  ];
  constructor(private parentsService: ParentsService, private fb: FormBuilder, private router: Router
  ) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    this.subscription = this.parentsService.getAll().subscribe(
      {
        next: (res) => {
          this.isLoading = false;
          this.parents = res;
          this.parentsDisplayed = this.parents;
        }

      }
    )

  }

  recebeFormulario() {
    this.includeParent = false;
    this.poModal.close()
  }

  inputSearch(search: string): void {
    if (search.length > 0) {
      this.parentsDisplayed = this.parents.filter(parent => parent.name.includes(search))
    } else {
      this.parentsDisplayed = this.parents
    }
  }

  newParent(): void {
    this.includeParent = true;
    this.router.navigate(['/parents/form'])
    this.poModal.open();
  }

}
