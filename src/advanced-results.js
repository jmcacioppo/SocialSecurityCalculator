import {Chart} from 'node_modules/chart.js/dist/Chart.js';
import 'bootstrap'
import {inject} from 'aurelia-framework';
import {Data} from './data';
import {Router} from 'aurelia-router';

@inject(Data, Router)
export class AdvancedResults {
    constructor(data, router) {
      this.data = data;
      this.router = router;
    } 
}
