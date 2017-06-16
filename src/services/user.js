export class User {
     constructor() {
        // Social Security Values
        this.baseSS = 0;
       
        // Personal Info
        this.name = "";
        this.gender = "";
        this.dateOfBirth = "";
        this.age = 0;
        this.employmentStatus = "";

        this.salary = 0;
        this.wages = [];

        this.maritalStatus = "";
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