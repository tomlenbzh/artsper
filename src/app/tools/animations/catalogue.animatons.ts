import { trigger, state, style, animate, transition } from '@angular/animations';

export const RotateIcon = trigger('rotateFilterIcon', [
  state('false', style({ transform: 'rotate(0deg)' })),
  state('true', style({ transform: 'rotate(180deg)' })),
  transition('false=>true', animate('300ms')),
  transition('true=>false', animate('300ms'))
]);
