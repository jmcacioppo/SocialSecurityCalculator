import $ from 'jquery';
import 'jquery-ui-dist';
import * as ionRangeSlider from "ion-rangeslider";

import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata';
import {Router} from 'aurelia-router';
import {projEarningsLimit} from 'src/services/constants.js';

import * as HighCharts from "highcharts";


@inject(UserData, Router)
export class results {
    constructor(userData, router) {
        this.userData = userData;
        this.router = router;
    }
    
    attached() {
        function results(person) {
            var early = 62;
            var FRA = person.yearFRA; //age at FRA
            var userSelected = person.retirementAge;
            var late = 70;
            var retirementAges = [early, FRA, userSelected, late];
            
            var yearOfBirth = person.yearOfBirth;
            var currentYear = person.currentYear;
            var retirementIncome = person.retirementIncome;
            
            retirementAges.forEach(function(age, i) {
                var retirementYear = age + yearOfBirth;
                var limitYear = retirementYear - currentYear;
                var overLimit = retirementIncome - projEarningsLimit[limitYear];

                if(overLimit > 0 && age < FRA) { //Over Limit and Before FRA
                    var reduction = overLimit / 2;
                    person.ssBaseAdj[i] = person.ssBase - reduction;
                    if(person.ssBaseAdj[i] < 0) person.ssBaseAdj[i] = 0;
                }
                else if(overLimit > 0 && age == FRA) { //Over Limit and At FRA
                    var reduction = overLimit / 3;
                    person.ssBaseAdj[i] = person.ssBase - reduction;
                    if(person.ssBaseAdj[i] < 0) person.ssBaseAdj[i] = 0;
                }
                else person.ssBaseAdj[i] = person.ssBase; //Below Limit or After FRA
            }); 

            person.ssBaseAdj.forEach(function(ssBase, i) {
                var age = retirementAges[i];
                var lifeExpectancy = person.lifeExpectancy;
                var numOfYears = lifeExpectancy - age;

                for(var j = 0; j < numOfYears; j++) {
                    if(i == 0) {
                        if(j==0) person.earlyBenefits[j] = ssBase;
                        else {
                            person.earlyBenefits[j] = person.earlyBenefits[j-1] + person.earlyBenefits[j-1] * person.cola / 100;
                        }
                    }
                    else if(i == 1) {
                        if(j==0) person.FRABenefits[j] = ssBase;
                        else {
                            person.FRABenefits[j] = person.FRABenefits[j-1] + person.FRABenefits[j-1] * person.cola / 100;
                        }
                    }
                    else if(i == 2) {
                        if(j==0) person.userSelectedBenefits[j] = ssBase;
                        else {
                            person.userSelectedBenefits[j] = person.userSelectedBenefits[j-1] + person.userSelectedBenefits[j-1] * person.cola / 100;
                        }
                    }
                    else if(i == 3) {
                        if(j==0) person.lateBenefits[j] = ssBase;
                        else {
                            person.lateBenefits[j] = person.lateBenefits[j-1] + person.lateBenefits[j-1] * person.cola / 100;
                        }
                    }
                }

            }); 

        } //end results(person)

        var maritalStatus = this.userData.client.maritalStatus;
        results(this.userData.client);

        if(maritalStatus == "Married") {
            results(this.userData.spouse);
        }

        console.log(this.userData);

        function makeChart(containerID, person)
        {
            Highcharts.chart(containerID, {
                title: {
                    text: person.name + ': Benefits vs. Age'
                },
                xAxis: {
                    title: {
                        text: 'Age'
                    }
                },
                plotOptions: {
                    series: {
                        pointStart: 62
                    }
                },
                yAxis: {
                    title: {
                        text: 'Yearly Benefits'
                    }
                },
                series: [{
                    name: 'Receive at 62 (earliest)',
                    data: (() => {
                            while (person.earlyBenefits.length < person.lifeExpectancy - 62)
                                person.earlyBenefits.unshift(0);
                            return person.earlyBenefits;
                        })()
                }, {
                    name: 'Receive at ' + person.retirementAge + ' (user-selected)',
                    data: (() => {
                            while (person.userSelectedBenefits.length < person.lifeExpectancy - 62)
                                person.userSelectedBenefits.unshift(0);
                            return person.userSelectedBenefits;
                        })()
                }, {
                    name: 'Receive at ' + person.yearFRA + ' (FRA)',
                    data: (() => {
                            while (person.FRABenefits.length < person.lifeExpectancy - 62)
                                person.FRABenefits.unshift(0);
                            return person.FRABenefits;
                        })()
                }, {
                    name: 'Receive at 70 (latest)',
                    data: (() => {
                            while (person.lateBenefits.length < person.lifeExpectancy - 62)
                                person.lateBenefits.unshift(0);
                            return person.lateBenefits;
                        })()
                }]
            }); //end Highcharts.chart()
        } //end function makeChart()
 
        makeChart('clientContainer', this.userData.client);

        if (this.userData.client.maritalStatus == "Married")
            makeChart('spouseContainer', this.userData.spouse);


    } // end of attached{}
} //end of class