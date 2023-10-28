import { Component, Input, Output, EventEmitter } from '@angular/core';

export type IconButtonModel = {
  src: string,
  parentClass?: string,
  iconClass?: string,
  tooltip?: string,
}

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
  @Input() iconButtonInput: IconButtonModel = {
    src: '',
    parentClass: '',
    iconClass: '',
    tooltip: ''
  }
  @Input() width? = '45px';
  @Output() clickEvent = new EventEmitter<void>();

  clickButton() {
    this.clickEvent.emit();
  }
}
