import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { sitangImagePath, linkedInUrl, sourceCodesUrl } from '../common/constants';
import { Sidebar } from './sidebar/sidebar';
import { LoadingSpinner } from "./common/loading-spinner/loading-spinner";

@Component({
  selector: 'app-root',
  imports: [Sidebar, RouterOutlet, LoadingSpinner, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  sitangImagePath = sitangImagePath;
  linkedInUrl = linkedInUrl;
  sourceCodesUrl = sourceCodesUrl;
  displaySpinner = false;
  isMaskTransparent = true;

  showLoadingSpinner() {
    this.displaySpinner = true;
    setTimeout(() => {
      this.displaySpinner = false;
    }, 3000); // Hide spinner after 3 seconds
  }
}
