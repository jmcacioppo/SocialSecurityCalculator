import $ from 'jquery';
import 'jquery-ui-dist';

import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata'
import {Router} from 'aurelia-router';

@inject(UserData, Router)
export class retirementinfo {
   constuctor(userData, router) {
       this.userData = userData;
       this.router = router;
   }

   printstuff() {
       console.log(userData);
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

