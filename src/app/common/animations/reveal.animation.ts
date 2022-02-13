import { trigger, transition, style, animate } from '@angular/animations';

export const revealAnimation = trigger('revealAnimation', [
    transition(':enter', [
      style({ overflow: 'hidden'}),
      style({ height: 0}), animate('700ms', style({ height: '100%' }))
    ]),
    transition(':leave',[
        style({ overflow: 'hidden'}),
        style({ height: '100%'}), animate('700ms', style({ height: 0 }))
    ])
  ]);