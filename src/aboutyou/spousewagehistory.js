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
        this.userData.spouse.showWages = true;
        this.router.navigate('#/personalinfo');
    }

    back() {
        this.router.navigate('#/personalinfo');
    }
}