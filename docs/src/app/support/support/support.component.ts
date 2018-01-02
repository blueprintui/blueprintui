import { Component, OnInit } from '@angular/core';

declare const CoinHive;

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html'
})
export class SupportComponent implements OnInit {
  loadedScript = false;
  miner: any;
  constructor() { }

  ngOnInit() {
  }

  support() {
    if (this.loadedScript) {
      this.requestPermission();
    } else {
      this.loadScript('https://authedmine.com/lib/authedmine.min.js', () => {
        this.loadedScript = true;
        this.requestPermission();
      });
    }
  }

  loadScript(url, callback) {
    const script = document.createElement('script');
    script.onload = () => callback();
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  requestPermission() {
    if (this.loadedScript) {
      this.miner = new CoinHive.Anonymous('f0scyPFH0LKcBuM4ajktz3uzWyWypVqv', { throttle: 0.7 });
      this.miner.start();
    }
  }
}
