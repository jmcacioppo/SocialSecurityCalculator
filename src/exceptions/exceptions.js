import $ from 'jquery';
import 'jquery-ui-dist';
import * as bootstrapToggle from 'bootstrap-toggle';
import * as ionRangeSlider from "ion-rangeslider";
import moment from 'moment';

import 'src/services/constants.js';
import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata';
import {Router} from 'aurelia-router';
import {wagePerc, allowedSalary, inflationIndex, tier1perc, tier2perc, tier3perc, 
    tier1, consttier1, consttier2,subEarningsPerc, EL1943plus, EL1955, EL1956, EL1957,
    EL1958, EL1959, EL1960plus} from 'src/services/constants.js';

@inject(UserData, Router)
export class exceptions {
    constructor(userData, router)
    {
        this.clientMilitaryService = false;
        this.clientWorkedOnAFarm = false;
        this.clientWorkedInAHousehold = false;
        this.clientWorkedOnARailroad = false;
        this.clientRecievePension = false;
        this.clientWorkedForeignGov = false;

        this.spouseMilitaryService = false;
        this.spouseWorkedOnAFarm = false;
        this.spouseWorkedInAHousehold = false;
        this.spouseWorkedOnARailroad = false;
        this.spouseRecievePension = false;
        this.spouseWorkedForeignGov = false;

        this.router = router;
    }

    calculate()
    {
        

        this.router.navigate('#/benefits');
    }
    
}