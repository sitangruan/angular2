import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { sitangImagePath, linkedInUrl, sourceCodesUrl } from '../common/constants';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  sitangImagePath = sitangImagePath;
  linkedInUrl = linkedInUrl;
  sourceCodesUrl = sourceCodesUrl;
}
