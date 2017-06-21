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
    
    back() {
        this.router.navigate('#/benefits');
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

        }

        var maritalStatus = this.userData.client.maritalStatus;
        results(this.userData.client);

        if(maritalStatus == "Married") {
            results(this.userData.spouse);
        }

        console.log(this.userData);

        // GENERATE CHART
        // var blah =  Highcharts.chart('container', {

        //     title: {
        //         text: 'Solar Employment Growth by Sector, 2010-2016'
        //     },

        //     subtitle: {
        //         text: 'Source: thesolarfoundation.com'
        //     },

        //     yAxis: {
        //         title: {
        //             text: 'Number of Employees'
        //         }
        //     },
        //     legend: {
        //         layout: 'vertical',
        //         align: 'right',
        //         verticalAlign: 'middle'
        //     },

        //     plotOptions: {
        //         series: {
        //             pointStart: 2010
        //         }
        //     },

        //     series: [{
        //         name: 'Installation',
        //         data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        //     }, {
        //         name: 'Manufacturing',
        //         data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        //     }, {
        //         name: 'Sales & Distribution',
        //         data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
        //     }, {
        //         name: 'Project Development',
        //         data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
        //     }, {
        //         name: 'Other',
        //         data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
        //     }]

        // }); //end of Highcharts.chart()

        
        
        

        Highcharts.chart('container', {
            title: {
                text: 'Benefits vs. Age'
            },
            // xAxis: {
            //     categories: (() => {
            //                     var ages = [];
            //                     for (var age = 62; age <= this.userData.client.lifeExpectancy; age++)
            //                         ages.push(age);
            //                     return ages;
            //                 })()
            // },
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
                        console.log(this.userData.client.earlyBenefits);
                        while (this.userData.client.earlyBenefits.length < this.userData.client.lifeExpectancy - 62)
                            this.userData.client.earlyBenefits.unshift(99);
                        console.log(this.userData.client.earlyBenefits);
                        return this.userData.client.earlyBenefits;
                    })()
            }, {
                name: 'Receive at ' + this.userData.client.retirementAge + ' (user-selected)',
                data: (() => {
                        console.log(this.userData.client.userSelectedBenefits);
                        while (this.userData.client.userSelectedBenefits.length < this.userData.client.lifeExpectancy - 62)
                            this.userData.client.userSelectedBenefits.unshift(99);
                        console.log(this.userData.client.userSelectedBenefits);
                        return this.userData.client.userSelectedBenefits;
                    })()
            }, {
                name: 'Receive at ' + this.userData.client.yearFRA + ' (FRA)',
                data: (() => {
                        console.log(this.userData.client.FRABenefits);
                        while (this.userData.client.FRABenefits.length < this.userData.client.lifeExpectancy - 62)
                            this.userData.client.FRABenefits.unshift(99);
                        console.log(this.userData.client.FRABenefits);
                        return this.userData.client.FRABenefits;
                    })()
            }, {
                name: 'Receive at 70 (latest)',
                data: (() => {
                        console.log(this.userData.client.lateBenefits);
                        while (this.userData.client.lateBenefits.length < this.userData.client.lifeExpectancy - 62) {
                            this.userData.client.lateBenefits.unshift(99);
                        }
                        console.log(this.userData.client.lateBenefits);
                        return this.userData.client.lateBenefits;
                    })()
            }]
        });


    } // end of attached{}
} //end of class