import { Component, OnInit } from '@angular/core';
import { ModelService } from './model.service';
import { Router } from '@angular/router';
import { Constants } from './Constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'fullcontrol';
  activeNav: number = 0;
  model = new ModelService();
  router: any = null;
  constants: any = null;

  ngOnInit () {
    this.activeNav = this.model.getActiveNav() || 2;
    this.router = Router;
    this.constants = new Constants();
  }

  setNav (number) {
    this.model.setActiveNav(number);
    this.activeNav = number;
  }

  getRoute (name: string) {
    return this.constants.get(name);
  }
}
