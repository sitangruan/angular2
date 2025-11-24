import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private _isVisible = false;
  private _isMaskTransparent = true;

  get isVisible(): boolean {
    return this._isVisible;
  }

  get isMaskTransparent(): boolean {
    return this._isMaskTransparent;
  }

  showSpinner(isTransparent: boolean | undefined = undefined): void {
    this._isVisible = true;
    this._isMaskTransparent = isTransparent !== undefined ? isTransparent : this._isMaskTransparent;
  }

  hideSpinner(): void {
    this._isVisible = false;
  }

  setMaskTransparency(isTransparent: boolean): void {
    this._isMaskTransparent = isTransparent;
  }
}
