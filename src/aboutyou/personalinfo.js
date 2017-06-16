import $ from 'jquery';
import 'jquery-ui-dist';
import * as bootstrapToggle from 'bootstrap-toggle';
import * as ionRangeSlider from "ion-rangeslider";
import moment from 'moment';

import 'src/services/constants.js';
import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata';
import {Router} from 'aurelia-router';
import {wagePerc, allowedSalary, inflationIndex, tier1perc, tier2perc, tier3perc, 
    tier1, consttier1, consttier2,subEarningsPerc, EL1943plus, EL1955, EL1956, EL1957,
    EL1958, EL1959, EL1960plus} from 'src/services/constants.js';

@inject(UserData, Router)
export class personalinfo {
    constructor(userData, router) {
        this.userData = userData;
        this.router = router;
    }

    calculate() {
        //GET ALL USER DATA
        var name = this.userData.client.name; 
        var gender = this.userData.client.gender;
        var dob = this.userData.client.dateOfBirth;
        var empStatus = this.userData.client.employmentStatus;
        var sal = this.userData.client.salary;
        var maritalStatus = this.userData.client.maritalStatus;
        var numOfDependents = this.userData.client.numOfDependents;
        var wep = this.userData.client.wep;
        var yrsOfSubearnings = this.userData.client.yrsOfSubearnings;
        var retirementAge = this.userData.client.retirementAge;

        //NEW VARIABLES
        var pia;
        var wage = [];
        var projectedSal = [];
        var inflationAdjusted = [];
        var topThirtyFive = [];
        var ssBase;
        var age;

        //MAKE SURE EVERYTHING IS INPUTTED
        // if(!name || !gender || !dob || !empStatus ||
        //     empStatus == "Please Select" || !maritalStatus || 
        //     maritalStatus == "Please Select" || !numOfDependents) {
        //         alert("Fill in all information");
        //         console.log(name + " " + gender + " " + sal + " " + dob);
        //         return;
        // }

        //INTERPRETS DATE AND GETS AGE
        var date = moment(dob, 'M/D/YYYY');
        var yearOfBirth = date.format('YYYY');
        if(!((dob.indexOf(date.format('MM/DD/YYYY')) >= 0)
            || (dob.indexOf(date.format('M/DD/YYYY')) >= 0)
            || (dob.indexOf(date.format('MM/D/YYYY')) >= 0)
            || (dob.indexOf(date.format('M/D/YYYY')) >= 0))
            || !date.isValid()
            || yearOfBirth > 2017) {
                alert('Invalid Date of Birth');
                return;
            }
        else {
            this.userData.client.age = moment().diff(dob, 'years');
            age = moment().diff(dob, 'years');
        }

        var ageFrom18 = age - 18;
        var yrsUntilRetire = retirementAge - age;
        
        //COMPUTES PROJECTED SALARY 
        if(ageFrom18 >= 0) {
            projectedSal[ageFrom18-1] = parseInt(sal); //Current salary
            for(var i = ageFrom18 - 2; i >= 0; i--) { //Loop through each wage percentage backwards so we go from current salary
                projectedSal[i] = projectedSal[i+1] - (projectedSal[i+1] * wagePerc[i+1]); //Calculate projected salary
            }
            for(var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) { //Loop through each wage percentage backwards so we go from current salary
                projectedSal[i] = parseFloat(projectedSal[i-1]) + (parseFloat(projectedSal[i-1]) * wagePerc[wagePerc.length-1]); //Calculate projected salary
            }

            //COMPUTES SALARY ADJUSTED FOR INFLATION
            for(var i = ageFrom18-1; i >= 0; i--) {
                if(projectedSal[i] > allowedSalary[inflationIndex.length-(ageFrom18-i)-1]) { //Check allowed salary and calculate adjusted inflation accordingly
                    inflationAdjusted[i] = allowedSalary[inflationIndex.length-(ageFrom18-i)-1] * inflationIndex[inflationIndex.length-(ageFrom18-i)-1];
                }
                else {
                    inflationAdjusted[i] = projectedSal[i] * inflationIndex[inflationIndex.length-(ageFrom18-i)-1];
                }
            }
            for(var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) {
                if(projectedSal[i] > allowedSalary[i]) { //Check allowed salary and calculate adjusted inflation accordingly
                    var lastYearAllowed = allowedSalary[allowedSalary.length-1];
                    inflationAdjusted[i] = lastYearAllowed * inflationIndex[inflationIndex.length-1];
                    lastYearAllowed = lastYearAllowed * 1.021;
            }
                else {
                    inflationAdjusted[i] = projectedSal[i] * inflationIndex[inflationIndex.length-1];
                }
            }

            //SORT AND GET TOP 35 ADJUSTED INFLATION SALARIES
            inflationAdjusted = inflationAdjusted.sort((a, b) => a - b); 
            topThirtyFive = inflationAdjusted.slice(inflationAdjusted.length - 35, inflationAdjusted.length); 

            //PRIMARY INSURANCE AMOUNT
            pia = topThirtyFive.reduce((a, b) => a + b, 0) / 420; 

            //FIX PIA BASED ON YEAR OF BIRTH AND WHEN THEY WANT TO RETIRE
            switch(yearOfBirth) {
                case 1955:
                    switch(retirementAge) {
                        case 62: pia = pia * EL1955[0]; break;
                        case 63: pia = pia * EL1955[1]; break;
                        case 64: pia = pia * EL1955[2]; break;
                        case 65: pia = pia * EL1955[3]; break;
                        case 66: pia = pia * EL1955[4]; break;
                        case 67: pia = pia * EL1955[5]; break;
                        case 68: pia = pia * EL1955[6]; break;
                        case 69: pia = pia * EL1955[7]; break;
                        case 70: pia = pia * EL1955[8]; break;
                    }
                case 1956:
                    switch(retirementAge) {
                        case 62: pia = pia * EL1956[0]; break;
                        case 63: pia = pia * EL1956[1]; break;
                        case 64: pia = pia * EL1956[2]; break;
                        case 65: pia = pia * EL1956[3]; break;
                        case 66: pia = pia * EL1956[4]; break;
                        case 67: pia = pia * EL1956[5]; break;
                        case 68: pia = pia * EL1956[6]; break;
                        case 69: pia = pia * EL1956[7]; break;
                        case 70: pia = pia * EL1956[8]; break;
                    }    
                case 1957:
                    switch(retirementAge) {
                        case 62: pia = pia * EL1957[0]; break;
                        case 63: pia = pia * EL1957[1]; break;
                        case 64: pia = pia * EL1957[2]; break;
                        case 65: pia = pia * EL1957[3]; break;
                        case 66: pia = pia * EL1957[4]; break;
                        case 67: pia = pia * EL1957[5]; break;
                        case 68: pia = pia * EL1957[6]; break;
                        case 69: pia = pia * EL1957[7]; break;
                        case 70: pia = pia * EL1957[8]; break;
                    }
                case 1958:
                    switch(retirementAge) {
                        case 62: pia = pia * EL1958[0]; break;
                        case 63: pia = pia * EL1958[1]; break;
                        case 64: pia = pia * EL1958[2]; break;
                        case 65: pia = pia * EL1958[3]; break;
                        case 66: pia = pia * EL1958[4]; break;
                        case 67: pia = pia * EL1958[5]; break;
                        case 68: pia = pia * EL1958[6]; break;
                        case 69: pia = pia * EL1958[7]; break;
                        case 70: pia = pia * EL1958[8]; break;
                    }
                case 1959:
                    switch(retirementAge) {
                        case 62: pia = pia * EL1959[0]; break;
                        case 63: pia = pia * EL1959[1]; break;
                        case 64: pia = pia * EL1959[2]; break;
                        case 65: pia = pia * EL1959[3]; break;
                        case 66: pia = pia * EL1959[4]; break;
                        case 67: pia = pia * EL1959[5]; break;
                        case 68: pia = pia * EL1959[6]; break;
                        case 69: pia = pia * EL1959[7]; break;
                        case 70: pia = pia * EL1959[8]; break;
                    }     
                default:
                    if(yearOfBirth <= 1954) {
                        switch(retirementAge) {
                            case 62: pia = pia * EL1943plus[0]; break;
                            case 63: pia = pia * EL1943plus[1]; break;
                            case 64: pia = pia * EL1943plus[2]; break;
                            case 65: pia = pia * EL1943plus[3]; break;
                            case 66: pia = pia * EL1943plus[4]; break;
                            case 67: pia = pia * EL1943plus[5]; break;
                            case 68: pia = pia * EL1943plus[6]; break;
                            case 69: pia = pia * EL1943plus[7]; break;
                            case 70: pia = pia * EL1943plus[8]; break;
                        }   
                    }  
                    else {
                        switch(retirementAge) {
                            case 62: pia = pia * EL1960plus[0]; break;
                            case 63: pia = pia * EL1960plus[1]; break;
                            case 64: pia = pia * EL1960plus[2]; break;
                            case 65: pia = pia * EL1960plus[3]; break;
                            case 66: pia = pia * EL1960plus[4]; break;
                            case 67: pia = pia * EL1960plus[5]; break;
                            case 68: pia = pia * EL1960plus[6]; break;
                            case 69: pia = pia * EL1960plus[7]; break;
                            case 70: pia = pia * EL1960plus[8]; break;
                        }   
                    }     
            }

            yrsOfSubearnings = 22;
            //Benefit Formula
            var tier1, tier2, tier3;
            var sum = consttier1 + consttier2; //Get sum of tier1 and tier2 constants
            if(pia > consttier1) { //Tier1 for benefit formula - checking WEP and years of substantial earnings
                switch(yrsOfSubearnings) {
                    case 29: tier1 = consttier1 * subEarningsPerc[1]; break;
                    case 28: tier1 = consttier1 * subEarningsPerc[2]; break;
                    case 27: tier1 = consttier1 * subEarningsPerc[3]; break;
                    case 26: tier1 = consttier1 * subEarningsPerc[4]; break;
                    case 25: tier1 = consttier1 * subEarningsPerc[5]; break;
                    case 24: tier1 = consttier1 * subEarningsPerc[6]; break;    
                    case 23: tier1 = consttier1 * subEarningsPerc[7]; break;
                    case 22: tier1 = consttier1 * subEarningsPerc[8]; break;
                    case 21: tier1 = consttier1 * subEarningsPerc[9]; break;
                    default: 
                        if(yrsOfSubearnings >= 30) tier1 = consttier1 * subEarningsPerc[0];
                        else tier1 = consttier1 * subEarningsPerc[10];
                }
            }
            else {
                switch(yrsOfSubearnings) {
                    case 29: tier1 = pia * subEarningsPerc[1]; break;
                    case 28: tier1 = pia * subEarningsPerc[2]; break;
                    case 27: tier1 = pia * subEarningsPerc[3]; break;
                    case 26: tier1 = pia * subEarningsPerc[4]; break;
                    case 25: tier1 = pia * subEarningsPerc[5]; break;
                    case 24: tier1 = pia * subEarningsPerc[6]; break;    
                    case 23: tier1 = pia * subEarningsPerc[7]; break;
                    case 22: tier1 = pia * subEarningsPerc[8]; break;
                    case 21: tier1 = pia * subEarningsPerc[9]; break;
                    default: 
                        if(yrsOfSubearnings >= 30) tier1 = pia * subEarningsPerc[0];
                        else tier1 = pia * subEarningsPerc[10];
                }
            } 
            
            //TIER2 FOR BENEFIT FORMULA
            if(pia > sum) { 
                tier2 = consttier2 * tier2perc
            } 
            else tier2 = pia * tier2perc; 

            //TIER3 FOR BENEFIT FORMULA
            if(pia > sum) {
                tier3 = (pia - sum) * tier3perc; 
            }
            else tier3 = 0;

            //ADD TIERS AND GET YEARLY BASE VALUE FOR SOCIAL SECURITY
            var sumOfTiers = tier1 + tier2 + tier3; 
            ssBase = sumOfTiers * 12; 
            console.log(sumOfTiers);
            console.log(ssBase);
            this.userData.client.baseSS = ssBase;

            console.log(this.userData);

            //GO TO BENEFITS
            this.router.navigate('#/benefits');  
        }
        else {
            alert("You're not greater than 18.");
        }
    }

    //NAVIGATE TO WAGE HISTORY
    wagehistory() {
        this.router.navigate('#/wagehistory');  
    }

    attached() {        
        //RETIREMENT AGE AND LIFE EXPECTANCY SLIDERS
        $("#slider").ionRangeSlider({
            grid: true,
            type: "double",
            min: 0,
            max: 100,
            from: 65,
            to: 91,
            step: 1,
            onFinish: (data) => {
                this.userData.client.retirementAge = data.from;
                this.userData.client.lifeExpectancy = data.to;
            }
        });

        $("#sliderSpouse").ionRangeSlider({
            grid: true,
            type: "double",
            min: 0,
            max: 100,
            from: 65,
            to: 93,
            step: 1,
            onFinish: (data) => {
                this.userData.spouse.retirementAge = data.from;
                this.userData.spouse.lifeExpectancy = data.to;
            }
        });

        //TOGGLE SWITCH
        $('#toggle').bootstrapToggle();
        
        //SHOW SALARY IF CLIENT IS EMPLOYED
        $('#salary').hide();
        $("#empStatus").change(function() { 
            var val = $(this).val();
            if(val == "Employed" || val == "Business Owner") $('#salary').show();
            else $('#salary').hide();
        });

        //SALARY FOR SPOUSE
        $('#salarySpouse').hide();
        $("#empStatusSpouse").change(function() { 
            var val = $(this).val();
            if(val == "Employed" || val == "Business Owner") $('#salarySpouse').show();
            else $('#salarySpouse').hide();
        });

        //CHECK FOR DIVORCE OR MARRIED CLIENT
        $('#divorceCheck').hide();
        $('#spouse').hide();
        $("#maritalStatus").change(function() { 
            var val = $(this).val();
            if(val == "Divorced") $('#divorceCheck').show();
            else $('#divorceCheck').hide();

            if(val == "Married") $('#spouse').show();
            else $('#spouse').hide();
        });

        //CHECK THE NUMBER OF DEPENDENTS AND ADD APPROPRIATE AMOUNT OF THEM
        $('#ageOfDependent').hide(); 
        $("#numOfDependents").change(function() {
            var val = $(this).val();
            if(val > 0) {
                $('#ageOfDependent').show();
                for(var i = 1; i < val; i++) {
                    $('#ageOfDependent').append('<input type="text" value.bind="userData.client.ageOfDependent[' + i + 
                    ']" class="form-control" placeholder="10">');
                }
            }
            else $('#ageOfDependent').hide();
        });
        // console.log(this.userData.client.ageOfDependent[0]);
        // console.log(this.userData.client.ageOfDependent[1]);
}
}