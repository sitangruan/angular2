import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { sitangImagePath, linkedInUrl, sourceCodesUrl } from '../common/constants';
import { Sidebar } from './sidebar/sidebar';
import { LoadingSpinner } from "./common/loading-spinner/loading-spinner";
import { SpinnerService } from '../services/spinner-service';

@Component({
  selector: 'app-root',
  imports: [Sidebar, RouterOutlet, LoadingSpinner, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private spinnerService: SpinnerService) {}

  sitangImagePath = sitangImagePath;
  linkedInUrl = linkedInUrl;
  sourceCodesUrl = sourceCodesUrl;

  private _isMaskTransparent = true;
  get isMaskTransparent(): boolean {
    return this._isMaskTransparent;
  }

  set isMaskTransparent(value: boolean) {
    this._isMaskTransparent = value;
    this.spinnerService.setMaskTransparency(value);
  }

  showLoadingSpinner() {
    this.spinnerService.showSpinner();
    setTimeout(() => {
      this.spinnerService.hideSpinner();
    }, 2000); // Hide spinner after 2 seconds
  }
}
