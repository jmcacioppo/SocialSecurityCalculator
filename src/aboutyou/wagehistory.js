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
    
    showWages() {
        this.userData.client.showWages = true;
    }

    completeWages() {
        $('input').each(function() {
            if(!$(this).val) alert("Input all salaries.");
            else this.router.navigate('#/personalinfo');
        });
    }
}