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
            person.earlyTuples = [];
            person.userSelectedTuples = [];
            person.FRATuples = [];
            person.lateTuples = [];

            function generateTuples(array, startAge, person) {
                var tuples = [];

                switch (startAge) {
                    case 62:
                        person.netEarly = 0;
                        break;
                    case person.retirementAge:
                        person.netUserSelected = 0;
                        break;
                    case person.yearFRA:
                        person.netFRA = 0;
                        break;
                    default:
                        person.netLate = 0;
                }

                for (var i = 0; i < array.length; i++) {
                    tuples.push( [ startAge + i, parseFloat(array[i].toFixed(2)) ] );
                    switch (startAge)
                    {
                        case 62:
                            person.netEarly += array[i];
                            person.earlyTuples.push(parseFloat(array[i].toFixed(2)));
                            person.earlyTuples[i] = "$" + parseFloat(person.earlyTuples[i]).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                            break;
                        case person.retirementAge:
                            person.netUserSelected += array[i];
                            person.userSelectedTuples.push(parseFloat(array[i].toFixed(2)));
                            person.userSelectedTuples[i] = "$" + parseFloat(person.userSelectedTuples[i]).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                            break;
                        case person.yearFRA:
                            person.netFRA += array[i];
                            person.FRATuples.push(parseFloat(array[i].toFixed(2)));
                            person.FRATuples[i] = "$" + parseFloat(person.FRATuples[i]).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");                 
                            break;
                        default:
                            person.netLate += array[i];
                            person.lateTuples.push(parseFloat(array[i].toFixed(2)));
                            person.lateTuples[i] = "$" + parseFloat(person.lateTuples[i]).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                    }
                }

                switch (startAge) {
                    case 62:
                        person.netEarly = "$" + parseFloat(person.netEarly).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                        break;
                    case person.retirementAge:
                        person.netUserSelected = "$" + parseFloat(person.netUserSelected).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                        break;
                    case person.yearFRA:
                        person.netFRA = "$" + parseFloat(person.netFRA).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                        break;
                    default:
                        person.netLate = "$" + parseFloat(person.netLate).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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
                    data:  generateTuples(person.earlyBenefits, 62, person)
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

        function currencyFormat (num) {
            return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }

        var maritalStatus = this.userData.client.maritalStatus;

        if(!this.userData.client.showChart) {
            makeChart('clientContainer', this.userData.client);
            this.userData.client.showChart = true;

            if(maritalStatus == "Married") {   
                makeChart('spouseContainer', this.userData.spouse);
                this.userData.spouse.showChart = true;
            } 
        }
        else {
            this.userData.client.showChart = !this.userData.client.showChart;
            if(maritalStatus == "Married") {   
                this.userData.spouse.showChart = !this.userData.spouse.showChart;
            }         
        } 
    }

    checkAge(value) {
        if(value.indexOf('Early') >= 0) {
            this.userData.client.checkEarly = true;
            this.userData.client.checkUserSelected = false;
            this.userData.client.checkFRA = false;
            this.userData.client.checkLate = false;
        }
        else if(value.indexOf('Selected Age') >= 0) {
            this.userData.client.checkEarly = false;
            this.userData.client.checkUserSelected = true;
            this.userData.client.checkFRA = false;
            this.userData.client.checkLate = false;
        }
        else if(value.indexOf('FRA') >= 0) {
            this.userData.client.checkEarly = false;
            this.userData.client.checkUserSelected = false;
            this.userData.client.checkFRA = true;
            this.userData.client.checkLate = false;
        }
        else if(value.indexOf('Late') >= 0) {
            this.userData.client.checkEarly = false;
            this.userData.client.checkUserSelected = false;
            this.userData.client.checkFRA = false;
            this.userData.client.checkLate = true;
        }
        else { //Please Select is selected
            this.userData.client.checkEarly = false;
            this.userData.client.checkUserSelected = false;
            this.userData.client.checkFRA = false;
            this.userData.client.checkLate = false;
        }
    }

    checkAgeSpouse(value) {
        if(value.indexOf('Early') >= 0) {
            this.userData.spouse.checkEarly = true;
            this.userData.spouse.checkUserSelected = false;
            this.userData.spouse.checkFRA = false;
            this.userData.spouse.checkLate = false;
        }
        else if(value.indexOf('Selected Age') >= 0) {
            this.userData.spouse.checkEarly = false;
            this.userData.spouse.checkUserSelected = true;
            this.userData.spouse.checkFRA = false;
            this.userData.spouse.checkLate = false;
        }
        else if(value.indexOf('FRA') >= 0) {
            this.userData.spouse.checkEarly = false;
            this.userData.spouse.checkUserSelected = false;
            this.userData.spouse.checkFRA = true;
            this.userData.spouse.checkLate = false;
        }
        else if(value.indexOf('Late') >= 0) {
            this.userData.spouse.checkEarly = false;
            this.userData.spouse.checkUserSelected = false;
            this.userData.spouse.checkFRA = false;
            this.userData.spouse.checkLate = true;
        }
        else { //Please Select is selected
            this.userData.spouse.checkEarly = false;
            this.userData.spouse.checkUserSelected = false;
            this.userData.spouse.checkFRA = false;
            this.userData.spouse.checkLate = false;
        }
    }

    attached() {
        this.userData.client.showChart = false;
        this.userData.spouse.showChart = false;
    } 
}