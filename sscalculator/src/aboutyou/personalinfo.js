import $ from 'jquery';
import 'jquery-ui-dist';

import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata'

@inject(UserData)
export class personalinfo {
    constructor(userData) {
        this.message = "Personal Information";
        this.userData = userData;
    }

    print() {
        console.log(this.userData);
    }

    attached () {
        $('#retire').slider({
            range: true, 
            min: 50, 
            max: 100, 
            values: [65, 91],
            slide: function( event, ui ) {
                $( "#amount" ).val( "Retire at " + ui.values[ 0 ] + " - Live to " + ui.values[ 1 ] );
            }
        });

        $( "#amount" ).val( "Retire at " + $( "#retire" ).slider( "values", 0 ) +
            " - Live to  " + $( "#retire" ).slider( "values", 1 ) );
   }
}