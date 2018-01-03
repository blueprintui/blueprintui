import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  preserveWhitespaces: true
})
export class HomeComponent implements OnInit {
  blueprintVersion = environment.blueprintVersion;
  constructor() { }

  ngOnInit() {
  }

}
