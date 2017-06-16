import $ from 'jquery';
import moment from 'moment';

import 'src/services/constants.js';
import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata';
import {Router} from 'aurelia-router';

@inject(UserData, Router)
export class spousewagehistory {
    constructor(userData, router) {
        this.userData = userData;
        this.router = router;
    }
    
    showWages() {
        function getAge(person) {
            var dob = person.dateOfBirth;
            var date = moment(dob, 'M/D/YYYY');
            var yearOfBirth = date.format('YYYY');
            var currentYear = moment().format('YYYY');
            
            if(!((dob.indexOf(date.format('MM/DD/YYYY')) >= 0) || (dob.indexOf(date.format('M/DD/YYYY')) >= 0)
                || (dob.indexOf(date.format('MM/D/YYYY')) >= 0) || (dob.indexOf(date.format('M/D/YYYY')) >= 0))
                || !date.isValid() || yearOfBirth > currentYear) {
                    alert('Invalid Date of Birth');
                    return;
                }
            else {
                person.age = moment().diff(dob, 'years');
                person.yearOfBirth = yearOfBirth;
                person.currentYear = currentYear;
            }
        }

        function getWages(person) {
            getAge(person);
            var salary = person.salary;
            var yearOfBirth = person.yearOfBirth;
            var currentYear = person.currentYear;
            var ageFrom18 = parseInt(yearOfBirth) + 18;

            for(var i = ageFrom18; i <= currentYear; i++) {
                var count = 0;
                $('#wages').append('<br>' + i + ':<div class="input-group mb-2 mr-sm-2 mb-sm-0" id="spousewages">' +
                    '<div class="input-group-addon">$</div>' +
                    '<input type="text" value.bind="userData.spouse.wages[' + count + ']" class="form-control" id="inlineFormInputGroup" placeholder="0">' +
                    '</div>');
                count += 1;
            }
        }

        $('#spousewageHist').show();
        getWages(this.userData.spouse);
    }

    completeWages() {
        function getWages(person) {
            var salary = person.salary;
            var yearOfBirth = person.yearOfBirth;
            var currentYear = person.currentYear;
            var ageFrom18 = parseInt(yearOfBirth) + 18;

            $('input').each(function() {
                var count = 0;
                person.wages[count] = $(this).val();
                count += 1;
            });
        }

        getWages(this.userData.spouse);
    }

    attached() {
        $('#spousewageHist').hide();
    }
}