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

    results() {
        function makeChart(containerID, person) {
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
        var maritalStatus = this.userData.client.maritalStatus;
        makeChart('clientContainer', this.userData.client);
        if (this.userData.client.maritalStatus == "Married") makeChart('spouseContainer', this.userData.spouse);
    }

    attached() {

    } 
}