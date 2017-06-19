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
export class exceptions {
    constructor(userData, router)
    {
        this.clientMilitaryService = false;
        this.clientBeganService = "";
        this.clientEndService = "";
        this.clientWorkedOnAFarm = false;
        this.clientWorkedInAHousehold = false;
        this.clientWorkedOnARailroad = false;
        this.clientRecievePension = false;
        this.clientWorkedForeignGov = false;

        this.clientCanadaItaly = true;

        this.spouseMilitaryService = false;
        this.spouseWorkedOnAFarm = false;
        this.spouseWorkedInAHousehold = false;
        this.spouseWorkedOnARailroad = false;
        this.spouseRecievePension = false;
        this.spouseWorkedForeignGov = false;

        this.router = router;
        this.userData = userData;
    }

    calculate()
    {


        this.router.navigate('#/benefits');
    }

    attached()
    {
        if (this.userData.client.maritalStatus != "Married")
            $('#spouse').hide();

        $('#clientServed').hide();
        $('#clientMilitaryService').change(function() {
            console.log($(this).val());
           $(this).is(':checked') ? $('#clientServed').show() : $('#clientServed').hide();
        });

        $('#clientMadeFarmMoney').hide();
        $('#clientWorkedOnAFarm').change(function() {
            console.log($(this).val());
           $(this).is(':checked') ? $('#clientMadeFarmMoney').show() : $('#clientMadeFarmMoney').hide();
        });

        $('#clientMadeHouseHoldMoney').hide();
        $('#clientWorkedInAHousehold').change(function() {
            console.log($(this).val());
           $(this).is(':checked') ? $('#clientMadeHouseHoldMoney').show() : $('#clientMadeHouseHoldMoney').hide();
        });

        $('#clientRailroadBox').hide();
        $('#clientWorkedOnARailroad').change(function() {
            console.log($(this).val());
           $(this).is(':checked') ? $('#clientRailroadBox').show() : $('#clientRailroadBox').hide();
        });

        $('#clientPensionBox').hide();
        $('#clientRecievePension').change(function() {
            console.log($(this).val());
           $(this).is(':checked') ?  $('#clientPensionBox').show() : $('#clientPensionBox').hide();
        });

        //$('#clientCitizenship').hide();
        $('#clientCitizenship').change(function() {
            switch ($ (this).val() )
            {
                case "Not a US Citizen":
                    $('#client26CountriesBox').hide();
                    $('#clientCanadaItalyBox').hide();
                    $('#clientInstrumentalityBox').show();
                    break;
                case "Dual Citizen":
                    $('#clientInstrumentalityBox').hide();
                    $('#clientOneOrTwoBox').hide();
                    $('#client26CountriesBox').show();
                    break;
                default: 
                    $('#clientInstrumentalityBox').hide();
                    $('#client26CountriesBox').hide();
                    $('#clientCanadaItalyBox').hide();
                    $('#clientOneOrTwoBox').hide();

            }
        });

        $('#clientInstrumentalityBox').hide();
        $('#clientInstrumentality').change(function() {
            $(this).is(':checked') ? $('#clientOneOrTwoBox').show() : $('#clientOneOrTwoBox').hide();
        });

        $('#clientOneOrTwoBox').hide();
        $('#clientOneOrTwo').change(function() {
            if ( $(this).is(':checked') )
                alert("You are not eligible for US Social Security benefits.");
        });

        $('#client26CountriesBox').hide();
        $('#client26Countries').change(function() {
            $(this).is(':checked') ? $('#clientCanadaItalyBox').show() : $('#clientCanadaItalyBox').hide();

        });

        $('#clientCanadaItalyBox').hide();
        $('#clientCanadaItaly').change(function() {
            if ( ! $(this).is(':checked') )
                alert("You are not eligible for Social Security benefits");
        });

        

        




    }
    
}