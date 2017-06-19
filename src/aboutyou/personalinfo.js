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
    }

    next() {
        //MAKE SURE EVERYTHING IS INPUTTED
        // if(!name || !gender || !dob || !empStatus ||
        //     empStatus == "Please Select" || !maritalStatus || 
        //     maritalStatus == "Please Select" || !numOfDependents) {
        //         alert("Fill in all information");
        //         console.log(name + " " + gender + " " + sal + " " + dob);
        //         return;
        // }
        
        //GO TO EXCEPTIONS PAGE
        this.router.navigate('#/exceptions');
    }
}