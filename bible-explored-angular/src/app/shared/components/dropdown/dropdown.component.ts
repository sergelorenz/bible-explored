import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Option, GroupOption } from '../../types';


export type DropdownModel = {
  options?: any,
  placeholder?: string,
  parentClass?: string,
  zIndex?: number,
  isDisabled?: boolean
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() dropdownInput?: DropdownModel
  @Input() isOptionsLoading? = false
  @Input() forceSelect?: any;
  @Output() selectItemEvent = new EventEmitter<Option>();
  isOpen = false;
  selectedItem: string = 'Select an Item';

  ngOnInit() {
    if (this.dropdownInput?.placeholder) {
      this.selectedItem = this.dropdownInput.placeholder;
    }
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: Option) {
    this.selectedItem = item.name;
    this.selectItemEvent.emit(item);
    this.isOpen = false;
  }

  getOptionsType(): string {
    if (this.dropdownInput && this.dropdownInput.options) {
      const opts: GroupOption[] | Option[] = this.dropdownInput.options
      if ((opts[0] as GroupOption).options !== undefined) {
        return 'GroupOption'
      } else {
        return 'Option'
      }
    }
    return 'Unknown'
  }
}
