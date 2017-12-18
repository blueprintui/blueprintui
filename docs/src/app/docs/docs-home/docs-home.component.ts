import { Component, OnInit } from '@angular/core';

import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-docs-home',
  templateUrl: './docs-home.component.html'
})
export class DocsHomeComponent implements OnInit {
  blueprintVersion = environment.blueprintVersion;

  constructor() { }

  ngOnInit() {
  }

}
