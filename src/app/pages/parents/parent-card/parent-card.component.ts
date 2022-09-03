import { ParentsService } from './../shared/parents.service';
import { ParentsInterface } from './../shared/parents.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoInfoOrientation, PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { getDownloadURL } from 'firebase/storage';
import { DeviceDetectorService } from 'ngx-device-detector';
import { StorageService } from 'src/app/shared/service/storage.service';

@Component({
  selector: 'app-parent-card',
  templateUrl: './parent-card.component.html',
  styleUrls: ['./parent-card.component.css']
})
export class ParentCardComponent implements OnInit {

  @Input() parent: ParentsInterface
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  urlPicture = '';
  widgetHeight = 250;
  activeEditForm = false;
  viewForm = false;
  isLoading = false;
  isMobile = false;
  poInfoOrientation: PoInfoOrientation = PoInfoOrientation.Horizontal

  storageParent = "parents"

  close: PoModalAction = {
    action: () => {
      this.receiveConfirmationForm();
    },
    label: 'Cancelar',
    danger: true
  };

  constructor(private parentsService: ParentsService
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
    this.storageService.getImage(this.storageParent, this.parent.id, '').then(
      res => {
        const imgProfile = res.items.filter(item => item.name.includes(this.parent.id))
        if (imgProfile.length > 0) {
          const url = getDownloadURL(imgProfile[0]);
          url.then(res => { this.urlPicture = res })
        }
      })
      .catch(error => console.error(error))
  }

  viewParent() {

  }

  async deleteParent() {
    if (window.confirm('Confirma Exclusão?')) {
      this.isLoading = true;
      await this.parentsService.delete(this.parent.id).then(
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
    this.storageService.deleteAvatar(this.storageParent, this.parent.id).then(
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

  editeParent(): void {
    this.activeEditForm = true;
    this.router.navigate([`/parents/form/${this.parent.id}`])
    this.poModal.open()
  }

  openForm(): void {
    this.router.navigate([`/parents/form/${this.parent.id}`, { viewForm: true }])
    this.viewForm = true;
    this.poModal.open()
  }

  receiveConfirmationForm(): void {
    this.activeEditForm = false;
    this.viewForm = false
    this.poModal.close();
  }
}
