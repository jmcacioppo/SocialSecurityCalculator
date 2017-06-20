import $ from 'jquery';
import 'jquery-ui-dist';
import * as ionRangeSlider from "ion-rangeslider";

import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata';
import {Router} from 'aurelia-router';
import {projEarningsLimit} from 'src/services/constants.js';

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

        }

        var maritalStatus = this.userData.client.maritalStatus;
        results(this.userData.client);

        if(maritalStatus == "Married") {
            results(this.userData.spouse);
        }

        console.log(this.userData);

    //     var context = document.getElementById("myChart").getContext('2d');
    //     console.log(context);

    //     var myChart = new Chart(context, {
    //         type: 'bar',
    //         data: {
    //             labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //             datasets: [{
    //                 label: '# of Votes',
    //                 data: [12, 19, 3, 5, 2, 3],
    //                 backgroundColor: [
    //                     'rgba(255, 99, 132, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(255, 206, 86, 0.2)',
    //                     'rgba(75, 192, 192, 0.2)',
    //                     'rgba(153, 102, 255, 0.2)',
    //                     'rgba(255, 159, 64, 0.2)'
    //                 ],
    //                 borderColor: [
    //                     'rgba(255,99,132,1)',
    //                     'rgba(54, 162, 235, 1)',
    //                     'rgba(255, 206, 86, 1)',
    //                     'rgba(75, 192, 192, 1)',
    //                     'rgba(153, 102, 255, 1)',
    //                     'rgba(255, 159, 64, 1)'
    //                 ],
    //                 borderWidth: 1
    //             }]
    //         },
    //         options: {
    //             scales: {
    //                 yAxes: [{
    //                     ticks: {
    //                         beginAtZero:true
    //                     }
    //                 }]
    //             }
    //         }
    //     });
    //     console.log(myChart);
    //     $("#myChart").hide();
    //     console.log($("#myChart"));
    // }

    // what() {
    //     $("#myChart").show();
    //     console.log($('#myChart'));
    // }
    }
}