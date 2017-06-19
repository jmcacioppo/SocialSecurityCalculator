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
        function calculatePIA(person, widowcheck) {
            //GET ALL USER DATA            
            var empStatus = person.employmentStatus;
            var sal = person.salary;
            var retirementAge = person.retirementAge;
            //NEW VARIABLES
            var pia, ageFrom18, yrsUntilRetire;

            //GET AGE OF PERSON
            ageFrom18 = person.ageFrom18;
            yrsUntilRetire = person.retirementAge - person.age;

            //COMPUTES PROJECTED SALARY 
            if(ageFrom18 >= 0) {
                person.projectedSal[ageFrom18-1] = parseInt(sal); //Current salary
                for(var i = ageFrom18 - 2; i >= 0; i--) { //Loop through each wage percentage backwards so we go from current salary
                    person.projectedSal[i] = person.projectedSal[i+1] - (person.projectedSal[i+1] * wagePerc[wagePerc.length-i-3]); //Calculate projected salary
                }

                if(!widowcheck) {
                    for(var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) { //Loop through each wage percentage backwards so we go from current salary
                        person.projectedSal[i] = parseFloat(person.projectedSal[i-1]) + (parseFloat(person.projectedSal[i-1]) * wagePerc[wagePerc.length-1]); //Calculate projected salary
                    }
                }
                else {
                    for(var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) { //Loop through each wage percentage backwards so we go from current salary
                        person.projectedSal[i] = 0;
                    }
                }

                //COMPUTES SALARY ADJUSTED FOR INFLATION
                for(var i = ageFrom18-1; i >= 0; i--) {
                    if(person.projectedSal[i] > allowedSalary[inflationIndex.length-(ageFrom18-i)-1]) { //Check allowed salary and calculate adjusted inflation accordingly
                        person.inflationAdjusted[i] = allowedSalary[inflationIndex.length-(ageFrom18-i)-1] * inflationIndex[inflationIndex.length-(ageFrom18-i)-1];
                    }
                    else {
                        person.inflationAdjusted[i] = person.projectedSal[i] * inflationIndex[inflationIndex.length-(ageFrom18-i)-1];
                    }
                }

                if(!widowcheck) {
                    var lastYearAllowed = allowedSalary[allowedSalary.length-1];
                    for(var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) {
                        if(person.projectedSal[i] > allowedSalary[i]) { //Check allowed salary and calculate adjusted inflation accordingly
                            person.inflationAdjusted[i] = lastYearAllowed * inflationIndex[inflationIndex.length-1];
                            lastYearAllowed = lastYearAllowed * 1.021;
                        }
                        else {
                            person.inflationAdjusted[i] = person.projectedSal[i] * inflationIndex[inflationIndex.length-1];
                        }
                    }
                }
                else {
                    for(var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) {    
                        person.inflationAdjusted[i] = 0;
                    }
                }

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
                        case 60: client.survivorpia = deceased.pia * survivorFRA1957[0];
                        case 60: client.survivorpia = deceased.pia * survivorFRA1957[0];
                        case 60: client.survivorpia = deceased.pia * survivorFRA1957[0];
                        case 60: client.survivorpia = deceased.pia * survivorFRA1957[0];
                        case 60: client.survivorpia = deceased.pia * survivorFRA1957[0];
                        case 60: client.survivorpia = deceased.pia * survivorFRA1957[0];
                        case 60: client.survivorpia = deceased.pia * survivorFRA1957[0];
                        case 60: client.survivorpia = deceased.pia * survivorFRA1957[0];
                        case 60: client.survivorpia = deceased.pia * survivorFRA1957[0];
                        case 60: client.survivorpia = deceased.pia * survivorFRA1957[0];
                    }
            }
        }

        var maritalStatus = this.userData.client.maritalStatus;
        var widowcheck = false;
        //GET PIA CLIENT CALCULATIONS
        if(calculatePIA(this.userData.client, widowcheck) == null) {
            return;
        } 
        //GET PIA COCLIENT CALCULATIONS IF NECESSARY
        if(maritalStatus == "Married") {
            if(calculatePIA(this.userData.spouse, widowcheck) == null) {
                return;
            }
        }
        else if(maritalStatus = "Widowed") {
            widowcheck = true;
            if(calculatePIA(this.userData.deceased, widowcheck) == null) {
                return;
            }
            adjustSurvivorPIA(this.userData.client, this.userData.deceased);
        }

        if(this.userData.client.pia < this.userData.client.survivorpia) {
            this.userData.client.pia = this.userData.client.survivorpia;
        }

        console.log(this.userData);
        //GO TO BENEFITS
        this.router.navigate('#/benefits');
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

    checkCanadaItaly(value) {
        if(value == false) alert("You are not eligible for Social Security");
    }

    checkConditions(value) {
        if(value == true) alert("You are not eligible for Social Security");
    }

    attached() {

    }
    
}