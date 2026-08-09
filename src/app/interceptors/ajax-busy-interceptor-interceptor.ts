import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';
import { AjaxBusy } from '../service/ajax-busy';

export const ajaxBusyInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(AjaxBusy);

  console.log('➡️ Interceptor Intercepted Request:', req.url);
  busyService.beginRequest(); // Start the busy state logic

  // Handle the request and ensure endRequest is called on success/failure/cancellation
  return next(req).pipe(
    finalize(() => {
      console.log('⬅️ Interceptor Finished Request:', req.url);
      busyService.endRequest(); // End the busy state logic
    }),
  );
};
