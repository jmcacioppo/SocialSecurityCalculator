import $ from 'jquery';
import 'jquery-ui-dist';
import * as ionRangeSlider from "ion-rangeslider";

import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata';
import {Router} from 'aurelia-router';
import {wagePerc, allowedSalary, inflationIndex, tier1perc, tier2perc, tier3perc, 
    tier1, consttier1, consttier2,subEarningsPerc, EL1943plus, EL1955, EL1956, EL1957,
    EL1958, EL1959, EL1960plus} from 'src/services/constants.js';

@inject(UserData, Router)
export class benefits {
    constructor(userData, router) {
        this.userData = userData;
        this.router = router;
    }

    benefitsCalc() {
        function calculateSSBase(person) {
            var age = person.age;
            var yearOfBirth = person.yearOfBirth;
            var pia = person.pia;
            var retirementAge = person.retirementAge;
            var yrsOfSubearnings = person.yrsOfSubearnings;
            var ssBase;
            
            //FIX PIA BASED ON YEAR OF BIRTH AND WHEN THEY WANT TO RETIRE
            switch(yearOfBirth) {
                case 1955:
                    switch(retirementAge) {
                        case 62: pia = pia * EL1955[0]; break;
                        case 63: pia = pia * EL1955[1]; break;
                        case 64: pia = pia * EL1955[2]; break;
                        case 65: pia = pia * EL1955[3]; break;
                        case 66: pia = pia * EL1955[4]; break;
                        case 67: pia = pia * EL1955[5]; break;
                        case 68: pia = pia * EL1955[6]; break;
                        case 69: pia = pia * EL1955[7]; break;
                        case 70: pia = pia * EL1955[8]; break;
                    }
                case 1956:
                    switch(retirementAge) {
                        case 62: pia = pia * EL1956[0]; break;
                        case 63: pia = pia * EL1956[1]; break;
                        case 64: pia = pia * EL1956[2]; break;
                        case 65: pia = pia * EL1956[3]; break;
                        case 66: pia = pia * EL1956[4]; break;
                        case 67: pia = pia * EL1956[5]; break;
                        case 68: pia = pia * EL1956[6]; break;
                        case 69: pia = pia * EL1956[7]; break;
                        case 70: pia = pia * EL1956[8]; break;
                    }    
                case 1957:
                    switch(retirementAge) {
                        case 62: pia = pia * EL1957[0]; break;
                        case 63: pia = pia * EL1957[1]; break;
                        case 64: pia = pia * EL1957[2]; break;
                        case 65: pia = pia * EL1957[3]; break;
                        case 66: pia = pia * EL1957[4]; break;
                        case 67: pia = pia * EL1957[5]; break;
                        case 68: pia = pia * EL1957[6]; break;
                        case 69: pia = pia * EL1957[7]; break;
                        case 70: pia = pia * EL1957[8]; break;
                    }
                case 1958:
                    switch(retirementAge) {
                        case 62: pia = pia * EL1958[0]; break;
                        case 63: pia = pia * EL1958[1]; break;
                        case 64: pia = pia * EL1958[2]; break;
                        case 65: pia = pia * EL1958[3]; break;
                        case 66: pia = pia * EL1958[4]; break;
                        case 67: pia = pia * EL1958[5]; break;
                        case 68: pia = pia * EL1958[6]; break;
                        case 69: pia = pia * EL1958[7]; break;
                        case 70: pia = pia * EL1958[8]; break;
                    }
                case 1959:
                    switch(retirementAge) {
                        case 62: pia = pia * EL1959[0]; break;
                        case 63: pia = pia * EL1959[1]; break;
                        case 64: pia = pia * EL1959[2]; break;
                        case 65: pia = pia * EL1959[3]; break;
                        case 66: pia = pia * EL1959[4]; break;
                        case 67: pia = pia * EL1959[5]; break;
                        case 68: pia = pia * EL1959[6]; break;
                        case 69: pia = pia * EL1959[7]; break;
                        case 70: pia = pia * EL1959[8]; break;
                    }     
                default:
                    if(yearOfBirth <= 1954) {
                        switch(retirementAge) {
                            case 62: pia = pia * EL1943plus[0]; break;
                            case 63: pia = pia * EL1943plus[1]; break;
                            case 64: pia = pia * EL1943plus[2]; break;
                            case 65: pia = pia * EL1943plus[3]; break;
                            case 66: pia = pia * EL1943plus[4]; break;
                            case 67: pia = pia * EL1943plus[5]; break;
                            case 68: pia = pia * EL1943plus[6]; break;
                            case 69: pia = pia * EL1943plus[7]; break;
                            case 70: pia = pia * EL1943plus[8]; break;
                        }   
                    }  
                    else {
                        switch(retirementAge) {
                            case 62: pia = pia * EL1960plus[0]; break;
                            case 63: pia = pia * EL1960plus[1]; break;
                            case 64: pia = pia * EL1960plus[2]; break;
                            case 65: pia = pia * EL1960plus[3]; break;
                            case 66: pia = pia * EL1960plus[4]; break;
                            case 67: pia = pia * EL1960plus[5]; break;
                            case 68: pia = pia * EL1960plus[6]; break;
                            case 69: pia = pia * EL1960plus[7]; break;
                            case 70: pia = pia * EL1960plus[8]; break;
                        }   
                    }     
            }

            //Benefit Formula
            var tier1, tier2, tier3;
            var sum = consttier1 + consttier2; //Get sum of tier1 and tier2 constants
            if(pia > consttier1) { //Tier1 for benefit formula - checking WEP and years of substantial earnings
                switch(yrsOfSubearnings) {
                    case 29: tier1 = consttier1 * subEarningsPerc[1]; break;
                    case 28: tier1 = consttier1 * subEarningsPerc[2]; break;
                    case 27: tier1 = consttier1 * subEarningsPerc[3]; break;
                    case 26: tier1 = consttier1 * subEarningsPerc[4]; break;
                    case 25: tier1 = consttier1 * subEarningsPerc[5]; break;
                    case 24: tier1 = consttier1 * subEarningsPerc[6]; break;    
                    case 23: tier1 = consttier1 * subEarningsPerc[7]; break;
                    case 22: tier1 = consttier1 * subEarningsPerc[8]; break;
                    case 21: tier1 = consttier1 * subEarningsPerc[9]; break;
                    default: 
                        if(yrsOfSubearnings >= 30) tier1 = consttier1 * subEarningsPerc[0];
                        else tier1 = consttier1 * subEarningsPerc[10];
                }
            }
            else {
                switch(yrsOfSubearnings) {
                    case 29: tier1 = pia * subEarningsPerc[1]; break;
                    case 28: tier1 = pia * subEarningsPerc[2]; break;
                    case 27: tier1 = pia * subEarningsPerc[3]; break;
                    case 26: tier1 = pia * subEarningsPerc[4]; break;
                    case 25: tier1 = pia * subEarningsPerc[5]; break;
                    case 24: tier1 = pia * subEarningsPerc[6]; break;    
                    case 23: tier1 = pia * subEarningsPerc[7]; break;
                    case 22: tier1 = pia * subEarningsPerc[8]; break;
                    case 21: tier1 = pia * subEarningsPerc[9]; break;
                    default: 
                        if(yrsOfSubearnings >= 30) tier1 = pia * subEarningsPerc[0];
                        else tier1 = pia * subEarningsPerc[10];
                }
            } 
            
            //TIER2 FOR BENEFIT FORMULA
            if(pia > sum) { 
                tier2 = consttier2 * tier2perc
            } 
            else tier2 = pia * tier2perc; 

            //TIER3 FOR BENEFIT FORMULA
            if(pia > sum) {
                tier3 = (pia - sum) * tier3perc; 
            }
            else tier3 = 0;

            //ADD TIERS AND GET YEARLY BASE VALUE FOR SOCIAL SECURITY
            var sumOfTiers = tier1 + tier2 + tier3; 
            ssBase = sumOfTiers * 12; 

            person.pia = pia;
            person.ssBase = ssBase;
        }

        var maritalStatus = this.userData.client.maritalStatus;
        calculateSSBase(this.userData.client);

        //GET PIA COCLIENT CALCULATIONS IF NECESSARY
        if(maritalStatus == "Married") {
            calculateSSBase(this.userData.spouse);
        }
        
        console.log(this.userData);
    }

    back() {
        this.router.navigate('#/exceptions');
    }

    attached () {        
        $("#benefitslider").ionRangeSlider({
            grid: true,
            type: "single",
            min: 0,
            max: 10,
            from: 2.5,
            step: 0.1,
            postfix: "%",
            onFinish: (data) => {
                this.userData.client.cola = data.from;
            }
        });
   }
}