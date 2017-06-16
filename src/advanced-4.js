import {Chart} from 'node_modules/chart.js/dist/Chart.js';
import 'bootstrap'
import {inject} from 'aurelia-framework';
import {Data} from './data';
import {Router} from 'aurelia-router';

@inject(Data, Router)
export class Advanced4 {
    constructor(data, router) {
        this.data = data;
        this.router = router;
    }

    //This handles routing to the next page.
    next() {
      document.getElementById("advanced1").className="active";
      document.getElementById("advanced2").className="active";
      document.getElementById("advanced3").className="active";
      document.getElementById("advanced4").className="active";
      document.getElementById("advancedResults").className="active";

      this.router.navigate('#/advanced-results');
    }
}
