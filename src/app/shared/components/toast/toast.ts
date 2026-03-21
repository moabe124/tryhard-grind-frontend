import { Component, inject } from '@angular/core';
import { ToastService, Toast } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
})
export class ToastComponent {
  toastService = inject(ToastService);

  icon(type: Toast['type']): string {
    return { info: 'info', success: 'check_circle', error: 'cancel' }[type];
  }

  colorClass(type: Toast['type']): string {
    return {
      info: 'border-primary/30 bg-[#08120f] text-primary',
      success: 'border-primary/30 bg-[#08120f] text-primary',
      error: 'border-error/30 bg-[#08120f] text-error',
    }[type];
  }
}
