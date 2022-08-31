import { Router } from '@angular/router';
import { EmployeesService } from './../shared/employees.service';
import { EmployeesInterface } from './../shared/employees.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PoInfoOrientation, PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { getDownloadURL } from '@angular/fire/storage';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-employes-card',
  templateUrl: './employes-card.component.html',
  styleUrls: ['./employes-card.component.css']
})
export class EmployesCardComponent implements OnInit {
  @Input() employee: EmployeesInterface
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  urlPicture = '';
  widgetHeight = 250;
  activeEditForm = false;
  viewForm = false;
  isLoading = false;
  isMobile = false;
  poInfoOrientation: PoInfoOrientation = PoInfoOrientation.Horizontal

  close: PoModalAction = {
    action: () => {
      this.receiveConfirmationForm();
    },
    label: 'Cancelar',
    danger: true
  };

  constructor(private employeesService: EmployeesService
    , private poNotificationService: PoNotificationService
    , private deviceDetectorService:DeviceDetectorService
    , private router:Router) {
    this.isMobile = this.deviceDetectorService.isMobile();
    this.isMobile ? this.widgetHeight = 350 : this.widgetHeight = 280;
  }

  ngOnInit(): void {
    this.getAvatarImage()
  }

  getAvatarImage(): void {
    this.employeesService.getImage(this.employee.id, '').then(
      res => {
        const imgProfile = res.items.filter(item => item.name.includes(this.employee.id))
        if (imgProfile.length > 0) {
          const url = getDownloadURL(imgProfile[0]);
          url.then(res => { this.urlPicture = res })
        }
      })
      .catch(error => console.error(error))
  }

  viewEmployee(){

  }

  async deleteEmployee() {
    if (window.confirm('Confirma Exclusão?')) {
      this.isLoading = true;
      await this.employeesService.delete(this.employee).then(
        res => {
          this.deleteAvatar()
        }
      ).catch(
        error => {
          this.isLoading = false;
          this.poNotificationService.error('Erro ao excluir')
        }
      )
    }
  }

  deleteAvatar(): void{
    this.employeesService.deleteAvatar(this.employee.id).then(
      res => {
        this.isLoading = false;
        this.poNotificationService.success('Registro Deletado com Sucesso');
      }
    ).catch(
      error => {
        this.isLoading = false;
        this.poNotificationService.error('Erro ao excluir')
      }
    )
  }

  editeEmployee():void {
    this.activeEditForm = true;
    this.router.navigate([`/employees/form/${this.employee.id}`])
    this.poModal.open()
  }

  openForm():void {
    this.viewForm = true;
    this.poModal.open()
  }

  receiveConfirmationForm(): void{
    this.activeEditForm = false;
    this.viewForm = false
    this.poModal.close();
  }

}
