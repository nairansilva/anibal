import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoInfoOrientation, PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { getDownloadURL } from 'firebase/storage';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BaseResourceFirebaseService } from 'src/app/shared/service/base-resource-firebase.service';
import { StorageService } from 'src/app/shared/service/storage.service';
import { StudentInterface } from '../shared/student.model';
import { StudentService } from '../shared/student.service';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css']
})
export class StudentCardComponent implements OnInit {

  @Input() student: StudentInterface

  urlPicture = '';
  widgetHeight = 250;
  activeEditForm = false;
  viewForm = false;
  isLoading = false;
  isMobile = false;
  poInfoOrientation: PoInfoOrientation = PoInfoOrientation.Horizontal

  storageEmployee = "students"

  close: PoModalAction = {
    action: () => {
      this.receiveConfirmationForm();
    },
    label: 'Cancelar',
    danger: true
  };

  constructor(private studentsService: StudentService
    , private storageService: StorageService
    , private poNotificationService: PoNotificationService
    , private deviceDetectorService: DeviceDetectorService
    , private router: Router) {

    this.isMobile = this.deviceDetectorService.isMobile();
    this.isMobile ? this.widgetHeight = 350 : this.widgetHeight = 280;
  }

  ngOnInit(): void {
    this.getAvatarImage()
  }

  getAvatarImage(): void {
    this.storageService.getImage(this.storageEmployee, this.student.id, '').then(
      res => {
        const imgProfile = res.items.filter(item => item.name.includes(this.student.id))
        if (imgProfile.length > 0) {
          const url = getDownloadURL(imgProfile[0]);
          url.then(res => { this.urlPicture = res })
        }
      })
      .catch(error => console.error(error))
  }

  viewEmployee() {

  }

  async deleteEmployee() {
    if (window.confirm('Confirma Exclusão?')) {
      this.isLoading = true;
      await this.studentsService.delete(this.student.id).then(
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

  deleteAvatar(): void {
    this.storageService.deleteAvatar(this.storageEmployee, this.student.id).then(
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

  editeEmployee(): void {
    this.activeEditForm = true;
    this.router.navigate([`/students/form/${this.student.id}`])
  }

  openForm(): void {
    this.router.navigate([`/students/form/${this.student.id}`, { viewForm: true }])
    this.viewForm = true;
  }

  receiveConfirmationForm(): void {
    this.activeEditForm = false;
    this.viewForm = false
  }
}
