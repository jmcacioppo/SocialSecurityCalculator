import {inject} from 'aurelia-framework';
import {Data} from './data';
import {Router} from 'aurelia-router';

@inject(Data, Router)
export class Advanced3 {
    constructor(data, router) {
      this.data = data;
      this.router = router;
    }

    //This navigates to the next page
    next() {
      document.getElementById("advanced1").className="active";
      document.getElementById("advanced2").className="active";
      document.getElementById("advanced3").className="active";
      // document.getElementById("advanced4").className="active";
      document.getElementById("advancedResults").className="active";
      this.router.navigate('#/advanced-results');

    }

    //Calculates the GPO offset. 
    calculateGPOOffset(monthlyPension) {
      this.data.governmentPensionOffset = (2 / 3) * monthlyPension;
    }

    calculateWEPOffset(substantialIncome, yearUntilRetirement) {
      //TODO: Change value of penatly rate to out of actual table. 
      wepOffset = 500 * 200 - 100;
      this.data.averageIndexedMonthlyEarnings - wepOffset;
    }

    clickedWEP() {
      if(document.getElementById('yes-wep')) {
          document.getElementById('wep-input').style.display = 'block';
          return true;
      } else {
          return false;
      }
    }

    clickedGPO() {
      if(document.getElementById('yes-gpo')) {
          document.getElementById('gpo-input').style.display = 'block';
          return true;
      } else {
          return false;
      }
    }
}
