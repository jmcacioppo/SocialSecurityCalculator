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
    EL1958, EL1959, EL1960plus, survivorFRA1945to1956, survivorFRA1957,
    survivorFRA1958, survivorFRA1959, survivorFRA1960, survivorFRA1961,
    survivorFRA1962to2000} from 'src/services/constants.js';

@inject(UserData, Router)
export class exceptions {
    constructor(userData, router)
    {
        this.router = router;
        this.userData = userData;
    }

    calculate() {
        function militarySalary(person, sal) {
            if(person.beginYear >= 1940 && person.endYear <= 1967) {

            }
            else if(person.beginYear >= 1967 && person.endYear <= 2001) {

            }
        }

        function railroadSalary(person) {
            var start = person.yearsStartedOnRailroad; //Year started on railroad
            var end = person.yearsEndedOnRailroad; //Year ended on railroad
            var difference = end - start; //Difference between ended and started
            var yearsSinceStarted = person.currentYear - start; //Years since they started working
            var yearsSinceEnded = person.currentYear - end; //Years since they stopped working

            if(difference >= 10 || (difference >= 5 && start >= 1995)) {
                //IF WORKED ON A RAILROAD FOR THIS LONG, TAKE AWAY THOSE INCOMES
                for(var i = person.ageFrom18-yearsSinceStarted; i <= person.ageFrom18-yearsSinceEnded; i++) {
                    person.inflationAdjusted[i] = 0;
                }
            }
        }
        
        function calculatePIA(person, widowcheck, railroadCheck) {
            //GET ALL USER DATA            
            var sal = parseInt(person.salary);
            var retirementAge = person.retirementAge;
            //NEW VARIABLES
            var pia, ageFrom18, yrsUntilRetire;

            //GET AGE OF PERSON
            ageFrom18 = person.ageFrom18;
            yrsUntilRetire = person.retirementAge - person.age;

            //INCLUDE EXCEPTIONS
            // if(person.militaryService) {
            //     militarySalary(person, sal);
            // }

            sal = parseInt(person.salary);

            //COMPUTES PROJECTED SALARY 
            if(ageFrom18 >= 0) {
                person.projectedSal[ageFrom18] = sal; //Current salary
                var count = 0;

                if(!person.showWages) {
                    for(var i = ageFrom18 - 1; i >= 0; i--) { //Loop through each wage percentage backwards so we go from current salary
                        person.projectedSal[i] = person.projectedSal[i+1] - (person.projectedSal[i+1] * wagePerc[wagePerc.length-count-2]); //Calculate projected salary
                        count++;
                    }
                }
                else {
                    for(var i = ageFrom18 - 1; i >= 0; i--) { //Loop through each wage percentage backwards so we go from current salary
                        person.projectedSal[i] = parseFloat(person.wages[i]);
                    }
                }

                if(!widowcheck) {
                    if(!person.futureWages) {
                        for(var i = ageFrom18 + 1; i <= ageFrom18 + yrsUntilRetire; i++) { //Loop through each wage percentage backwards so we go from current salary
                            person.projectedSal[i] = parseFloat(person.projectedSal[i-1]) + (parseFloat(person.projectedSal[i-1]) * wagePerc[wagePerc.length-1]); //Calculate projected salary
                        }
                    }
                    else {
                        for(var i = ageFrom18 + 1; i <= ageFrom18 + yrsUntilRetire; i++) { //Loop through each wage percentage backwards so we go from current salary
                            person.projectedSal[i] = parseFloat(person.wages[i]); //Calculate projected salary
                        }
                    }
                }
                else {
                    for(var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) { //Loop through each wage percentage backwards so we go from current salary
                        person.projectedSal[i] = 0;
                    }
                }

                count = 0;
                //COMPUTES SALARY ADJUSTED FOR INFLATION
                for(var i = ageFrom18-1; i >= 0; i--) {
                    if(person.projectedSal[i] > allowedSalary[allowedSalary.length-count-2]) { //Check allowed salary and calculate adjusted inflation accordingly
                        person.inflationAdjusted[i] = allowedSalary[allowedSalary.length-count-2] * inflationIndex[inflationIndex.length-count-2];
                    }
                    else {
                        person.inflationAdjusted[i] = person.projectedSal[i] * inflationIndex[inflationIndex.length-count-2];
                    }
                    count++;
                }

                if(!widowcheck) {
                    var lastYearAllowed = allowedSalary[allowedSalary.length-1];
                    for(var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) {
                        if(person.projectedSal[i] > lastYearAllowed) { //Check allowed salary and calculate adjusted inflation accordingly
                            person.inflationAdjusted[i] = lastYearAllowed * inflationIndex[inflationIndex.length-1];
                        }
                        else {
                            person.inflationAdjusted[i] = person.projectedSal[i] * inflationIndex[inflationIndex.length-1];
                        }
                        lastYearAllowed = lastYearAllowed * 1.021;
                    }
                }
                else {
                    for(var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) {    
                        person.inflationAdjusted[i] = 0;
                    }
                }
                
                if(railroadCheck) railroadSalary(person);

                //SORT AND GET TOP 35 ADJUSTED INFLATION SALARIES
                person.inflationAdjusted = person.inflationAdjusted.sort((a, b) => a - b); 
                person.topThirtyFive = person.inflationAdjusted.slice(person.inflationAdjusted.length - 35, person.inflationAdjusted.length); 

                //PRIMARY INSURANCE AMOUNT
                pia = person.topThirtyFive.reduce((a, b) => a + b, 0) / 420;
                person.pia = pia; 

                return pia;
            }
            else {
                alert("Client must be older than 18.");
                return null;
            }
        }

        function adjustSurvivorPIA(client, deceased) {
            switch(client.yearOfBirth) {
                case 1957: 
                    switch(client.retirementAge) {
                        case 60: client.survivorpia = deceased.pia * survivorFRA1957[0];
                        case 61: client.survivorpia = deceased.pia * survivorFRA1957[1];
                        case 62: client.survivorpia = deceased.pia * survivorFRA1957[2];
                        case 63: client.survivorpia = deceased.pia * survivorFRA1957[3];
                        case 64: client.survivorpia = deceased.pia * survivorFRA1957[4];
                        case 65: client.survivorpia = deceased.pia * survivorFRA1957[5];
                        case 66: client.survivorpia = deceased.pia * survivorFRA1957[6];
                        case 67: client.survivorpia = deceased.pia * survivorFRA1957[7];
                        case 68: client.survivorpia = deceased.pia * survivorFRA1957[8];
                        case 69: client.survivorpia = deceased.pia * survivorFRA1957[9];
                        default: client.survivorpia = deceased.pia * survivorFRA1957[10];
                    }
                case 1958: 
                    switch(client.retirementAge) {
                        case 60: client.survivorpia = deceased.pia * survivorFRA1958[0];
                        case 61: client.survivorpia = deceased.pia * survivorFRA1958[1];
                        case 62: client.survivorpia = deceased.pia * survivorFRA1958[2];
                        case 63: client.survivorpia = deceased.pia * survivorFRA1958[3];
                        case 64: client.survivorpia = deceased.pia * survivorFRA1958[4];
                        case 65: client.survivorpia = deceased.pia * survivorFRA1958[5];
                        case 66: client.survivorpia = deceased.pia * survivorFRA1958[6];
                        case 67: client.survivorpia = deceased.pia * survivorFRA1958[7];
                        case 68: client.survivorpia = deceased.pia * survivorFRA1958[8];
                        case 69: client.survivorpia = deceased.pia * survivorFRA1958[9];
                        default: client.survivorpia = deceased.pia * survivorFRA1958[10];
                    }
                case 1959: 
                    switch(client.retirementAge) {
                        case 60: client.survivorpia = deceased.pia * survivorFRA1959[0];
                        case 61: client.survivorpia = deceased.pia * survivorFRA1959[1];
                        case 62: client.survivorpia = deceased.pia * survivorFRA1959[2];
                        case 63: client.survivorpia = deceased.pia * survivorFRA1959[3];
                        case 64: client.survivorpia = deceased.pia * survivorFRA1959[4];
                        case 65: client.survivorpia = deceased.pia * survivorFRA1959[5];
                        case 66: client.survivorpia = deceased.pia * survivorFRA1959[6];
                        case 67: client.survivorpia = deceased.pia * survivorFRA1959[7];
                        case 68: client.survivorpia = deceased.pia * survivorFRA1959[8];
                        case 69: client.survivorpia = deceased.pia * survivorFRA1959[9];
                        default: client.survivorpia = deceased.pia * survivorFRA1959[10];
                    }   
                case 1960: 
                    switch(client.retirementAge) {
                        case 60: client.survivorpia = deceased.pia * survivorFRA1960[0];
                        case 61: client.survivorpia = deceased.pia * survivorFRA1960[1];
                        case 62: client.survivorpia = deceased.pia * survivorFRA1960[2];
                        case 63: client.survivorpia = deceased.pia * survivorFRA1960[3];
                        case 64: client.survivorpia = deceased.pia * survivorFRA1960[4];
                        case 65: client.survivorpia = deceased.pia * survivorFRA1960[5];
                        case 66: client.survivorpia = deceased.pia * survivorFRA1960[6];
                        case 67: client.survivorpia = deceased.pia * survivorFRA1960[7];
                        case 68: client.survivorpia = deceased.pia * survivorFRA1960[8];
                        case 69: client.survivorpia = deceased.pia * survivorFRA1960[9];
                        default: client.survivorpia = deceased.pia * survivorFRA1960[10];
                    }     
                case 1961: 
                    switch(client.retirementAge) {
                        case 60: client.survivorpia = deceased.pia * survivorFRA1961[0];
                        case 61: client.survivorpia = deceased.pia * survivorFRA1961[1];
                        case 62: client.survivorpia = deceased.pia * survivorFRA1961[2];
                        case 63: client.survivorpia = deceased.pia * survivorFRA1961[3];
                        case 64: client.survivorpia = deceased.pia * survivorFRA1961[4];
                        case 65: client.survivorpia = deceased.pia * survivorFRA1961[5];
                        case 66: client.survivorpia = deceased.pia * survivorFRA1961[6];
                        case 67: client.survivorpia = deceased.pia * survivorFRA1961[7];
                        case 68: client.survivorpia = deceased.pia * survivorFRA1961[8];
                        case 69: client.survivorpia = deceased.pia * survivorFRA1961[9];
                        default: client.survivorpia = deceased.pia * survivorFRA1961[10];
                    } 
                default:
                    if(client.yearOfBirth <= 1956) {
                        switch(client.retirementAge) {
                            case 60: client.survivorpia = deceased.pia * survivorFRA1945to1956[0];
                            case 61: client.survivorpia = deceased.pia * survivorFRA1945to1956[1];
                            case 62: client.survivorpia = deceased.pia * survivorFRA1945to1956[2];
                            case 63: client.survivorpia = deceased.pia * survivorFRA1945to1956[3];
                            case 64: client.survivorpia = deceased.pia * survivorFRA1945to1956[4];
                            case 65: client.survivorpia = deceased.pia * survivorFRA1945to1956[5];
                            case 66: client.survivorpia = deceased.pia * survivorFRA1945to1956[6];
                            case 67: client.survivorpia = deceased.pia * survivorFRA1945to1956[7];
                            case 68: client.survivorpia = deceased.pia * survivorFRA1945to1956[8];
                            case 69: client.survivorpia = deceased.pia * survivorFRA1945to1956[9];
                            default: client.survivorpia = deceased.pia * survivorFRA1945to1956[10];
                        } 
                    }
                    else {
                        switch(client.retirementAge) {
                            case 60: client.survivorpia = deceased.pia * survivorFRA1962to2000[0];
                            case 61: client.survivorpia = deceased.pia * survivorFRA1962to2000[1];
                            case 62: client.survivorpia = deceased.pia * survivorFRA1962to2000[2];
                            case 63: client.survivorpia = deceased.pia * survivorFRA1962to2000[3];
                            case 64: client.survivorpia = deceased.pia * survivorFRA1962to2000[4];
                            case 65: client.survivorpia = deceased.pia * survivorFRA1962to2000[5];
                            case 66: client.survivorpia = deceased.pia * survivorFRA1962to2000[6];
                            case 67: client.survivorpia = deceased.pia * survivorFRA1962to2000[7];
                            case 68: client.survivorpia = deceased.pia * survivorFRA1962to2000[8];
                            case 69: client.survivorpia = deceased.pia * survivorFRA1962to2000[9];
                            default: client.survivorpia = deceased.pia * survivorFRA1962to2000[10];
                        } 
                    }
            }
        }

        var maritalStatus = this.userData.client.maritalStatus;
        var widowcheck = false;
        var railroadCheck = this.userData.client.workedOnARailroad;
        //GET PIA CLIENT CALCULATIONS
        calculatePIA(this.userData.client, widowcheck, railroadCheck);
            
        //GET PIA COCLIENT CALCULATIONS IF NECESSARY
        if(maritalStatus == "Married") {
            railroadCheck = this.userData.spouse.workedOnARailroad;
            calculatePIA(this.userData.spouse, widowcheck, railroadCheck);
        }
        else if(maritalStatus = "Widowed") {
            widowcheck = true;
            calculatePIA(this.userData.deceased, widowcheck);
            adjustSurvivorPIA(this.userData.client, this.userData.deceased);
        }

        if(this.userData.client.pia < this.userData.client.survivorpia) {
            this.userData.client.pia = this.userData.client.survivorpia;
        }

        console.log(this.userData);
        //GO TO BENEFITS
        this.router.navigate('#/benefits');
    }

    //CHECK EXCEPTIONS
    beganService(date) {
        var beganService = moment(date, 'M/D/YYYY');
        var currentYear = moment().format('YYYY');
        var beginYear = beganService.format('YYYY');
        
        if(!((date.indexOf(beganService.format('MM/DD/YYYY')) >= 0) || (date.indexOf(beganService.format('M/DD/YYYY')) >= 0)
            || (date.indexOf(beganService.format('MM/D/YYYY')) >= 0) || (date.indexOf(beganService.format('M/D/YYYY')) >= 0))
            || !beganService.isValid() || beginYear > currentYear) {
                alert('Invalid Year');
                return;
            }
        else {
            this.userData.client.beginYear = beginYear;
            this.userData.client.beginMonth = beganService.month();
        }
    }

    endService(date) {
        var endService = moment(date, 'M/D/YYYY');
        var currentYear = moment().format('YYYY');
        var endYear = endService.format('YYYY');
        
        if(!((date.indexOf(endService.format('MM/DD/YYYY')) >= 0) || (date.indexOf(endService.format('M/DD/YYYY')) >= 0)
            || (date.indexOf(endService.format('MM/D/YYYY')) >= 0) || (date.indexOf(endService.format('M/D/YYYY')) >= 0))
            || !endService.isValid() || endYear > currentYear) {
                alert('Invalid Year');
                return;
            }
        else {
            this.userData.client.endYear = endYear;
            this.userData.client.endMonth = endService.month();
        }
    }

    beganServiceSpouse(date) {
        var beganService = moment(date, 'M/D/YYYY');
        var currentYear = moment().format('YYYY');
        var beginYear = beganService.format('YYYY');
        
        if(!((date.indexOf(beganService.format('MM/DD/YYYY')) >= 0) || (date.indexOf(beganService.format('M/DD/YYYY')) >= 0)
            || (date.indexOf(beganService.format('MM/D/YYYY')) >= 0) || (date.indexOf(beganService.format('M/D/YYYY')) >= 0))
            || !beganService.isValid() || beginYear > currentYear) {
                alert('Invalid Year');
                return;
            }
        else {
            this.userData.spouse.beginYear = beginYear;
            this.userData.spouse.beginMonth = beganService.month();
        }
    }

    endServiceSpouse(date) {
        var endService = moment(date, 'M/D/YYYY');
        var currentYear = moment().format('YYYY');
        var endYear = endService.format('YYYY');
        
        if(!((date.indexOf(endService.format('MM/DD/YYYY')) >= 0) || (date.indexOf(endService.format('M/DD/YYYY')) >= 0)
            || (date.indexOf(endService.format('MM/D/YYYY')) >= 0) || (date.indexOf(endService.format('M/D/YYYY')) >= 0))
            || !endService.isValid() || endYear > currentYear) {
                alert('Invalid Year');
                return;
            }
        else {
            this.userData.spouse.endYear = endYear;
            this.userData.spouse.endMonth = endService.month();
        }
    }

    checkCitizenship(value) {
        if(value == "Dual Citizen") {
            this.userData.client.dual26Countries = true;
            this.userData.client.notCitizen = false;
        }
        else if(value == "Not a US Citizen") {
            this.userData.client.notCitizen = true;
            this.userData.client.dual26Countries = false;
        }
        else {
            this.userData.client.dual26Countries = false;
            this.userData.client.notCitizen = false;
        }
    }

    checkCitizenshipSpouse(value) {
        if(value == "Dual Citizen") {
            this.userData.spouse.dual26Countries = true;
            this.userData.spouse.notCitizen = false;
        }
        else if(value == "Not a US Citizen") {
            this.userData.spouse.notCitizen = true;
            this.userData.spouse.dual26Countries = false;
        }
        else {
            this.userData.spouse.dual26Countries = false;
            this.userData.spouse.notCitizen = false;
        }
    }

    //CLIENT TOGGLES
    toggleMilitary() {
         var check = $('#military').prop("checked");
         this.userData.client.militaryService = check;
    }

    toggleRailroad() {
        var check = $('#railroad').prop("checked");
        this.userData.client.workedOnARailroad = check;
    }

    toggleGPO() {
        var check = $('#gpo').prop("checked");
        this.userData.client.recievePension = check;
    }
    
    toggle26Countries() {
        var check = $('#26countries').prop("checked");
        this.userData.client.isDual26Countries = check;
    }

    toggleCanadaItaly() {
        var check = $('#canadaItaly').prop("checked");
        this.userData.client.dualCanadaItaly = check;
        if(check == false) alert("You are not eligible for Social Security");
    }

    toggleInstrumentality() {
        var check = $('#instrumentality').prop("checked");
        this.userData.client.checkInstrumentality = check;
    }

    toggleConditions() {
        var check = $('#conditions').prop("checked");
        this.userData.client.checkConditions = check;
        if(check == true) alert("You are not eligible for Social Security");
    }


    //SPOUSE TOGGLES
    toggleMilitarySpouse() {
         var check = $('#militarySpouse').prop("checked");
         this.userData.spouse.militaryService = check;
    }

    toggleRailroadSpouse() {
        var check = $('#railroadSpouse').prop("checked");
        this.userData.spouse.workedOnARailroad = check;
    }

    toggleGPOSpouse() {
        var check = $('#gpoSpouse').prop("checked");
        this.userData.spouse.recievePension = check;
    }
    
    toggle26CountriesSpouse() {
        var check = $('#26countriesSpouse').prop("checked");
        this.userData.spouse.isDual26Countries = check;
    }

    toggleCanadaItalySpouse() {
        var check = $('#canadaItalySpouse').prop("checked");
        this.userData.spouse.dualCanadaItaly = check;
        if(check == false) alert("You are not eligible for Social Security");
    }

    toggleInstrumentalitySpouse() {
        var check = $('#instrumentalitySpouse').prop("checked");
        this.userData.spouse.checkInstrumentality = check;
    }

    toggleConditionsSpouse() {
        var check = $('#conditionsSpouse').prop("checked");
        this.userData.spouse.checkConditions = check;
        if(check == true) alert("You are not eligible for Social Security");
    }

    //Attach bootstrap toggles
    attached() {
        $('#military').bootstrapToggle();
        $('#railroad').bootstrapToggle();
        $('#gpo').bootstrapToggle();
        $('#26countries').bootstrapToggle();
        $('#canadaItaly').bootstrapToggle();
        $('#instrumentality').bootstrapToggle();
        $('#conditions').bootstrapToggle();

        $('#militarySpouse').bootstrapToggle();
        $('#railroadSpouse').bootstrapToggle();
        $('#gpoSpouse').bootstrapToggle();
        $('#26countriesSpouse').bootstrapToggle();
        $('#canadaItalySpouse').bootstrapToggle();
        $('#instrumentalitySpouse').bootstrapToggle();
        $('#conditionsSpouse').bootstrapToggle();
    }

    back() {
        this.router.navigate('#/personalinfo');
    }
}