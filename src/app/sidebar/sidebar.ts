import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routeList } from '../../common/constants';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  routeList = routeList;
}
