import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-carbon-ad',
  templateUrl: './carbon-ad.component.html',
  styleUrls: ['./carbon-ad.component.scss']
})
export class CarbonAdComponent implements OnInit, AfterViewInit {
  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    const s = document.createElement('script');
    s.async = true;
    s.id = '_carbonads_js';
    s.type = 'text/javascript';
    s.src = '//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=coryrylancom';
    this.elementRef.nativeElement.appendChild(s);
  }

  ngOnInit() {
  }
}
