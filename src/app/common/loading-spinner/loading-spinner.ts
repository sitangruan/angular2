import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService} from '../../../services/spinner-service';

@Component({
  selector: 'app-loading-spinner',
  imports: [CommonModule],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.css',
})
export class LoadingSpinner {
  constructor(private spinnerService: SpinnerService) {}
  get isVisible(): boolean {
    return this.spinnerService.isVisible;
  }
  get isMaskTransparent(): boolean {
    return this.spinnerService.isMaskTransparent;
  }
}
