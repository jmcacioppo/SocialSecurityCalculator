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

    calculate() {
        function getAge(person) {
            var dob = person.dateOfBirth;
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
                person.age = moment().diff(dob, 'years');
                person.yearOfBirth = yearOfBirth;
                person.currentYear = currentYear;
            }
        }
        
        function calculatePIA(person) {
            //GET ALL USER DATA            
            var empStatus = person.employmentStatus;
            var sal = person.salary;
            var retirementAge = person.retirementAge;
            //NEW VARIABLES
            var pia, ageFrom18, yrsUntilRetire;
            var projectedSal = [];
            var inflationAdjusted = [];
            var topThirtyFive = [];

            //MAKE SURE EVERYTHING IS INPUTTED
            // if(!name || !gender || !dob || !empStatus ||
            //     empStatus == "Please Select" || !maritalStatus || 
            //     maritalStatus == "Please Select" || !numOfDependents) {
            //         alert("Fill in all information");
            //         console.log(name + " " + gender + " " + sal + " " + dob);
            //         return;
            // }

            //COMPUTE AGE OF PERSON
            getAge(person);
            ageFrom18 = person.age - 18;
            yrsUntilRetire = retirementAge - person.age;
            
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
        $('#divorced').hide();
        $('#spouse').hide();
        $("#maritalStatus").change(function() { 
            var val = $(this).val();
            if(val == "Divorced") {
                $('#divorced').show();
                $("#divorceCheck").change(function() { 
                    var val = $(this).is(':checked');
                    if(val == true) console.log("Divorced for more than 10");
                    else console.log("Not divorced for more than 10");
                });
            }
            else $('#divorced').hide();

            if(val == "Married") $('#spouse').show();
            else $('#spouse').hide();
        });

        //CHECK THE NUMBER OF DEPENDENTS AND ADD APPROPRIATE AMOUNT OF THEM
        // var count = 0;
        // $('#addDep').on('click', function() {
        //     $('#dependents').append('<div id="remove ' + (count+1) + '"><br><label>Dependent ' + (count + 1) + ':</label><input type="text" value.bind="userData.client.ageOfDependent[' + count +
        //          ']" id="added" class="form-control" placeholder="10">' + 
        //          '<button id="remDep">Remove</button></div>');
        //     count += 1; 
        // });

        // $('#dependents').on('click', '#remDep', function() {
        //     $(this).parent().remove();
        //     count -= 1;
        // });
    }
}