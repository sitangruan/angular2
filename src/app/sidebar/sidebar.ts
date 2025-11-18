import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routeList } from '../../common/constants';
import { RouterLinkActive } from "@angular/router";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLinkActive, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  routeList = routeList;
}
