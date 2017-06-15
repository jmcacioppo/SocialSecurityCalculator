import $ from 'jquery';
import 'jquery-ui-dist';
import * as bootstrapToggle from 'bootstrap-toggle';
import * as ionRangeSlider from "ion-rangeslider";

import 'src/services/constants.js';
import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata';
import {Router} from 'aurelia-router';
import {wagePerc, allowedSalary, inflationIndex, tier1perc, tier2perc, tier3perc, tier1, consttier1, consttier2} from 'src/services/constants.js';

@inject(UserData, Router)
export class personalinfo {
    constructor(userData, router) {
        this.message = "Personal Information";
        this.userData = userData;
        this.router = router;
    }

    calculate() { //WORKS CORRECTLY
        var sal = this.userData.client.salary;
        var pia;
        var wage = [];
        var projectedSal = [];
        var inflationAdjusted = [];
        var topThirtyFive = [];
        var ssBase;
        
        //first year = 1956
        if(sal > 0) { //Check if there is an inputted salary
            projectedSal[wagePerc.length-1] = sal; //Current salary
            for(var i = wagePerc.length - 2; i >= 0; i--) { //Loop through each wage percentage backwards so we go from current salary
                projectedSal[i] = projectedSal[i+1] - (projectedSal[i+1] * wagePerc[i+1]); //Calculate projected salary
                if(projectedSal[i] > allowedSalary[i]) { //Check allowed salary and calculate adjusted inflation accordingly
                    inflationAdjusted[i] = allowedSalary[i] * inflationIndex[i];
                }
                else {
                    inflationAdjusted[i] = projectedSal[i] * inflationIndex[i];
                }
            }

            inflationAdjusted = inflationAdjusted.sort((a, b) => a - b); //Sort adjusted inflation to get top 35
            topThirtyFive = inflationAdjusted.slice(inflationAdjusted.length - 35, inflationAdjusted.length); 
            pia = topThirtyFive.reduce((a, b) => a + b, 0) / 420; //Primary Insurance Amount

            //Benefit Formula
            var tier1, tier2, tier3;
            var sum = consttier1 + consttier2; //Get sum of tier1 and tier2 constants
            if(pia > consttier1) { //Tier1 for benefit formula
                tier1 = consttier1 * tier1perc;
            }
            else tier1 = pia * tier1perc;
             
            
            if(pia > sum) { //Tier2 for benefit formula
                tier2 = consttier2 * tier2perc
            } 
            else tier2 = pia * tier2perc; 

            if(pia > sum) {
                tier3 = (pia - sum) * tier3perc; //Tier3 for benefit formula
            }
            else tier3 = 0;

            var sumOfTiers = tier1 + tier2 + tier3; //Add the tiers together
            ssBase = sumOfTiers * 12; //This is the monthly base SS value
            this.userData.client.ssBase = ssBase;

            this.router.navigate('#/benefits');  
        }
        else {
            alert('Salary must be greater than 0');
        }
    }

    attached() {        
        // $("#slider").ionRangeSlider({
        //     //grid: true,
        //     type: "double",
        //     min: 0,
        //     max: 100,
        //     from: 65,
        //     to: 91,
        //     step: 1,
        // });
        $("#slider").ionRangeSlider();

        $('#toggle').bootstrapToggle();
        
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