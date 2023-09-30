import { Component } from '@angular/core';
import { MenuService } from '../services/menu/menu.service';
import { MenuGroup } from '../shared/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  menuGroup: MenuGroup;
  constructor(private menuService: MenuService) {
    this.menuGroup = this.menuService.getMenuGroup();
  }
}
