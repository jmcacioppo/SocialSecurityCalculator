import {inject} from 'aurelia-framework';
import {UserData} from '../services/userdata'

@inject(UserData)
export class personalinfo {
    constructor(userData) {
        this.message = "Personal Information";
        this.userData = userData;
    }

    print() {
        console.log(this.userData.firstName);
    }
}