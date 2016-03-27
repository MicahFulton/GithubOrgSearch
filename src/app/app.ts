/*
 * Angular 2 decorators and services
 */

import {Component} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

 import 'jquery';
 import 'bootstrap-loader';

import {Home} from './home';
import {AppState} from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ ],
  template: `
    <div class="header header_collapsed">
        <div class="content-container">
            <div class="flex-spread">
                <a href="/" class="logo"></a>
                <div class="ShareButtons">
                    <a class="social-action social-action_twitter" target="_blank">
                        <span>tweet</span>
                    </a>
                    <a class="social-action social-action_facebook" target="_blank">
                        <span>share</span>
                    </a>
                    <a class="social-action social-action_github" target="_blank">
                        <span>star</span>
                    </a>
                </div>
            </div>
            <div class="header-content">
                <div class="search-container">
                    <form method="GET">
                        <label>
                            <i class="search-icon"></i>
                            <input [(ngModel)]="filter" class="search-input" type="text" autocomplete="off" placeholder="What company are you looking for?" name="q" value="" (keyup)="appState.filterOrganizations(filter)">
                        </label>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <main>
        <router-outlet></router-outlet>
   </main>
  `
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') },
  { path: '/organization', name: 'Organization', loader: () => require('es6-promise!./organization')('Organization') }
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  constructor(public appState: AppState) {}

  get state() {
    return this.appState.get();
  }

  ngOnInit() {
    console.log('Initial App State', this.state);
    this.state.filteredOrganizations = [];
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
