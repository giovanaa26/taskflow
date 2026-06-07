import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Injectable({
  providedIn: 'root'
})
export class NativeService {

async vibrar() {
  try {
    await Haptics.vibrate({ duration: 500 });
  } catch(e) {
    console.log('Haptics não suportado:', e);
  }
}

  async pedirPermissaoNotificacao() {
    const permissao = await LocalNotifications.requestPermissions();
    return permissao.display === 'granted';
  }

  async agendarNotificacao(titulo: string, corpo: string, id: number = 1) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: titulo,
          body: corpo,
          id: id,
          schedule: { at: new Date(Date.now() + 1000) },
          sound: undefined,
          attachments: undefined,
          actionTypeId: '',
          extra: null
        }
      ]
    });
  }
}