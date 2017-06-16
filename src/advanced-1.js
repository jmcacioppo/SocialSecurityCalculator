//import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import 'bootstrap'
import {Data} from './data';
import {Router} from 'aurelia-router';

@inject(Data, Router)
export class Advanced1 {
    constructor(data, router) {
        this.data = data;
        this.router=router;
    }

    //This method handles routing to the next page.
    next(firstName, lastName, dateOfBirth, numChildren, benefitAge) {
    // if(firstName==undefined || lastName==undefined || dateOfBirth==undefined || numChildren==undefined || benefitAge==undefined){
    //   alert("Missing Inputs");
    //   return;
    // }
        document.getElementById("advanced1").className="active";
        document.getElementById("advanced2").className="active";
        this.router.navigate('#/advanced-2');

    }

  submit(firstName, lastName, dateOfBirth, numChildren, benefitAge) {
    this.data.firstName = firstName;
    this.data.lastName = lastName;
    this.data.dateOfBirth = dateOfBirth;
    this.data.numChildren = numChildren;
    this.data.benefitAge = benefitAge;
    console.log(this.data.numChildren);
    console.log(this.data.benefitAge);
  }
  
  yesnoCheck(that) {
      console.log(that)
    if (that == "married" || that == "widowed") {
        document.getElementById("ifYes").style.display = "block";
    } else {
        document.getElementById("ifYes").style.display = "none";
    }
    return true;
    }
}



