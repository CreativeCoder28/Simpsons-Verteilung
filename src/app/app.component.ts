import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('tabGroup') tabGroup;
  active = 1;
  title = 'simpsens-vertilung-app';
}
