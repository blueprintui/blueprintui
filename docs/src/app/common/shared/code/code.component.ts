import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import Prism from 'prismjs';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: true
})
export class CodeComponent implements OnInit {
  @Input() language = 'html';
  @ViewChild('code') ref;
  safeHtml = '';

  constructor() { }

  ngOnInit() {
    // replace with < and > to render HTML in angular
    const html = this.ref.nativeElement
      .innerHTML.replace(/\{ \{/gi, '{{').replace(/\} \}/gi, '}}').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>');

    if (this.language === 'javascript') {
      this.safeHtml = Prism.highlight(html, Prism.languages.javascript);
    } else {
      this.safeHtml = Prism.highlight(html, Prism.languages.markup);
    }
  }
}
