import {
  animation,
  style,
  animate
} from '@angular/animations';

export const appear = animation([
  style({
    width: '0px',
    opacity: 0
  }),
  animate('0.2s', style({ width: '{{ width }}', opacity: 1}))
])

export const disappear = animation([
  style({
    width: '{{ width }}',
    opacity: 1
  }),
  animate('0.2s', style({ width: '0px', opacity: 0}))
])
