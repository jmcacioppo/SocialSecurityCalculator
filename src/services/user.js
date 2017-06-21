export class User {
     constructor() {
        // Social Security Values
        this.ssBase = [];
        this.ssBaseAdj = [];
        this.pia = 0;
        this.survivorpia = 0;

        this.earlyBenefits = [];
        this.FRABenefits = [];
        this.userSelectedBenefits = [];
        this.lateBenefits = [];
       
        // Personal Info
        this.name = "";
        this.gender = "";
        this.dateOfBirth = "";

        // Age Info
        this.age = 0;
        this.ageFrom18 = 0;
        this.yearOfBirth = 0;
        this.monthOfBirth = 0;
        this.currentYear = 0;
        this.yearOfPassing = 0;
        this.yearFRA = 0;
        this.monthFRA = 0;

        // Employment and Salary Info
        this.employmentStatus = "";
        this.isEmployed = false;
        this.salary = 0;
        this.projectedSal = [];
        this.inflationAdjusted = [];
        this.topThirtyFive = [];
        this.wages = [];

        // Marital Status Info
        this.maritalStatus = "";
        this.isMarried = false;
        this.isDivorced = false;
        this.divorceCheck = false;
        this.isSurvivor = false;

        // Dependent Info
        this.numOfDeps = 0;
        this.ageOfDeps = [];
        this.showAgeOfDeps = false;
        this.hasDeps = false;

        // Retirement Info
        this.retirementIncome = 0;
        this.retirementAge = 65;
        this.lifeExpectancy = 91;
        this.retirementYear = 0;

        //EXCEPTIONS
        //Military Info
        this.militaryService = false;
        this.beganService = "";
        this.endService = "";

        this.beginMonth = 0;
        this.beginYear = 0;
        this.endMonth = 0;
        this.endYear = 0;

        //Railroad Info
        this.workedOnARailroad = false;
        this.yearsStartedOnRailroad = 0;
        this.yearsEndedOnRailroad = 0;
        this.yearsOnRailroad = [];

        this.recievePension = false;
        this.pensionAmount = 0;

        this.citizenship = "";

        this.dual26Countries = false;
        this.isDual26Countries = false;
        this.dualCanadaItaly = true;

        this.notCitizen = false;
        this.checkIntrumentality = false;
        this.checkConditions = false;
        
        //Wage History
        this.showWages = false;

        //Benefits
        this.eligibleSS = false;
        this.cola = 2.5;
        this.wep = false;
        this.yrsOfSubEarnings = 0;

        //Results
        this.showChart = false;
     }

}