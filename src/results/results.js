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
                console.log(limitYear);
                console.log(overLimit);
                console.log(projEarningsLimit[limitYear]);

                if(overLimit > 0 && age < FRA) { //Over Limit and Before FRA
                    var reduction = overLimit / 2;
                    person.ssBaseAdj[i] = person.ssBase - reduction;
                }
                else if(overLimit > 0 && age == FRA) { //Over Limit and At FRA
                    var reduction = overLimit / 3;
                    person.ssBaseAdj[i] = person.ssBase - reduction;
                }
                else person.ssBaseAdj[i] = person.ssBase; //Below Limit or After FRA
            }); 
        }

        results(this.userData.client);

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