import { Component, Input } from '@angular/core';
import { Option, GroupOption } from '../../types';


export type DropdownModel = {
  options: Option[] | GroupOption[],
  parentClass: string,
  zIndex: number,
  isDisabled?: boolean
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() dropdownInput?: DropdownModel
  isOpen = false;

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: string) {
    console.log('Item Selected', item)
    this.isOpen = false;
  }
}
