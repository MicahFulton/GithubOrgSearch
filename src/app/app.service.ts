import {Injectable} from 'angular2/core';
import {WebpackState} from 'angular2-hmr';
import {Http} from 'angular2/http';

@Injectable()
export class AppState {
  _state = {organizations: [], query: '', }; // you must set the initial value
  filteredOrganizations: Array<String>;
  constructor(webpackState: WebpackState, public http: Http) {
    this._state = webpackState.select('AppState', () => this._state);
  }

  get(prop?: any) {
    return this._state[prop] || this._state;
  }

  set(prop: string, value: any) {
    return this._state[prop] = value;
  }

  filterOrganizations(value) {
       this.http.get(`https://api.github.com/search/users?q=${value}&type=org&per_page=50`)
        .map(res => res.json())
        .subscribe(data => this.filteredOrganizations = data.items);

  }
}
