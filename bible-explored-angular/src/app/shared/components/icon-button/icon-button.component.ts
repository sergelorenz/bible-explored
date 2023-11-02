import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

export type IconButtonModel = {
  src?: string,
  parentClass?: string,
  iconClass?: string,
  tooltip?: string,
}

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IconButtonComponent {
  @Input() iconButtonInput: IconButtonModel = {
    src: '',
    parentClass: '',
    iconClass: '',
    tooltip: ''
  }
  @Input() parentWidth?: number = 45;
  @Output() clickEvent = new EventEmitter<void>();

  clickButton() {
    this.clickEvent.emit();
  }
}
