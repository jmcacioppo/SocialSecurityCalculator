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

    //========================DATE OF BIRTHS==============================
    dob(value) {
        var dob = value;
        var date = moment(dob, 'M/D/YYYY');
        var yearOfBirth = date.format('YYYY');
        var monthOfBirth = date.month();
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
            this.userData.client.monthOfBirth = parseInt(monthOfBirth);
            this.userData.client.currentYear = parseInt(currentYear);
            this.userData.client.ageFrom18 = this.userData.client.age - 18;
            this.userData.client.retirementyear = this.userData.client.retirementAge + this.userData.client.yearOfBirth;

            if(yearOfBirth >= 1900 && yearOfBirth <= 1937) { //SET FRA
                this.userData.client.yearFRA = 65; 
                this.userData.client.monthFRA = 0;
            }
            else if(yearOfBirth == 1938) {
                this.userData.client.yearFRA = 65; 
                this.userData.client.monthFRA = 2;
            }
            else if(yearOfBirth == 1939) {
                this.userData.client.yearFRA = 65; 
                this.userData.client.monthFRA = 4;
            }
            else if(yearOfBirth == 1940) {
                this.userData.client.yearFRA = 65; 
                this.userData.client.monthFRA = 6;
            }
            else if(yearOfBirth == 1941) { 
                this.userData.client.yearFRA = 65; 
                this.userData.client.monthFRA = 8;
            }
            else if(yearOfBirth == 1942) {
                this.userData.client.yearFRA = 65; 
                this.userData.client.monthFRA = 10;
            }
            else if(yearOfBirth >= 1943 && yearOfBirth <= 1954) {
                this.userData.client.yearFRA = 66; 
                this.userData.client.monthFRA = 0;
            }
            else if(yearOfBirth == 1955) {
                this.userData.client.yearFRA = 66; 
                this.userData.client.monthFRA = 2;
            }
            else if(yearOfBirth == 1956) {
                this.userData.client.yearFRA = 66; 
                this.userData.client.monthFRA = 4;
            }
            else if(yearOfBirth == 1957) {
                this.userData.client.yearFRA = 66; 
                this.userData.client.monthFRA = 6;
            }
            else if(yearOfBirth == 1958) {
                this.userData.client.yearFRA = 66; 
                this.userData.client.monthFRA = 8;
            }
            else if(yearOfBirth == 1959) {
                this.userData.client.yearFRA = 66; 
                this.userData.client.monthFRA = 10;
            }
            else {
                this.userData.client.yearFRA = 67; 
                this.userData.client.monthFRA = 0;
            }

            if(this.userData.client.isSurvivor) { //SET FRA FOR SURVIVOR CLIENT
                if(this.userData.client.yearOfBirth >= 1945 && this.userData.client.yearOfBirth <= 1956) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 0;
                }
                else if(this.userData.client.yearOfBirth == 1957) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 2;
                }
                else if(this.userData.client.yearOfBirth == 1958) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 4;
                }
                else if(this.userData.client.yearOfBirth == 1959) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 6;
                }
                else if(this.userData.client.yearOfBirth == 1960) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 8;
                }
                else if(this.userData.client.yearOfBirth == 1961) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 10;
                }
                else if(this.userData.client.yearOfBirth >= 1962 && this.userData.client.yearOfBirth <= 2000) {
                    this.userData.client.yearFRA = 67;
                    this.userData.client.monthFRA = 0;
                }
            }
        }
    }

    spousedob(value) {
        var dob = value;
        var date = moment(dob, 'M/D/YYYY');
        var yearOfBirth = date.format('YYYY');
        var monthOfBirth = date.month();
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
            this.userData.spouse.monthOfBirth = parseInt(monthOfBirth);
            this.userData.spouse.currentYear = parseInt(currentYear);
            this.userData.spouse.ageFrom18 = this.userData.spouse.age - 18;
            this.userData.spouse.retirementyear = this.userData.spouse.retirementAge + this.userData.spouse.yearOfBirth;

            if(yearOfBirth >= 1900 && yearOfBirth <= 1937) {
                this.userData.spouse.yearFRA = 65; 
                this.userData.spouse.monthFRA = 0;
            }
            else if(yearOfBirth == 1938) {
                this.userData.spouse.yearFRA = 65; 
                this.userData.spouse.monthFRA = 2;
            }
            else if(yearOfBirth == 1939) {
                this.userData.spouse.yearFRA = 65; 
                this.userData.spouse.monthFRA = 4;
            }
            else if(yearOfBirth == 1940) {
                this.userData.spouse.yearFRA = 65; 
                this.userData.spouse.monthFRA = 6;
            }
            else if(yearOfBirth == 1941) { 
                this.userData.spouse.yearFRA = 65; 
                this.userData.spouse.monthFRA = 8;
            }
            else if(yearOfBirth == 1942) {
                this.userData.spouse.yearFRA = 65; 
                this.userData.spouse.monthFRA = 10;
            }
            else if(yearOfBirth >= 1943 && yearOfBirth <= 1954) {
                this.userData.spouse.yearFRA = 66; 
                this.userData.spouse.monthFRA = 0;
            }
            else if(yearOfBirth == 1955) {
                this.userData.spouse.yearFRA = 66; 
                this.userData.spouse.monthFRA = 2;
            }
            else if(yearOfBirth == 1956) {
                this.userData.spouse.yearFRA = 66; 
                this.userData.spouse.monthFRA = 4;
            }
            else if(yearOfBirth == 1957) {
                this.userData.spouse.yearFRA = 66; 
                this.userData.spouse.monthFRA = 6;
            }
            else if(yearOfBirth == 1958) {
                this.userData.spouse.yearFRA = 66; 
                this.userData.spouse.monthFRA = 8;
            }
            else if(yearOfBirth == 1959) {
                this.userData.spouse.yearFRA = 66; 
                this.userData.spouse.monthFRA = 10;
            }
            else {
                this.userData.spouse.yearFRA = 67; 
                this.userData.spouse.monthFRA = 0;
            }
        }
    }

    deceaseddob(value) {
        var dob = value;
        var date = moment(dob, 'M/D/YYYY');
        var yearOfBirth = date.format('YYYY');
        var monthOfBirth = date.month();
        var currentYear = moment().format('YYYY');
        var yearOfPassing = parseInt(this.userData.deceased.yearOfPassing);
        var yearFrom18toPassing = yearOfPassing - yearOfBirth - 18 + 1;
        
        if(!((dob.indexOf(date.format('MM/DD/YYYY')) >= 0) || (dob.indexOf(date.format('M/DD/YYYY')) >= 0)
            || (dob.indexOf(date.format('MM/D/YYYY')) >= 0) || (dob.indexOf(date.format('M/D/YYYY')) >= 0))
            || !date.isValid() || yearOfBirth > currentYear
            || this.userData.deceased.yearOfPassing < yearOfBirth
            || this.userData.deceased.yearOfPassing - yearOfBirth < 18) {
                alert('Invalid Date of Birth');
                return;
            }
        else {
            this.userData.deceased.age = this.userData.deceased.yearOfPassing - parseInt(yearOfBirth);
            this.userData.deceased.yearOfBirth = parseInt(yearOfBirth);
            this.userData.deceased.monthOfBirth = parseInt(monthOfBirth);
            this.userData.deceased.ageFrom18 = this.userData.deceased.age - 18;
            this.userData.deceased.yearFrom18toPassing = yearFrom18toPassing;
        }
    }

    checkPassingYear(value) {
        var currentYear = moment().format('YYYY');
        if(value > currentYear || value < 1900) {
            alert('Enter a valid Year of Passing');
            this.userData.deceased.isPassed = false;
        }
        else this.userData.deceased.isPassed = true;
    }

    //======================CHECK MARRIAGE AND EMPLOYMENT=================
    checkMarried(value) {
        if(value == "Married") {
            this.userData.client.isMarried = true;
            this.userData.client.spouseRecieving = true;
            this.userData.client.isDivorced = false;
            this.userData.client.isSurvivor = false;
            this.userData.client.divorceCheck = false;
        }
        else if(value == "Divorced") {
            this.userData.client.isDivorced = true;
            this.userData.client.isMarried = false;
            this.userData.client.isSurvivor = false;
            this.userData.client.spouseRecieving = false;
        }
        else if(value == "Widowed") {
            this.userData.client.isSurvivor = true;
            this.userData.client.isMarried = false;
            this.userData.client.isDivorced = false;
            this.userData.client.divorceCheck = false;
            this.userData.client.spouseRecieving = false;

            if(this.userData.client.dateOfBirth) { //NEW FRA FOR SURVIVOR CLIENT
                if(this.userData.client.yearOfBirth >= 1945 && this.userData.client.yearOfBirth <= 1956) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 0;
                }
                else if(this.userData.client.yearOfBirth == 1957) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 2;
                }
                else if(this.userData.client.yearOfBirth == 1958) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 4;
                }
                else if(this.userData.client.yearOfBirth == 1959) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 6;
                }
                else if(this.userData.client.yearOfBirth == 1960) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 8;
                }
                else if(this.userData.client.yearOfBirth == 1961) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 10;
                }
                else if(this.userData.client.yearOfBirth >= 1962 && this.userData.client.yearOfBirth <= 2000) {
                    this.userData.client.yearFRA = 67;
                    this.userData.client.monthFRA = 0;
                }
            }
        }
        else {
            this.userData.client.isMarried = false;
            this.userData.client.isDivorced = false;
            this.userData.client.isSurvivor = false;
            this.userData.client.divorceCheck = false;
            this.userData.client.spouseRecieving = false;
        }
    }

    checkEmployment(value) {
        if(value == "Employed" || value == "Business Owner") {
            this.userData.client.isEmployed = true;
            this.userData.client.isRetired = false;
            this.userData.client.notCurrentlyEmployed = false; 
        }
        else if(value == "Retired") {
            this.userData.client.isRetired = true;
            this.userData.client.isEmployed = false;
            this.userData.client.notCurrentlyEmployed = false; 
        }
        else if(value == "Not Currently Employed") {
            this.userData.client.notCurrentlyEmployed = true;
            this.userData.client.isEmployed = false;
            this.userData.client.isRetired = false;
        }
        else {
            this.userData.client.isEmployed = false;
            this.userData.client.isRetired = false;
        }
    }

    checkEmploymentSpouse(value) {
        if(value == "Employed" || value == "Business Owner") {
            this.userData.spouse.isEmployed = true;
            this.userData.spouse.isRetired = false;
            this.userData.spouse.notCurrentlyEmployed = false; 
        }
        else if(value == "Retired") {
            this.userData.spouse.isRetired = true;
            this.userData.spouse.isEmployed = false;
            this.userData.spouse.notCurrentlyEmployed = false; 
        }
        else if(value == "Not Currently Employed") {
            this.userData.spouse.notCurrentlyEmployed = true;
            this.userData.spouse.isEmployed = false;
            this.userData.spouse.isRetired = false;
        }
        else {
            this.userData.spouse.isEmployed = false;
            this.userData.spouse.isRetired = false;
        }
    }

    //============================DEPENDENTS=============================
    checkNumOfDeps(value) {
        if(value > 0) this.userData.client.showAgeOfDeps = true;
        else this.userData.client.showAgeOfDeps = false;
        console.log(value);
        this.userData.client.numOfDeps = parseInt(value);
    }

    addDep() {
        this.userData.client.numOfDeps++;
        this.userData.client.hasDeps = true;
    }

    removeDep() {
        this.userData.client.numOfDeps--;
        if(this.userData.client.numOfDeps == 0) {
            this.userData.client.hasDeps = false;
        }
    }

    //NAVIGATE TO WAGE HISTORY
    wagehistory() {
        if(this.userData.client.age == 0 || this.userData.client.age < 18) alert('Enter valid Date of Birth');
        else this.router.navigate('#/wagehistory');  
    }

    spousewagehistory() {
        if(this.userData.spouse.age == 0 || this.userData.spouse.age < 18) alert('Enter valid Date of Birth');
        else this.router.navigate('#/spousewagehistory'); 
    }

    deceasedwagehistory() {
        if(this.userData.deceased.age == 0 || this.userData.deceased.age < 18) alert('Enter valid Date of Birth');
        else this.router.navigate('#/deceasedwagehistory'); 
    }

    divorce() {
        this.userData.client.divorceCheck = !this.userData.client.divorceCheck;
    }

    isRecieving() {
        this.userData.client.isRecieving = !this.userData.client.isRecieving;
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
                this.userData.client.retirementyear = this.userData.client.retirementAge + this.userData.client.yearOfBirth;
            }
        });

        $("#sliderSpouse").ionRangeSlider({
            grid: true,
            type: "double",
            min: 0,
            max: 100,
            from: 65,
            to: 91,
            step: 1,
            onFinish: (data) => {
                this.userData.spouse.retirementAge = data.from;
                this.userData.spouse.lifeExpectancy = data.to;
                this.userData.spouse.retirementyear = this.userData.spouse.retirementAge + this.userData.spouse.yearOfBirth;
            }
        });

        //==========================CLIENT TOOLTIPS=======================
        $('#dob').tooltip({
            content: "You must be older than 18 to use this application."
        });

        //========================SALARY TOOLTIPS=========================
        $('#salary').tooltip({
            content: "We estimate your previous and future wages. Input them manually for better accuracy here."
        });

        $('#retiredSalary').tooltip({
            content: "Input your wages before retirement here."
        });

        $('#notCurrentlyEmployedSalary').tooltip({
            content: "Input any previous or future wages here."
        });

        //=========================RETIREMENT TOOLTIPS==========================
        $('#retirementIncome').tooltip({
            content: "Input the total amount of income you will receive after you retire."
        });

        $('#retirementAge').tooltip({
            content: "Input the age you would like to retire and the age you expect to live until."
        });



        //==========================SPOUSE TOOLTIPS==============================
        $('#spousedob').tooltip({
            content: "You must be older than 18 to use this application."
        });

        $('#spousesalary').tooltip({
            content: "We estimate your previous and future wages. Input them manually for better accuracy here."
        });

        $('#spouseretiredSalary').tooltip({
            content: "Input your wages before retirement here."
        });

        $('#spousenotCurrentlyEmployedSalary').tooltip({
            content: "Input any previous or future wages here."
        });

        $('#spouseretirementIncome').tooltip({
            content: "Input the total amount of income you will receive after you retire."
        });

        $('#spouseretirementAge').tooltip({
            content: "Input the age you would like to retire and the age you expect to live until."
        });

        //======================DECEASED TOOLTIPS========================
        $('#deceasedsalary').tooltip({
            content: "We estimate previous and future wages. Input them manually for better accuracy here."
        });

        $('#deceaseddob').tooltip({
            content: "Deceased must be older than 18 for you to recieve survivor benefits."
        });
    }

    next() {
        function checkFields(person, clientmaritalStatus) {
            if(!person.name) alert("Input a name");
            else if(!person.gender || person.gender == "Please Select") alert("Input a gender");
            else if(!person.age || person.age < 18 || person.yearOfBirth < 1938 ) alert("Input a valid date of birth");
            else if(!person.employmentStatus || person.employmentStatus == "Please Select") alert("Input your employment status");
            else if( (person.employmentStatus == "Employed" || person.employmentStatus == "Business Owner") && ( person.salary == 0 || isNaN(person.salary)) ) {
                alert('Input a salary');
            }
            else if(!clientmaritalStatus || clientmaritalStatus == "Please Select") {
                alert("Input your marital status");
            }

            else return true; //GO TO EXCEPTIONS PAGE
        }

        function checkDeceasedFields(person) {
            if(!person.age || person.age < 18) alert("Input a valid date of birth");
            else return true;
        }
        
        var maritalStatus = this.userData.client.maritalStatus;
        
        //MAKE SURE EVERYTHING IS INPUTTED
        if(checkFields(this.userData.client, maritalStatus)) {
            if(maritalStatus == "Married" && !this.userData.client.isRecieving) {
                if(checkFields(this.userData.spouse, maritalStatus)) this.router.navigate('#/exceptions');
            }
            else if(maritalStatus == "Widowed") {
                if(checkDeceasedFields(this.userData.deceased)) this.router.navigate('#/exceptions');
            }
            else this.router.navigate('#/exceptions');
        }
    }
}