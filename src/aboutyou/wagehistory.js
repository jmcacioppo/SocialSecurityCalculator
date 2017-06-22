import $ from 'jquery';
import moment from 'moment';

import 'src/services/constants.js';
import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata';
import {Router} from 'aurelia-router';

@inject(UserData, Router)
export class wagehistory {
    constructor(userData, router) {
        this.userData = userData;
        this.router = router;
    }

    completeWages() {
        this.userData.client.showWages = true;
        this.userData.client.salary = this.userData.client.wages[this.userData.client.ageFrom18];
        this.router.navigate('#/personalinfo');
    }

    futureWages() {
        if(this.userData.client.employmentStatus == "Retired" || 
            this.userData.client.age > this.userData.client.yearFRA) {
            alert("You have exceeded your retirement age or you are retired. If you " + 
                "still receive income, input it in the 'Retirement Income' field on the Personal Info page.");
        }
        else this.userData.client.futureWages = true;
    }

    noFutureWages() {
        this.userData.client.futureWages = false;
    }

    back() {
        this.router.navigate('#/personalinfo');
    }
}