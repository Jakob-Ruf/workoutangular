import { Component, OnInit } from '@angular/core';
import { ModelService } from './model.service';
import { HelperService } from './helper.service';
import { Router } from '@angular/router';
import { Constants } from './Constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'fullcontrol';
  activeNav: number;
  constants: any = null;

  constructor (
    public router: Router
    ) {}

  ngOnInit () {
    // this.activeNav = 2;
    const route: string = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
    const routes = {
      new : 0,
      active: 1,
      load: 2
    };
    const that = this;
    this.setNav(routes[route]);
    this.constants = new Constants();
    this.router.events.subscribe((val) => {
      // @ts-ignore
      const route = val.url.substr(1);
      that.setNav(routes[route]);
      // console.log(val instanceof NavigationEnd)
  });
  }


  setNav (number) {
    this.activeNav = number;
  }

  getRoute (name: string) {
    return this.constants.get(name);
  }
}
