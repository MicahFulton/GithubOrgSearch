import {Injectable} from 'angular2/core';


@Injectable()
export class Title {
  value = 'Angular 2';
  constructor() {

  }

  getData() {
    console.log('Title#getData(): Get Data');

    // return {
    //   value: 'AngularClass'
    // };
  }

}
