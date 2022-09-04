import { BaseResourceFirebaseService } from 'src/app/shared/service/base-resource-firebase.service';
import { ParentsInterface } from './../shared/parents.model';
import { ParentsService } from './../shared/parents.service';
import { StorageService } from './../../../shared/service/storage.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Component, EventEmitter, Input, OnInit, Output, SecurityContext, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PoBreadcrumb, PoBreadcrumbItem, PoModalAction, PoModalComponent, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { getDownloadURL } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.css']
})
export class ParentFormComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;
  @Output() registroSalvo: EventEmitter<FormGroup> = new EventEmitter()
  @Input() parent: ParentsInterface;
  @Input() urlPicture: string = '';
  @Input() viewForm = false;

  breadcrumb: PoBreadcrumb = { items: [] };
  breadcrumbItem: PoBreadcrumbItem;
  breadcrumbParams: any;

  isLoading = false;
  isInsert = true;
  pictureStatus = "Nenhuma Foto Selecionada"
  pictureStatusColor = "color-07"
  editPicture = false;

  public reactiveForm: FormGroup;
  public avatarPicture: any;
  public id: string | null
  public isMobile = false;
  public actions: Array<PoPageAction> = [{
    label: 'Salvar',
    action: () => this.inputParent(),
    disabled: () => this.reactiveForm.invalid,
    icon: 'po-icon-plus'
  }

  ];

  private avatarPictureOk = false;
  private storageParent = 'parents'

  constructor(private ponotification: PoNotificationService
    , private parentsService: ParentsService
    , private storageService: StorageService
    , private route: ActivatedRoute
    , private deviceDetectorService: DeviceDetectorService
    , private router: Router) {

    this.isMobile = this.deviceDetectorService.isMobile();
    this.breadcrumb.items = this.breadcrumb.items.concat([{ label: 'Responsáveis', link: '/parents' }])
    this.viewForm = Boolean(this.route.snapshot.paramMap.get('viewForm'));
    this.id = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.createForm();
    if (this.id) {
      this.isLoading = true;
      this.getIdParent();
    } else {
      this.breadcrumb.items = this.breadcrumb.items.concat([{ label: 'Novo Responsável', link: '/parents/form' }])
    }
  }

  async getIdParent(): Promise<void> {
    const doc = await this.parentsService.getById(String(this.id));
    this.isLoading = false;
    this.parent = doc.data();
    this.parent.id = String(this.id)
    this.breadcrumb.items = this.breadcrumb.items.concat([{ label: this.parent.name, link: '/parents/form' }])

    if (this.viewForm) {
      this.actions = []
    }

    this.pictureStatus = 'Foto Ok'
    this.pictureStatusColor = "color-08"
    this.editeForm();
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


  editeForm(): void {
    this.reactiveForm.patchValue({
      name: this.parent.name,
      email: this.parent.email,
      phone: this.parent.phone,
      avatar: this.parent.avatar,
      pictureOk: this.parent.pictureOk
    })

  }

  pictureClick(): void {
    if (!this.viewForm) {
      this.editPicture = true;
      this.poModal.open()
    }
  }

  uploadImage() {
    this.avatarPictureOk = true;
    this.ponotification.success("Foto anexada com sucesso!")
    this.pictureStatus = "Foto Anexada com Sucesso"
    this.pictureStatusColor = "color-10"

    if (this.avatarPicture) {
      const reader = new FileReader();
      this.urlPicture = '';
      reader.addEventListener('load', this.readFile.bind(this));
      reader.readAsDataURL(this.avatarPicture);
    }

  }

  pictureSelected(e: any) {
    this.urlPicture = e.url;
    this.avatarPicture = e.blob;
    this.editPicture = false;
    this.uploadImage();
    this.poModal.close();

  }
  async inputParent() {
    if (!this.avatarPictureOk && !this.parent) {
      this.ponotification.warning("Selecione uma imagem de para confirmar o cadastro")
      return
    }
    this.isLoading = true;
    if (!this.parent) {
      await this.parentsService.post(this.reactiveForm.value).then(
        res => {
          this.updateAvatarImage(res.id)
        }
      ).catch(error => {
        this.ponotification.error(error);
        this.isLoading = false;
      });
    } else {
      await this.parentsService.put(this.reactiveForm.value, this.parent.id).then(
        res => {
          if (this.avatarPictureOk) {
            this.updateAvatarImage(this.parent.id)
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
    this.storageService.uploadAvatar(this.storageParent, this.avatarPicture, id).then(
      res => {
        this.ponotification.success("Registro Atualizado com Sucesso")
        this.reactiveForm.value.pictureOk = true;
        this.parentsService.put(this.reactiveForm.value, id)
        this.closeForm();
      }
    ).catch(error => {
      this.ponotification.error(error);
      this.isLoading = false;
    });
  }

  closeForm(): void {
    this.router.navigate(['/parents'])
    this.avatarPictureOk = false;
    this.pictureStatus = "Nenhuma Foto Selecionada";
    this.pictureStatusColor = "color-07";
    this.reactiveForm.reset();
    this.isLoading = false;
    this.registroSalvo.emit();
  }

  createForm(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl({ value: '', disabled: this.viewForm }, [Validators.required]),
      phone: new FormControl({ value: '', disabled: this.viewForm }, [Validators.required]),
      email: new FormControl({ value: '', disabled: this.viewForm }, [Validators.required]),
      pictureOk: new FormControl(''),
    })
  }

  readFile(event: any): void {
    this.urlPicture = event.target.result
  }

  returnParents(): void {
    this.closeForm();
  }
}
