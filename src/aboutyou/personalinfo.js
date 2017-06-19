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

    dob(value) {
        var dob = value;
        var date = moment(dob, 'M/D/YYYY');
        var yearOfBirth = date.format('YYYY');
        var currentYear = moment().format('YYYY');
        
        if(!((dob.indexOf(date.format('MM/DD/YYYY')) >= 0) || (dob.indexOf(date.format('M/DD/YYYY')) >= 0)
            || (dob.indexOf(date.format('MM/D/YYYY')) >= 0) || (dob.indexOf(date.format('M/D/YYYY')) >= 0))
            || !date.isValid() || yearOfBirth > currentYear) {
                alert('Invalid Date of Birth');
                return;
            }
        else {
            this.userData.client.age = moment().diff(dob, 'years');
            this.userData.client.yearOfBirth = parseInt(yearOfBirth);
            this.userData.client.currentYear = parseInt(currentYear);
            this.userData.client.ageFrom18 = this.userData.client.age - 18;
        }
    }

    spousedob(value) {
        var dob = value;
        var date = moment(dob, 'M/D/YYYY');
        var yearOfBirth = date.format('YYYY');
        var currentYear = moment().format('YYYY');
        
        if(!((dob.indexOf(date.format('MM/DD/YYYY')) >= 0) || (dob.indexOf(date.format('M/DD/YYYY')) >= 0)
            || (dob.indexOf(date.format('MM/D/YYYY')) >= 0) || (dob.indexOf(date.format('M/D/YYYY')) >= 0))
            || !date.isValid() || yearOfBirth > currentYear) {
                alert('Invalid Date of Birth');
                return;
            }
        else {
            this.userData.spouse.age = moment().diff(dob, 'years');
            this.userData.spouse.yearOfBirth = parseInt(yearOfBirth);
            this.userData.spouse.currentYear = parseInt(currentYear);
            this.userData.spouse.ageFrom18 = this.userData.spouse.age - 18;
        }
    }

    checkMarried(value) {
        if(value == "Married") {
            this.userData.client.isMarried = true;
            this.userData.client.isDivorced = false;
        }
        else if(value == "Divorced") {
            this.userData.client.isDivorced = true;
            this.userData.client.isMarried = false;
        }
        else {
            this.userData.client.isMarried = false;
            this.userData.client.isDivorced = false;
        }
    }

    checkEmployment(value) {
        if(value == "Employed" || value == "Business Owner") {
            this.userData.client.isEmployed = true;
        }
        else this.userData.client.isEmployed = false;
    }

    checkEmploymentSpouse(value) {
        if(value == "Employed" || value == "Business Owner") {
            this.userData.spouse.isEmployed = true;
        }
        else this.userData.spouse.isEmployed = false;
    }

    checkNumOfDeps(value) {
        if(value > 0) this.userData.client.showAgeOfDeps = true;
        else this.userData.client.showAgeOfDeps = false;
    }

    calculate() {
        function calculatePIA(person) {
            //GET ALL USER DATA            
            var empStatus = person.employmentStatus;
            var sal = person.salary;
            var retirementAge = person.retirementAge;
            //NEW VARIABLES
            var pia, ageFrom18, yrsUntilRetire;

            //MAKE SURE EVERYTHING IS INPUTTED
            // if(!name || !gender || !dob || !empStatus ||
            //     empStatus == "Please Select" || !maritalStatus || 
            //     maritalStatus == "Please Select" || !numOfDependents) {
            //         alert("Fill in all information");
            //         console.log(name + " " + gender + " " + sal + " " + dob);
            //         return;
            // }

            //GET AGE OF PERSON
            ageFrom18 = person.ageFrom18;
            yrsUntilRetire = person.retirementAge - person.age;

            //COMPUTES PROJECTED SALARY 
            if(ageFrom18 >= 0) {
                person.projectedSal[ageFrom18-1] = parseInt(sal); //Current salary
                for(var i = ageFrom18 - 2; i >= 0; i--) { //Loop through each wage percentage backwards so we go from current salary
                    person.projectedSal[i] = person.projectedSal[i+1] - (person.projectedSal[i+1] * wagePerc[wagePerc.length-i-3]); //Calculate projected salary
                }
                for(var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) { //Loop through each wage percentage backwards so we go from current salary
                    person.projectedSal[i] = parseFloat(person.projectedSal[i-1]) + (parseFloat(person.projectedSal[i-1]) * wagePerc[wagePerc.length-1]); //Calculate projected salary
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

        var maritalStatus = this.userData.client.maritalStatus;
        //GET PIA CLIENT CALCULATIONS
        if(calculatePIA(this.userData.client) == null) {
            return;
        } 
        //GET PIA COCLIENT CALCULATIONS IF NECESSARY
        if(maritalStatus == "Married") {
            if(calculatePIA(this.userData.spouse) == null) {
                return;
            }
        }

        console.log(this.userData);
        //GO TO BENEFITS
        this.router.navigate('#/exceptions');
    }

    //NAVIGATE TO WAGE HISTORY
    wagehistory() {
        this.router.navigate('#/wagehistory');  
    }

    spousewagehistory() {
        this.router.navigate('#/spousewagehistory');
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

        //SALARY FOR SPOUSE
        $('#salarySpouse').hide();
        $("#empStatusSpouse").change(function() { 
            var val = $(this).val();
            if(val == "Employed" || val == "Business Owner") $('#salarySpouse').show();
            else $('#salarySpouse').hide();
        });
    }
}