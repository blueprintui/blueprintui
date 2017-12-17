import { Component, OnInit } from '@angular/core';

import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-docs-home',
  templateUrl: './docs-home.component.html',
  styleUrls: ['./docs-home.component.scss']
})
export class DocsHomeComponent implements OnInit {
  //  version: environment.blueprintVersion;

  constructor() { }

  ngOnInit() {
  }

}
