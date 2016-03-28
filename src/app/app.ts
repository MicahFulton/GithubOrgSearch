/*
 * Angular 2 decorators and services
 */

import {Component} from 'angular2/core';
import {RouteConfig, Router, RouterOutlet, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

 import 'jquery';
 import 'bootstrap-loader';

import {Home} from './home';
import {Organization} from './organization';
import {Search} from './search';
import {AppState} from './app.service';

@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ROUTER_PROVIDERS],
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="header header_collapsed">
        <div class="content-container">
            <div class="flex-spread">
                <a href="/" class="logo"></a>
                <div class="ShareButtons">
                    <a class="social-action social-action_twitter" href="https://twitter.com/intent/tweet?text=Check%20out%20Github%20Organization%20Search!&url=https://github.com/MicahFulton/GithubOrgSearch" target="_blank">
                        <span>tweet</span>
                    </a>
                    <a class="social-action social-action_facebook" href="https://www.facebook.com/sharer/sharer.php?u=https://github.com/MicahFulton/GithubOrgSearch" target="_blank">
                        <span>share</span>
                    </a>
                    <a class="social-action social-action_github" href="https://github.com/MicahFulton/GithubOrgSearch" target="_blank">
                        <span>star</span>
                    </a>
                </div>
            </div>
            <div class="header-content">
                <div class="search-container">
                    <form>
                        <label>
                            <a [routerLink]="['Index']">
                                <i class="search-icon"></i>
                            </a>
                            <input id='searchInput' [hidden]="isRouteActive(['./Index'])" [(ngModel)]="state.query" class="search-input" type="text" autocomplete="off" placeholder="What organization are you looking for?" name="q" value="" (keyup)="search(state.query)">
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
  { path: '/', name: 'Index', component: Home, useAsDefault: true },
  { path: '/search', name: 'Search', component: Search},
  { path: '/:organization/...', name: 'Organization', component: Organization}
])
export class App {

  constructor(public appState: AppState, private router: Router) {

  }

  get state() {
    return this.appState.get();
  }

  ngOnInit() {
      this.state.filteredOrganizations = [];
  }

  search(query) {
      if (!this.isRouteActive(['Search'])) {
          this.router.navigate(['Search', { q: query }]);
          this.appState.filterOrganizations(query);
      }
  }

  isRouteActive(route) {
    return this.router.isRouteActive(this.router.generate(route));
  }

}
