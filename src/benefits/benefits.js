import $ from 'jquery';
import 'jquery-ui-dist';
import * as ionRangeSlider from "ion-rangeslider";

import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata';
import {Router} from 'aurelia-router';

@inject(UserData, Router)
export class benefits {
    constructor(userData, router) {
        this.userData = userData;
        this.router = router;
    }

    benefitsCalc() {
        console.log(this.userData);
    }

    attached () {        
        $('#isEligible').hide();
        $("#eligible").change(function() { 
            var val = $(this).is(':checked');
            if(val == true) $('#isEligible').show();
            else $('#isEligible').hide();
        });
        
        $('#yrsOfSubEarnings').hide();
        $("#wep").change(function() { 
            var val = $(this).is(':checked');
            if(val == true) $('#yrsOfSubEarnings').show();
            else $('#yrsOfSubEarnings').hide();
        });
        
        $("#benefitslider").ionRangeSlider({
            grid: true,
            type: "single",
            min: 0,
            max: 10,
            from: 2.5,
            step: 0.1,
            postfix: "%",
            onFinish: (data) => {
                this.userData.client.cola = data.from;
            }
        });
   }
}