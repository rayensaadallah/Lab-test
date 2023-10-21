import { Component } from '@angular/core';
import { DataService } from './data/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any[] = [];

  constructor(private dataService: DataService) {
    this.data = this.dataService.generateData();
  }
}