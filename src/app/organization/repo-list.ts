import {Component, Injector} from 'angular2/core';
import {HTTP_PROVIDERS, Http, Request, RequestMethod, Headers} from 'angular2/http';
import {RouteConfig, RouteParams, Router, RouterOutlet, RouterLink, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'repo-list',
    template: require('./repo-list.html')
})
export class RepoListComponent {
    organization: String;
    avatar: String;
    ownerName: String;
    repos: String;

    constructor(private _routeParams: RouteParams, private _router: Router, injector: Injector, public http: Http) {
        let parentParams = injector.parent.parent.get(RouteParams);
        this.organization = parentParams.get('organization');
    }

    ngOnInit() {
        this.http.get(`https://api.github.com/orgs/${this.organization}/repos?per_page=50`)
        .map(res => res.json())
        .subscribe(data => {
            this.avatar = data[0].owner.avatar_url;
            this.ownerName = data[0].owner.login;
            this.repos = data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        });

    }
}
