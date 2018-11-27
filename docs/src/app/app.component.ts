import { Component } from '@angular/core';
import { RouterMetaDataService } from './common/services/router-meta-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private routerMetaDataService: RouterMetaDataService) {
    this.routerMetaDataService.init().subscribe();
  }
}
