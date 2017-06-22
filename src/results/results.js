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
        
        this.netEarly = 0;
        this.netUserSelected = 0;
        this.netFRA = 0;
        this.netLate = 0;
    }
    
    back() {
        this.router.navigate('#/benefits');
    }

    results() {
        function makeChart(containerID, person) {

            function generateTuples(array, startAge, person) {
                var tuples = [];
                for (var i = 0; i < array.length; i++)
                {
                    tuples.push( [ startAge + i, array[i] ] );
                    switch (startAge)
                    {
                        case 62:
                            person.netEarly += array[i];
                            break;
                        case person.retirementAge:
                            person.netUserSelected += array[i];
                            break;
                        case person.yearFRA:
                            person.netFRA += array[i];
                            break;
                        default:
                            person.netLate += array[i];
                    }
                }
                return tuples;
            }

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
                    data: generateTuples(person.earlyBenefits, 62, person)
                }, {
                    name: 'Receive at ' + person.retirementAge + ' (user-selected)',
                    data: generateTuples(person.userSelectedBenefits, person.retirementAge, person)
                }, {
                    name: 'Receive at ' + person.yearFRA + ' (FRA)',
                    data: generateTuples(person.FRABenefits, person.yearFRA, person)
                }, {
                    name: 'Receive at 70 (latest)',
                    data: generateTuples(person.lateBenefits, 70, person)
                }]
            }); //end Highcharts.chart()
        } //end function makeChart()

        var maritalStatus = this.userData.client.maritalStatus;
        makeChart('clientContainer', this.userData.client);
        this.userData.client.showChart = true;

        if(maritalStatus == "Married") {   
            makeChart('spouseContainer', this.userData.spouse);
            this.userData.spouse.showChart = true;
        }        
    }

    attached() {

    } 
}