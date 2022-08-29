import { EmployeesInterface } from './../shared/employees.model';
import { EmployeesService } from './../shared/employees.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PoModalAction, PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Output() registroSalvo: EventEmitter<FormGroup> = new EventEmitter()
  @Input() employee: EmployeesInterface;

  isLoading = false;
  isInsert = true;
  pictureStatus = "Nenhuma Foto Selecionada"
  pictureStatusColor = "color-07"
  public reactiveForm: FormGroup;
  public avatarPicture: HTMLInputElement;

  private avatarPictureOk = false;


  constructor(private ponotification: PoNotificationService, private fb: FormBuilder, private employeesService: EmployeesService) {
    this.createForm();

  }

  ngOnInit(): void {
    if (this.employee) {
      this.pictureStatus = 'Foto Ok'
      this.pictureStatusColor = "color-08"
      this.editeForm();
    }
  }

  editeForm(): void {
    this.reactiveForm.patchValue({
      name: this.employee.name,
      email: this.employee.email,
      phone: this.employee.phone,
      avatar: this.employee.avatar,
      pictureOk: this.employee.pictureOk
    })

  }

  uploadImage($event: any) {
    this.avatarPicture = $event.target.files[0];
    this.avatarPictureOk = true;
    this.ponotification.success(this.avatarPicture.name + " anexado com sucesso!")
    this.pictureStatus = this.avatarPicture.name
    this.pictureStatusColor = "color-10"
  }

  async inputEmployee() {
    if (!this.avatarPictureOk && !this.employee) {
      this.ponotification.warning("Selecione uma imagem de para confirmar o cadastro")
      return
    }
    this.isLoading = true;
    if (!this.employee) {
      await this.employeesService.post(this.reactiveForm.value).then(
        res => {
          this.updateAvatarImage(res.id)
        }
      ).catch(error => {
        this.ponotification.error(error);
        this.isLoading = false;
      });
    } else {
      await this.employeesService.put(this.reactiveForm.value, this.employee.id).then(
        res => {
          if(this.avatarPictureOk){
            this.updateAvatarImage(this.employee.id)
          } else {
            this.closeForm();
          }

        }
      ).catch(error => {
        this.ponotification.error(error);
        this.isLoading = false;
      });
    }

  }

  updateAvatarImage(id: string): void {
    this.employeesService.uploadAvatar(this.avatarPicture, id).then(
      res => {
        this.ponotification.success("Registro Atualizado com Sucesso")
        this.reactiveForm.value.pictureOk = true;
        this.employeesService.put(this.reactiveForm.value, id)
        this.closeForm();
      }
    ).catch(error => {
      this.ponotification.error(error);
      this.isLoading = false;
    });
  }

  closeForm(): void {
    this.avatarPictureOk =false;
    this.pictureStatus = "Nenhuma Foto Selecionada";
    this.pictureStatusColor = "color-07";
    this.reactiveForm.reset();
    this.isLoading = false;
    this.registroSalvo.emit();
  }

  createForm(): void {
    console.log(this.employee)
    this.reactiveForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      pictureOk: new FormControl(''),
    })
    // this.reactiveForm = this.fb.group({
    //   name: [],
    //   phone: [],
    //   email: ['']
    // });
  }
}
