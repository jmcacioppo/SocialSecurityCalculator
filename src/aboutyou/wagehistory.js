import $ from 'jquery';

import 'src/services/constants.js';
import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata';
import {Router} from 'aurelia-router';
import {wagePerc, allowedSalary, inflationIndex, tier1perc, tier2perc, tier3perc, tier1, consttier1, consttier2} from 'src/services/constants.js';

@inject(UserData, Router)
export class wagehistory {
    constructor(userData, router) {
        this.userData = userData;
        this.router = router;
    }
    
    completeWages() {

    }
}