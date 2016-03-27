import {Component} from 'angular2/core';
import {HTTP_PROVIDERS, Http, Request, RequestMethod, Headers} from 'angular2/http';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`About` component loaded asynchronously');

@Component({
  selector: 'about',
  template: require('./about.html')
})
export class About {
  constructor(http:Http) {
    http.request(new Request({
      method: RequestMethod.Get,
      url: 'https://api.github.com/repos/pobox/Bobo-Test/readme',
      headers: new Headers({'Accept': 'application/vnd.github.full.html'})
    })).subscribe(res => {
        this.markdown = res._body;
  //URL should have included '?password=123'
  console.log('res', res);
});;
  }

  ngOnInit() {
    console.log('hello `About` component');
    // static data that is bundled
    var mockData = require('assets/mock-data/mock-data.json');
    console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    this.asyncDataWithWebpack();
  }
  asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    var asyncMockDataPromiseFactory = require('es6-promise!assets/mock-data/mock-data.json');
    setTimeout(() => {

      let asyncDataPromise = asyncMockDataPromiseFactory();
      asyncDataPromise.then(json => {
        console.log('async mockData', json);
      });

    });
  }

}
