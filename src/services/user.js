export class User {
     constructor() {
        // Social Security Values
        this.ssBase = 0;
        this.pia = 0;
       
        // Personal Info
        this.name = "";
        this.gender = "";
        this.dateOfBirth = "";
        this.age = 0;
        this.yearOfBirth = 0;
        this.currentYear = 0;
        this.employmentStatus = "";

        this.salary = 0;
        this.wages = [];

        this.maritalStatus = "";
        this.divorceCheck = false;

        this.numOfDependents = 0;
        this.ageOfDependent = [];
        this.retirementIncome = 0;
        this.retirementAge = 65;
        this.lifeExpectancy = 91;

        //Benefits
        this.eligibleSS = false;
        this.cola = 2.5;
        this.widowerIncome = 0;
        this.wep = false;
        this.yrsOfSubEarnings = 0;

        //Results
     }

}