import $ from 'jquery';
import 'jquery-ui-dist';
import * as bootstrapToggle from 'bootstrap-toggle';
import * as ionRangeSlider from "ion-rangeslider";

import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata';
import {Router} from 'aurelia-router';
import {wagePerc, allowedSalary, inflationIndex, tier1perc, tier2perc, tier3perc, 
    bendtier1, bendtier2,subEarningsPerc, EL1943plus, EL1955, EL1956, EL1957,
    EL1958, EL1959, EL1960plus, projEarningsLimit, spousalBenefits1943to1954,
    spousalBenefits1955, spousalBenefits1956, spousalBenefits1957, spousalBenefits1958,
    spousalBenefits1959, spousalBenefits1960to2000} from 'src/services/constants.js';

@inject(UserData, Router)
export class benefits {
    constructor(userData, router) {
        this.userData = userData;
        this.router = router;
    }

    benefitsCalc() {
        function calculateSSBase(person, retirementAge, i) {
            var age = person.age;
            var yearOfBirth = person.yearOfBirth;
            var pia = person.pia[i];
            var yrsOfSubearnings = person.yrsOfSubearnings;
            var ssBase, consttier1, consttier2;

            var ageFrom62 = 62 - age; //get tiers based on when client turns 62
            consttier1 = bendtier1[8 + ageFrom62]; //8 is index of 2017 in bend point constants
            consttier2 = bendtier2[8 + ageFrom62];

            //Benefit Formula
            var tier1, tier2, tier3;
            var sum = consttier1 + consttier2; //Get sum of tier1 and tier2 constants

            //Tier1 for benefit formula - accounting for WEP and years of substantial earnings
            if (person.wep) {
                if(pia > consttier1) { 
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
            }
            else { // Tier 1 with no WEP 
                if(pia > consttier1) tier1 = consttier1 * tier1perc;
                else tier1 = pia * tier1perc;
            }
            
            //TIER2 FOR BENEFIT FORMULA
            if(pia > sum) { 
                tier2 = consttier2 * tier2perc
            } 
            else tier2 = (pia-consttier1) * tier2perc; 

            //TIER3 FOR BENEFIT FORMULA
            if(pia > sum) {
                tier3 = (pia - sum) * tier3perc; 
            }
            else tier3 = 0;


            //ADD TIERS AND GET YEARLY BASE VALUE FOR SOCIAL SECURITY
            var sumOfTiers = tier1 + tier2 + tier3; 
            
            // console.log("Tier 1 " + tier1 + " tier 2 " + tier2 + " tier3 " + tier3 + " sumOfTiers" + sumOfTiers);

            //FIX SUMOFTIERS BASED ON EARLY/LATE ANALYSIS
            switch(yearOfBirth) {
                case 1955:
                    switch(retirementAge) {
                        case 62: sumOfTiers = sumOfTiers * EL1955[0]; break;
                        case 63: sumOfTiers = sumOfTiers * EL1955[1]; break;
                        case 64: sumOfTiers = sumOfTiers * EL1955[2]; break;
                        case 65: sumOfTiers = sumOfTiers * EL1955[3]; break;
                        case 66: sumOfTiers = sumOfTiers * EL1955[4]; break;
                        case 67: sumOfTiers = sumOfTiers * EL1955[5]; break;
                        case 68: sumOfTiers = sumOfTiers * EL1955[6]; break;
                        case 69: sumOfTiers = sumOfTiers * EL1955[7]; break;
                        case 70: sumOfTiers = sumOfTiers * EL1955[8]; break;
                    }
                    break;
                case 1956:
                    switch(retirementAge) {
                        case 62: sumOfTiers = sumOfTiers * EL1956[0]; break;
                        case 63: sumOfTiers = sumOfTiers * EL1956[1]; break;
                        case 64: sumOfTiers = sumOfTiers * EL1956[2]; break;
                        case 65: sumOfTiers = sumOfTiers * EL1956[3]; break;
                        case 66: sumOfTiers = sumOfTiers * EL1956[4]; break;
                        case 67: sumOfTiers = sumOfTiers * EL1956[5]; break;
                        case 68: sumOfTiers = sumOfTiers * EL1956[6]; break;
                        case 69: sumOfTiers = sumOfTiers * EL1956[7]; break;
                        case 70: sumOfTiers = sumOfTiers * EL1956[8]; break;
                    }    
                    break;
                case 1957:
                    switch(retirementAge) {
                        case 62: sumOfTiers = sumOfTiers * EL1957[0]; break;
                        case 63: sumOfTiers = sumOfTiers * EL1957[1]; break;
                        case 64: sumOfTiers = sumOfTiers * EL1957[2]; break;
                        case 65: sumOfTiers = sumOfTiers * EL1957[3]; break;
                        case 66: sumOfTiers = sumOfTiers * EL1957[4]; break;
                        case 67: sumOfTiers = sumOfTiers * EL1957[5]; break;
                        case 68: sumOfTiers = sumOfTiers * EL1957[6]; break;
                        case 69: sumOfTiers = sumOfTiers * EL1957[7]; break;
                        case 70: sumOfTiers = sumOfTiers * EL1957[8]; break;
                    }
                    break;
                case 1958:
                    switch(retirementAge) {
                        case 62: sumOfTiers = sumOfTiers * EL1958[0]; break;
                        case 63: sumOfTiers = sumOfTiers * EL1958[1]; break;
                        case 64: sumOfTiers = sumOfTiers * EL1958[2]; break;
                        case 65: sumOfTiers = sumOfTiers * EL1958[3]; break;
                        case 66: sumOfTiers = sumOfTiers * EL1958[4]; break;
                        case 67: sumOfTiers = sumOfTiers * EL1958[5]; break;
                        case 68: sumOfTiers = sumOfTiers * EL1958[6]; break;
                        case 69: sumOfTiers = sumOfTiers * EL1958[7]; break;
                        case 70: sumOfTiers = sumOfTiers * EL1958[8]; break;
                    }
                    break;
                case 1959:
                    switch(retirementAge) {
                        case 62: sumOfTiers = sumOfTiers * EL1959[0]; break;
                        case 63: sumOfTiers = sumOfTiers * EL1959[1]; break;
                        case 64: sumOfTiers = sumOfTiers * EL1959[2]; break;
                        case 65: sumOfTiers = sumOfTiers * EL1959[3]; break;
                        case 66: sumOfTiers = sumOfTiers * EL1959[4]; break;
                        case 67: sumOfTiers = sumOfTiers * EL1959[5]; break;
                        case 68: sumOfTiers = sumOfTiers * EL1959[6]; break;
                        case 69: sumOfTiers = sumOfTiers * EL1959[7]; break;
                        case 70: sumOfTiers = sumOfTiers * EL1959[8]; break;
                    }     
                    break;
                default:
                    if(yearOfBirth <= 1954) {
                        switch(retirementAge) {
                            case 62: sumOfTiers = sumOfTiers * EL1943plus[0]; break;
                            case 63: sumOfTiers = sumOfTiers * EL1943plus[1]; break;
                            case 64: sumOfTiers = sumOfTiers * EL1943plus[2]; break;
                            case 65: sumOfTiers = sumOfTiers * EL1943plus[3]; break;
                            case 66: sumOfTiers = sumOfTiers * EL1943plus[4]; break;
                            case 67: sumOfTiers = sumOfTiers * EL1943plus[5]; break;
                            case 68: sumOfTiers = sumOfTiers * EL1943plus[6]; break;
                            case 69: sumOfTiers = sumOfTiers * EL1943plus[7]; break;
                            case 70: sumOfTiers = sumOfTiers * EL1943plus[8]; break;
                        }   
                    }  
                    else {
                        switch(retirementAge) {
                            case 62: sumOfTiers = sumOfTiers * EL1960plus[0]; break;
                            case 63: sumOfTiers = sumOfTiers * EL1960plus[1]; break;
                            case 64: sumOfTiers = sumOfTiers * EL1960plus[2]; break;
                            case 65: sumOfTiers = sumOfTiers * EL1960plus[3]; break;
                            case 66: sumOfTiers = sumOfTiers * EL1960plus[4]; break;
                            case 67: sumOfTiers = sumOfTiers * EL1960plus[5]; break;
                            case 68: sumOfTiers = sumOfTiers * EL1960plus[6]; break;
                            case 69: sumOfTiers = sumOfTiers * EL1960plus[7]; break;
                            case 70: sumOfTiers = sumOfTiers * EL1960plus[8]; break;
                        }   
                    }     
            }

            // console.log("=================");
            // console.log("After sumOfTiers " + sumOfTiers);
            ssBase = sumOfTiers * 12; 
            //console.log("SSBase " + ssBase);

            //person.pia = pia;
            person.ssBase.push(parseFloat(ssBase));
        } //end of calculateSSBase(person, retirementAge) 

        function spousalBenefit(client, spouse, retirementAge, i) {
            var spousalBenefit;
            var ssBaseClient = client.ssBase[i];
            var ssBaseSpouse = spouse.ssBase[i];
            var yearOfBirth = spouse.yearOfBirth;

            //GET SPOUSAL BENEFIT BASED ON YEAR OF RETIREMENT
            switch(yearOfBirth) {
                case 1955:
                    switch(retirementAge) {
                        case 62: spousalBenefit = ssBaseClient * spousalBenefits1955[0];
                        case 63: spousalBenefit = ssBaseClient * spousalBenefits1955[1];
                        case 64: spousalBenefit = ssBaseClient * spousalBenefits1955[2];
                        case 65: spousalBenefit = ssBaseClient * spousalBenefits1955[3];
                        case 66: spousalBenefit = ssBaseClient * spousalBenefits1955[4];
                        case 67: spousalBenefit = ssBaseClient * spousalBenefits1955[5];
                        case 68: spousalBenefit = ssBaseClient * spousalBenefits1955[6];
                        case 69: spousalBenefit = ssBaseClient * spousalBenefits1955[7];
                        default: spousalBenefit = ssBaseClient * spousalBenefits1955[8];
                    }
                    break;
                case 1956:
                    switch(retirementAge) {
                        case 62: spousalBenefit = ssBaseClient * spousalBenefits1956[0];
                        case 63: spousalBenefit = ssBaseClient * spousalBenefits1956[1];
                        case 64: spousalBenefit = ssBaseClient * spousalBenefits1956[2];
                        case 65: spousalBenefit = ssBaseClient * spousalBenefits1956[3];
                        case 66: spousalBenefit = ssBaseClient * spousalBenefits1956[4];
                        case 67: spousalBenefit = ssBaseClient * spousalBenefits1956[5];
                        case 68: spousalBenefit = ssBaseClient * spousalBenefits1956[6];
                        case 69: spousalBenefit = ssBaseClient * spousalBenefits1956[7];
                        default: spousalBenefit = ssBaseClient * spousalBenefits1956[8];
                    }
                    break;
                case 1957:
                    switch(retirementAge) {
                        case 62: spousalBenefit = ssBaseClient * spousalBenefits1957[0];
                        case 63: spousalBenefit = ssBaseClient * spousalBenefits1957[1];
                        case 64: spousalBenefit = ssBaseClient * spousalBenefits1957[2];
                        case 65: spousalBenefit = ssBaseClient * spousalBenefits1957[3];
                        case 66: spousalBenefit = ssBaseClient * spousalBenefits1957[4];
                        case 67: spousalBenefit = ssBaseClient * spousalBenefits1957[5];
                        case 68: spousalBenefit = ssBaseClient * spousalBenefits1957[6];
                        case 69: spousalBenefit = ssBaseClient * spousalBenefits1957[7];
                        default: spousalBenefit = ssBaseClient * spousalBenefits1957[8];
                    }
                    break;
                case 1958:
                    switch(retirementAge) {
                        case 62: spousalBenefit = ssBaseClient * spousalBenefits1958[0];
                        case 63: spousalBenefit = ssBaseClient * spousalBenefits1958[1];
                        case 64: spousalBenefit = ssBaseClient * spousalBenefits1958[2];
                        case 65: spousalBenefit = ssBaseClient * spousalBenefits1958[3];
                        case 66: spousalBenefit = ssBaseClient * spousalBenefits1958[4];
                        case 67: spousalBenefit = ssBaseClient * spousalBenefits1958[5];
                        case 68: spousalBenefit = ssBaseClient * spousalBenefits1958[6];
                        case 69: spousalBenefit = ssBaseClient * spousalBenefits1958[7];
                        default: spousalBenefit = ssBaseClient * spousalBenefits1958[8];
                    }
                    break;
                case 1959:
                    switch(retirementAge) {
                        case 62: spousalBenefit = ssBaseClient * spousalBenefits1959[0];
                        case 63: spousalBenefit = ssBaseClient * spousalBenefits1959[1];
                        case 64: spousalBenefit = ssBaseClient * spousalBenefits1959[2];
                        case 65: spousalBenefit = ssBaseClient * spousalBenefits1959[3];
                        case 66: spousalBenefit = ssBaseClient * spousalBenefits1959[4];
                        case 67: spousalBenefit = ssBaseClient * spousalBenefits1959[5];
                        case 68: spousalBenefit = ssBaseClient * spousalBenefits1959[6];
                        case 69: spousalBenefit = ssBaseClient * spousalBenefits1959[7];
                        default: spousalBenefit = ssBaseClient * spousalBenefits1959[8];
                    }
                    break;
                default:
                    if(yearOfBirth >= 1943 && yearOfBirth <= 1954) {
                        switch(retirementAge) {
                            case 62: spousalBenefit = ssBaseClient * spousalBenefits1943to1954[0];
                            case 63: spousalBenefit = ssBaseClient * spousalBenefits1943to1954[1];
                            case 64: spousalBenefit = ssBaseClient * spousalBenefits1943to1954[2];
                            case 65: spousalBenefit = ssBaseClient * spousalBenefits1943to1954[3];
                            case 66: spousalBenefit = ssBaseClient * spousalBenefits1943to1954[4];
                            case 67: spousalBenefit = ssBaseClient * spousalBenefits1943to1954[5];
                            case 68: spousalBenefit = ssBaseClient * spousalBenefits1943to1954[6];
                            case 69: spousalBenefit = ssBaseClient * spousalBenefits1943to1954[7];
                            default: spousalBenefit = ssBaseClient * spousalBenefits1943to1954[8];
                        }
                    }
                    else if(yearOfBirth >= 1960 && yearOfBirth <= 2000) {
                        switch(retirementAge) {
                            case 62: spousalBenefit = ssBaseClient * spousalBenefits1960to2000[0];
                            case 63: spousalBenefit = ssBaseClient * spousalBenefits1960to2000[1];
                            case 64: spousalBenefit = ssBaseClient * spousalBenefits1960to2000[2];
                            case 65: spousalBenefit = ssBaseClient * spousalBenefits1960to2000[3];
                            case 66: spousalBenefit = ssBaseClient * spousalBenefits1960to2000[4];
                            case 67: spousalBenefit = ssBaseClient * spousalBenefits1960to2000[5];
                            case 68: spousalBenefit = ssBaseClient * spousalBenefits1960to2000[6];
                            case 69: spousalBenefit = ssBaseClient * spousalBenefits1960to2000[7];
                            default: spousalBenefit = ssBaseClient * spousalBenefits1960to2000[8];
                        }
                    }
            }

            //SPOUSAL BENEFIT IS 50% OF CLIENT IF DEPENDENT < 18 AT TIME OF RETIREMENT
            if(parseInt(client.numOfDeps) > 0) {
                var retirementDiff = retirementAge - spouse.age;
                client.ageOfDeps.forEach(function(age, i) {
                    if(parseInt(age) + retirementDiff < 18) {
                        spousalBenefit = ssBaseClient * 0.50;
                    }
                });
            }

            if(spousalBenefit > ssBaseSpouse) {
                //ADJUST FOR GPO
                if(client.recievePension) {
                    var pension = parseFloat(client.pensionAmount) * 2/3; //per month
                    pension = pension * 12; //per year
                    spousalBenefit = spousalBenefit - pension; //adjusted for GPO
                }
                spouse.ssBase[i] = spousalBenefit;
            }
        } // end of spousalBenefit(client, spouse)

        function results(person) {
            var early = 62;
            var userSelected = person.retirementAge;
            var FRA = person.yearFRA; //age at FRA
            var late = 70;
            var retirementAges = [early, userSelected, FRA, late];            
            var yearOfBirth = person.yearOfBirth;
            var currentYear = person.currentYear;
            var retirementIncome = person.retirementIncome;
            
            for(var i = 0; i < 9; i++) {
                var retirementYear = 62 + yearOfBirth + i;
                var limitYear = retirementYear - currentYear; //Amount of years until retire
                var overLimit = retirementIncome - projEarningsLimit[limitYear];

                if(overLimit > 0 && 62+i < FRA) { //Over Limit and Before FRA
                    var reduction = overLimit / 2;
                    person.ssBaseAdj[i] = person.ssBase[i] - reduction;
                    if(person.ssBaseAdj[i] < 0) person.ssBaseAdj[i] = 0;
                }
                else if(overLimit > 0 && 62+i == FRA) { //Over Limit and At FRA
                    var reduction = overLimit / 3;
                    person.ssBaseAdj[i] = person.ssBase[i] - reduction;
                    if(person.ssBaseAdj[i] < 0) person.ssBaseAdj[i] = 0;
                }
                else person.ssBaseAdj[i] = person.ssBase[i]; //Below Limit or After FRA
            }

            for(var i = 0; i < 4; i++) {
                var age = retirementAges[i];
                var lifeExpectancy = person.lifeExpectancy;
                var numOfYears = lifeExpectancy - age; //Number of years from retirement age until death
                
                for(var j = 0; j < 9; j++) {
                    if(j == age-62) { 
                        if(i==0) { //EARLY
                            for(var k = 0; k <= numOfYears; k++) {
                                if(k==0) person.earlyBenefits[k] = person.ssBaseAdj[j]; 
                                else {
                                    person.earlyBenefits[k] = person.earlyBenefits[k-1] + (person.earlyBenefits[k-1] * person.cola / 100);
                                }
                            }
                        }
                        else if(i==1) { //USER SELECTED
                            for(var k = 0; k <= numOfYears; k++) {
                                if(k==0) person.userSelectedBenefits[k] = person.ssBaseAdj[j]; 
                                else {
                                    person.userSelectedBenefits[k] = person.userSelectedBenefits[k-1] + (person.userSelectedBenefits[k-1] * person.cola / 100);
                                }
                            }
                        }
                        else if(i==2) { //FRA
                            for(var k = 0; k <= numOfYears; k++) {
                                if(k==0) person.FRABenefits[k] = person.ssBaseAdj[j]; 
                                else {
                                    person.FRABenefits[k] = person.FRABenefits[k-1] + (person.FRABenefits[k-1] * person.cola / 100);
                                }
                            }
                        }
                        else if(i==3) { //LATE
                            for(var k = 0; k <= numOfYears; k++) {
                                if(k==0) person.lateBenefits[k] = person.ssBaseAdj[j]; 
                                else {
                                    person.lateBenefits[k] = person.lateBenefits[k-1] + (person.lateBenefits[k-1] * person.cola / 100);
                                }
                            }
                        }
                    }
                }
            }
        } //end results(person)

        var maritalStatus = this.userData.client.maritalStatus;
        this.userData.client.ssBase = [];

        var j = 0;
        for(var i = 62; i <= 70; i++) {
            calculateSSBase(this.userData.client, i, j);
            j++;
        }

        i = 0;
        //GET PIA COCLIENT CALCULATIONS IF NECESSARY
        if(maritalStatus == "Married" || this.userData.client.divorceCheck) {
           if(!this.userData.client.isRecieving || this.userData.client.divorceCheck) {
                this.userData.spouse.ssBase = [];
                var j = 0;
                for(var i = 62; i <= 70; i++) {
                    calculateSSBase(this.userData.spouse, i, j);
                    j++;
                }
           }
           else {
               var ssBase = this.userData.spouse.spouseRecievingBenfit * 12;
               this.userData.spouse.ssBase = [];
               for(var i = 0; i < 9; i++) {
                   this.userData.spouse.ssBase.push(parseFloat(ssBase));
               }
           }
        }

        if(maritalStatus == "Married" || this.userData.client.divorceCheck) {
           if(!this.userData.client.isRecieving && !this.userData.client.divorceCheck) { //If spouse not already recieving, compare and change both client's ssBase and spouse's if applicable
                var j = 0;
                for(var i = 62; i <= 70; i++) {
                    spousalBenefit(this.userData.client, this.userData.spouse, i, j);
                    spousalBenefit(this.userData.spouse, this.userData.client, i, j);
                    j++;
                }
            }
            else if(this.userData.client.isRecieving || this.userData.client.divorceCheck) { 
                //If spouse already recieving or the client was married to ex-spouse for more than 10 years,
                //only change client's ssBase to spouse's if applicable
                var j = 0;
                for(var i = 62; i <= 70; i++) {
                    spousalBenefit(this.userData.spouse, this.userData.client, i, j);
                    j++;
                }
            }
        }
        
        results(this.userData.client);
        if((maritalStatus == "Married" && !this.userData.client.isRecieving) || this.userData.client.divorceCheck) {
            results(this.userData.spouse);
        }

        console.log(this.userData);
        this.router.navigate('#/results');
    }

    wep() {
        this.userData.client.wep = !this.userData.client.wep;
    }

    wepSpouse() {
        this.userData.spouse.wep = !this.userData.spouse.wep;
    }

    back() {
        this.router.navigate('#/exceptions');
    }

    attached () {        
        $("#benefitslider").ionRangeSlider({
            grid: true,
            type: "single",
            min: 0,
            max: 10,
            from: 2.6,
            step: 0.1,
            postfix: "%",
            disable: true,
            onFinish: (data) => {
                this.userData.client.cola = data.from;
            }
        });

        $("#spousebenefitslider").ionRangeSlider({
            grid: true,
            type: "single",
            min: 0,
            max: 10,
            from: 2.6,
            step: 0.1,
            postfix: "%",
            disable: true,
            onFinish: (data) => {
                this.userData.spouse.cola = data.from;
            }
        });

        $('#wep').tooltip({
            content: "<b>Windfall Elimination Provision:</b> If you work for a: federal, state, or local government; nonprofit organizations; or work in another country," + 
            " you may qualify to be eligible for a pension based on earnings that are not covered by Social Security. This pension can affect your Social Security benefits."
        });

        $('#wepYears').tooltip({
            content: "If you've paid Social Security taxes on 30 or more years on substantial earnings, WEP does <i>not</i> affect your Social Security benefits."
        });

        $('#spousewep').tooltip({
            content: "<b>Windfall Elimination Provision:</b> If you work for a: federal, state, or local government; nonprofit organizations; or work in another country," + 
            " you may qualify to be eligible for a pension based on earnings that are not covered by Social Security. This pension can affect your Social Security benefits."
        });

        $('#spousewepYears').tooltip({
            content: "If you've paid Social Security taxes on 30 or more years on substantial earnings, WEP does <i>not</i> affect your Social Security benefits."
        });

        $('#cola').tooltip({
            content: "<b>Cost Of Living Adjustment:</b> COLA is used to ensure that the purchasing power of both Social Security and Supplemental Security Income (SSI) benefits is not eroded by inflation."
        });

        $('#spousecola').tooltip({
            content: "<b>Cost Of Living Adjustment:</b> COLA is used to ensure that the purchasing power of both Social Security and Supplemental Security Income (SSI) benefits is not eroded by inflation."
        });

   }
}