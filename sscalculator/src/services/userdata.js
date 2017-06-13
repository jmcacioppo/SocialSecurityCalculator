import {singleton} from 'aurelia-framework';

@singleton()
export class UserData {
    constructor() {
        // Personal Info
        this.firstName = "";
        this.gender = "";
        this.dateOfBirth = "";
        this.employmentStatus = "";
        this.salary = 0;
        this.maritalStatus = "";
        this.ageOfDependent = "";
    }
}