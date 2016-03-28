import {Component, Injector} from 'angular2/core';
import {HTTP_PROVIDERS, Http, Request, RequestMethod, Headers} from 'angular2/http';
import {RouteConfig, RouteParams, Router, RouterLink} from 'angular2/router';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'repo',
  template: `
    <div class="recent-commits">
    <h4>Recent Commits</h4>
    <ul>
        <li *ngFor="#commit of commits">
            <div class="media" *ngIf="commit.author">
                <a class="media-left" href="#">
                    <img class="media-object gravatar" src="{{commit.author.avatar_url}}" alt="Generic placeholder image">
                </a>
                <div class="media-body">
                    <a href="{{commit.html_url}}" target="_blank">
                        <p class="commit-message">
                            <strong>{{commit.commit.message}}</strong>
                        </p>
                    </a>
                    <p class="commit-timestamp"><strong>{{commit.author.login}}</strong> committed on {{commit.commit.author.date}}</p>
                </div>
            </div>
        </li>
    </ul>
    </div>
    <div class="right-col-repos">
    <div class="page-header">
        <h2>
            <a [routerLink]="['../../Organization', {organization: organization}]">{{organization}}</a>
            <span class="separator">/</span>
            <a>{{repo}}</a>
        </h2>
    </div>
    <div [innerHTML]="markdown"></div>
    </div>
    `
})
export class Repo {
    organization: String;
    repo: String;
    markdown: String;
    commits: Array<Object>;

    constructor(public http: Http,  private _router: Router, private _routeParams: RouteParams, injector: Injector) {
        let parentParams = injector.parent.parent.get(RouteParams);
        this.organization = parentParams.get('organization');
        this.repo = _routeParams.get('repo');
    }

    ngOnInit() {
        let request = new Request({
            method: RequestMethod.Get,
            url: `https://api.github.com/repos/${this.organization}/${this.repo}/readme`,
            headers: new Headers({'Accept': 'application/vnd.github.full.html'})
        });
        Observable.forkJoin(
            this.http.request(request).map(res => res.text()),
            this.http.get(`https://api.github.com/repos/${this.organization}/${this.repo}/commits?per_page=25`).map(res => res.json())
        ).subscribe(res => {
            this.markdown = res[0];
            this.commits = res[1];
        });
    }

}
