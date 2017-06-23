import $ from 'jquery';
import moment from 'moment';

import 'src/services/constants.js';
import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata';
import {Router} from 'aurelia-router';

@inject(UserData, Router)
export class spousewagehistory {
    constructor(userData, router) {
        this.userData = userData;
        this.router = router;
    }

    completeWages() {
        for (var i = 0; i < this.userData.spouse.wages.length; i++) {
            if (isNaN(this.userData.spouse.wages[i]))
            {
                alert("Enter valid wages.");
                return;
            }
        }

        this.userData.spouse.showWages = true;
        this.userData.spouse.salary = this.userData.spouse.wages[this.userData.spouse.ageFrom18];
        this.router.navigate('#/personalinfo');
    }

    futureWages() {
        if(this.userData.spouse.employmentStatus == "Retired" || 
            this.userData.spouse.age > this.userData.spouse.yearFRA) {
            alert("You have exceeded your retirement age or you are retired. If you " + 
                "still receive income, input it in the 'Retirement Income' field on the Personal Info page.");
        }
        else this.userData.spouse.futureWages = true;
    }

    noFutureWages() {
        this.userData.spouse.futureWages = false;
    }

    back() {
        this.router.navigate('#/personalinfo');
    }
}