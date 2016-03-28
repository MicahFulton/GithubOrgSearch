import {Component} from 'angular2/core';
import {HTTP_PROVIDERS, Http, Request, RequestMethod, Headers} from 'angular2/http';
import {RouteConfig, RouteParams, Router, RouterOutlet, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from 'angular2/router';
import {RepoListComponent} from './repo-list';
import {Repo} from './repo';

@RouteConfig([
    { path: '/', name: 'RepoListComponent', component: RepoListComponent, useAsDefault: true },
    { path: ':repo', name: 'Repo', component: Repo }
])
@Component({
    selector: 'organization',
    template: require('./organization.html'),
    directives: []
})
export class Organization {
    organization: String;
    repo: String;
    avatar: String;
    ownerName: String;
    repos: Array<String>;
    commits: Array<Object>;

    constructor(public http: Http, private _router: Router, private _routeParams: RouteParams) {
        this.organization = this._routeParams.get('organization');
    }

    ngOnInit() {
        this.repo = this._routeParams.get('repo');
        this.http.get(`https://api.github.com/orgs/${this.organization}/repos?per_page=50`)
            .map(res => res.json())
            .subscribe(data => {
                this.avatar = data[0].owner.avatar_url;
                this.ownerName = data[0].owner.login;
                this.repos = data.sort((a, b) => b.stargazers_count - a.stargazers_count);
            });

    }
}
