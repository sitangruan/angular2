import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { sitangImagePath, linkedInUrl, sourceCodesUrl } from '../common/constants';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  sitangImagePath = sitangImagePath;
  linkedInUrl = linkedInUrl;
  sourceCodesUrl = sourceCodesUrl;
}
