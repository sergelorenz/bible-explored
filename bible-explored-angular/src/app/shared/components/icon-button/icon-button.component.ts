import { Component, Input, Output, EventEmitter } from '@angular/core';

export type IconButtonModel = {
  src: string,
  customClass?: string,
  width?: string,
  toolTip?: string,
}

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
  @Input() iconButtonInput = {
    src: '',
    customClass: '',
    width: '45px',
    tooltip: ''
  }
}
