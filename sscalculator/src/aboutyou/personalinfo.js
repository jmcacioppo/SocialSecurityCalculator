import $ from 'jquery';
import 'jquery-ui-dist';
import * as bootstrapToggle from 'bootstrap-toggle';

import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata'

@inject(UserData)
export class personalinfo {
    constructor(userData) {
        this.message = "Personal Information";
        this.userData = userData;
        this.lol = "";
    }

    calculate() { 
        var sal = this.userData.client.salary;
        var pia;
        var wage = [];
        var projectedSal = [];
        var inflationAdjusted = [];
        var topThirtyFive = [];
        var ssBase;

        // console.log(this.userData);
        // function put(ssBase) {
        //     this.userData.client.ssBase = ssBase;
        //     console.log(this.userData.client.ssBase);
        // }

        $.getJSON("src/services/constants.json", function(result){ //first year = 1956
            if(sal > 0) { //Check if there is an inputted salary
                projectedSal[result.wagePerc.length-1] = sal; //Current salary
                for(var i = result.wagePerc.length - 2; i >= 0; i--) { //Loop through each wage percentage backwards so we go from current salary
                    projectedSal[i] = projectedSal[i+1] - (projectedSal[i+1] * result.wagePerc[i+1]); //Calculate projected salary
                    if(projectedSal[i] > result.allowedSalary[i]) { //Check allowed salary and calculate adjusted inflation accordingly
                        inflationAdjusted[i] = result.allowedSalary[i] * result.inflationIndex[i];
                    }
                    else {
                        inflationAdjusted[i] = projectedSal[i] * result.inflationIndex[i];
                    }
                }

                inflationAdjusted = inflationAdjusted.sort((a, b) => a - b); //Sort adjusted inflation to get top 35
                topThirtyFive = inflationAdjusted.slice(inflationAdjusted.length - 35, inflationAdjusted.length); 
                pia = topThirtyFive.reduce((a, b) => a + b, 0) / 420; //Primary Insurance Amount

                //Benefit Formula
                var sum = parseInt(result.tier1) + parseInt(result.tier2); //Get sum of tier1 and tier2 constants
                var tier1 = result.tier1 * result.tier1perc; //Tier1 for benefit formula
                var tier2;
                if(pia < (result.tier1 + result.tier2)) { //Tier2 for benefit formula
                    tier2 = result.tier2 * result.tier2perc
                } 
                else {
                    tier2 = (pia - sum) * result.tier2perc;
                } 
                var tier3 = (pia - sum) * result.tier3perc; //Tier3 for benefit formula

                var sumOfTiers = tier1 + tier2 + tier3; //Add the tiers together
                ssBase = sumOfTiers * 12; //This is the monthly base SS value
                this.lol = ssBase;
                console.log(this.lol);
                //put(ssBase);
                // this.userData.client.ssBase = ssBase;
                // console.log(this.userData.client.ssBase);
               
            }
        });

        // this.userData.client.ssBase = ssBase;
        // console.log(this.userData.client.ssBase);
        
    }

    attached() {        
        $('#check').bootstrapToggle();
        
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