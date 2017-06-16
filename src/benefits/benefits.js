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

    attached () {
        

        $("#benefitslider").ionRangeSlider({
            grid: true,
            type: "single",
            min: 0,
            max: 10,
            from: 2.5,
            step: 0.1,
            onFinish: (data) => {
                this.userData.client.cola = data.from;
                console.log(this.userData.client.cola);
            }
        });

        // $( "#cola" ).val( $( "#benefitslider" ).slider( "values", 0 ) +"%");
   }
}