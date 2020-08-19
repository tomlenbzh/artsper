import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

function getWindow(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class WindowrefService {

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  get nativeWindow(): Window {
    if (isPlatformBrowser(this.platformId)) {
      return getWindow();
    }
  }
}
