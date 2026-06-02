import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonSelect, IonSelectOption, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { person } from 'ionicons/icons';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonInput, IonSelect, IonSelectOption, IonIcon
  ]
})
export class PerfilPage {
  constructor() {
    addIcons({ person });
  }
}