import {Injectable} from 'angular2/core';
import {WebpackState} from 'angular2-hmr';
import {Http} from 'angular2/http';

@Injectable()
export class AppState {
  _state = {organizations: []}; // you must set the initial value
  constructor(webpackState: WebpackState, public http: Http) {
    this._state = webpackState.select('AppState', () => this._state);
    http.get('/assets/organizations.json')
        .map(res => res.json())
        .subscribe(data => this.organizations = data);;
  }

  get(prop?: any) {
    return this._state[prop] || this._state;
  }

  set(prop: string, value: any) {
    return this._state[prop] = value;
  }

  filterOrganizations(value) {
      console.log(value);
      if (value && value.length) {
        this.filteredOrganizations = this.organizations.filter(function(org) {
            return org && org.login && org.login.startsWith(value);
        });
        this.filteredOrganizations.length = 50;
      }

  }
}
