import $ from 'jquery';
import moment from 'moment';

import 'src/services/constants.js';
import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata';
import {Router} from 'aurelia-router';

@inject(UserData, Router)
export class deceasedwagehistory {
    constructor(userData, router) {
        this.userData = userData;
        this.router = router;
    }

    completeWages() {
        for (var i = 0; i < this.userData.deceased.wages.length; i++) {
            if (isNaN(this.userData.deceased.wages[i]))
            {
                alert("Enter valid wages.");
                return;
            }
        }

        this.userData.deceased.showWages = true;
        this.userData.deceased.salary = this.userData.deceased.wages[this.userData.deceased.ageFrom18];
        this.router.navigate('#/personalinfo');
    }

    back() {
        this.router.navigate('#/personalinfo');
    }
}