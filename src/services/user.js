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
        this.ageFrom18 = 0;
        this.yearOfBirth = 0;
        this.currentYear = 0;

        this.employmentStatus = "";
        this.isEmployed = false;
        this.salary = 0;
        this.projectedSal = [];
        this.inflationAdjusted = [];
        this.topThirtyFive = [];
        this.wages = [];

        this.maritalStatus = "";
        this.isMarried = false;
        this.isDivorced = false;
        this.divorceCheck = false;

        this.numOfDeps = 0;
        this.ageOfDeps = [];
        this.showAgeOfDeps = false;
        this.retirementIncome = 0;
        this.retirementAge = 65;
        this.lifeExpectancy = 91;

        //Wage History
        this.showWages = false;

        //Benefits
        this.eligibleSS = false;
        this.cola = 2.5;
        this.widowerIncome = 0;
        this.wep = false;
        this.yrsOfSubEarnings = 0;

        //Results
     }

}