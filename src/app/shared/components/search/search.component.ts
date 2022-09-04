import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() inputSearch: EventEmitter<string> = new EventEmitter()

  reactiveForm: FormGroup;
  private subscription: Subscription;

  constructor(private fb: FormBuilder) {
    this.criaFormularioPesquisar();
   }

  ngOnInit(): void {
    this.subscription = this.reactiveForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(
      res => {
        this.inputSearch.emit(res.pesquisa)
      }
    )
  }

  criaFormularioPesquisar(): void {
    this.reactiveForm = this.fb.group({
      pesquisa: [''],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
