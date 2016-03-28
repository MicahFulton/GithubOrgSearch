import {Component} from 'angular2/core';
import {AppState} from '../app.service';
import {RouteConfig, RouteParams, Router, RouterOutlet, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'home',
  template: require('./home.html')
})
export class Home {
    popularOrgs: Array<Object>;
    constructor(public appState: AppState,  private _router: Router) {

    }

    ngOnInit() {
        this.popularOrgs = require('assets/mock-data/popular-orgs.json');
    }

    get state() {
        return this.appState.get();
    }

    navigateToSearch(query) {
         this._router.navigate(['../Search', { q: query }]);
         setTimeout(() => document.getElementById('searchInput').focus());
    }
}
