import {Component, Injector} from 'angular2/core';
import {AppState} from '../app.service';
import {RouteConfig, RouteParams, Router, RouterOutlet, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'search',
  template: require('./search.html')
})
export class Search {
    query: String;
    constructor(public appState: AppState, private _routeParams: RouteParams, injector: Injector) {
        this.query = this._routeParams.get('q');
    }

    get state() {
        return this.appState.get();
    }
}
