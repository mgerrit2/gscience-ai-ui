import { inject, Injectable } from '@angular/core';
import { SpinnerService } from './spinners/spinner-service';

@Injectable({
  providedIn: 'root',
})
export class AjaxBusy {
  // Use inject() to get the dependency
  private readonly spinner = inject(SpinnerService);

  private readonly requestCounter: number = 0;

  // Tweak as needed
  private readonly showDelayMs = 150;
  private readonly minVisibleMs = 300;

  private readonly showTimerId: any = null;
  private readonly shownAt: number | null = null;

  // Constructor is now implicit, but for clarity:
  // constructor() {}

  // **Original private beginRequest()**
  beginRequest(): void {
    console.log('AjaxBusyInterceptor::beginRequest');

    this.spinner.show();
  }

  // **Original private endRequest()**
  endRequest(): void {
    console.log('AjaxBusyInterceptor::endRequest');

    this.spinner.hide();
  }
}
