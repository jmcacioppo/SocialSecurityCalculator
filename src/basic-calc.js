import {Chart} from 'node_modules/chart.js/dist/Chart.js';
import 'bootstrap'
import {inject} from 'aurelia-framework';
import {Data} from './data';
import $ from 'jquery';
import * as ionRangeSlider from "ion-rangeslider";
import {cpiValues} from 'src/values.js';

@inject(Data)
export class BasicCalc {

    //Constructor for basic calc class
    constructor(data) {
        this.data = data;
        this.barchartData = [];
    }

    attached() {
      $("#range").ionRangeSlider({
          grid: true,
          from: 65,
          values: [
        "61", "62",
        "63", "64",
        "65", "66",
        "67", "68",
        "69", "70"
    ]
      });
    }

    //Method called from the HTML to do calculations and create the bar chart
    attach(dob, income) {
        var date = new Date();
        calculateInflationAdjustedIncome(income, this.data, dob);
        var adjustedSocialSecurityBenefits = calculateSocialSecurity(this.data.basicCalcAverageIndexedMonthlyEarnings);
        this.makeBarChart(adjustedSocialSecurityBenefits);
        document.getElementById('retirement-chart-container').style.display="block";
    }

    //Creates a bar chart with data from API/Json.
    makeBarChart(monthlyBenefits) {
        var percentagePIA = [.75, .8, .83, .86, 1, 1.08, 1.16, 1.24, 1.32];
        var adjustPIA = [];
        for(var i = 0; i < percentagePIA.length; i++) {
            adjustPIA[i] = monthlyBenefits * percentagePIA[i];
            console.log(adjustPIA[i]);
        }
        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Array.apply(0, Array(9)).map(function(_, i) {return 62 + i;}),
          datasets: [{
            label: 'Monthly Income',
            data: adjustPIA,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
           "hover": {
      "animationDuration": 0
    },
    "animation": {
      "duration": 1,
      "onComplete": function() {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        this.data.datasets.forEach(function(dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function(bar, index) {
            var data = dataset.data[index];
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }
    },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true,
              }
            }],
            xAxes: [{
              gridLines: {
                display: false,
              }
            }]
          },
        }
      });
    }
}

      //Sums the total of the user's income by inflation rate and CPI from previous 35 years
      function calculateInflationAdjustedIncome(income, data, dob) {
        var d = new Date();
        var year = d.getFullYear();
        var adjustedInflationIncomes = [];

        //Calculates adjust infaltion incomes and pushes them to array
        adjustedInflationIncomes[0] = income;
        for(var i = 1; i < 35; i++) {
           adjustedInflationIncomes.push(adjustedInflationIncomes[i - 1] / (1 + 0.025));
        }

        var adjustedCPIIncomes = [];
        //Calculates adjusted CPI incomes and pushes them to array
        for(var i = 0; i < 35; i++) {
          var cpiYearInflation = cpiValues[54 - i];
          adjustedCPIIncomes.push(adjustedInflationIncomes[i] * cpiYearInflation);
        }

        var total = 0;
        //Calculates the total income from the adjusted CPI incomes
        for(var i = 0; i < adjustedCPIIncomes.length; i++) {
          total += adjustedCPIIncomes[i];
        }
        data.basicCalcThirtyFiveYearIncomeTotal = total;
        data.basicCalcAverageIndexedMonthlyEarnings = total / 420;
        console.log(data.basicCalcThirtyFiveYearIncomeTotal);
        console.log(data.basicCalcAverageIndexedMonthlyEarnings);
      } 

      //This function calculates the base social security solely based on income
      function calculateSocialSecurity(income) {
        //Total social security monthly income.
        var total = 0;
        var monthlyIncome = income / 12;
        if(monthlyIncome < 885) {
            total += monthlyIncome * 0.9;
        } else {
            total += 796;
        }
        if(monthlyIncome < 5336) {
            total += 1424;
            if(monthlyIncome > 5336) {
                total += (monthlyIncome - 5336) * 0.15;
            }
        } else {
            total += (monthlyIncome - 885) * 0.32;
        }
        if(total > 2639) {
            total = 2639; 
        }
        return total;
    }