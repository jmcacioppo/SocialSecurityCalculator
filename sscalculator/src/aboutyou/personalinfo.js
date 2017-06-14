import $ from 'jquery';
import 'jquery-ui-dist';
//import 'bootstrap-toggle';

import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata'

@inject(UserData)
export class personalinfo {
    constructor(userData) {
        this.message = "Personal Information";
        this.userData = userData;
    }

    calculate() {
        console.log(this.userData);
        var hello = parseInt(this.userData.client.salary) + parseInt(this.userData.client.numOfDependents);
        console.log(hello);
        $.getJSON("src/services/wagePerc.json", function(result){
            console.log(result[0]);
        });

    }

    attached() {        
        $("#empStatus").change(function() { //Show salary option if client is employed
            var val = $(this).val();
            if(val == "Employed" || val == "Business Owner") $('#salary').show();
            else $('#salary').hide();
        });

        $("#maritalStatus").change(function() { //Show salary option if client is employed
            var val = $(this).val();
            if(val == "Divorced") $('#salary').show();
            else $('#salary').hide();
        });

        $('#ageOfDependent').hide(); //Show age of dependent option if number of dependents > 0
        $("#numOfDependents").change(function() {
            var val = $(this).val();
            if(val > 0) $('#ageOfDependent').show();
            else $('#ageOfDependent').hide();
        });
        
        $('#retire').slider({ //Slider for retirement age and life expectancy
            range: true, 
            min: 50, 
            max: 100, 
            values: [65, 91],
            slide: function( event, ui ) {
                $( "#amount" ).val( "Retire at " + ui.values[ 0 ] + " - Live to " + ui.values[ 1 ] );
            }
        });

        $( "#amount" ).val( "Retire at " + $( "#retire" ).slider( "values", 0 ) +
            " - Live to  " + $( "#retire" ).slider( "values", 1 ) ); //Gets amount from retirement slider
            
        $('#next').click(function() { //Move to next page if correct fields are complete
            
        });
}
}