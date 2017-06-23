define('app',['exports', 'bootstrap'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);

      this.message = 'Social Security Calculator!';
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = "Social Security Calculator";
      config.map([{ route: ['', 'personalinfo'], moduleId: 'aboutyou/personalinfo',
        name: 'personalinfo', title: 'Personal Info', nav: true }, { route: 'wagehistory', moduleId: 'aboutyou/wagehistory',
        name: 'wagehistory', title: 'Wage History', nav: false }, { route: 'spousewagehistory', moduleId: 'aboutyou/spousewagehistory',
        name: 'spousewagehistory', title: 'Spouse Wage History', nav: false }, { route: 'deceasedwagehistory', moduleId: 'aboutyou/deceasedwagehistory',
        name: 'deceasedwagehistory', title: 'Deceased Wage History', nav: false }, { route: 'exceptions', moduleId: 'exceptions/exceptions',
        name: 'exceptions', title: 'Exceptions', nav: true }, { route: 'benefits', moduleId: 'benefits/benefits',
        name: 'benefits', title: 'Benefits', nav: true }, { route: 'results', moduleId: 'results/results',
        name: 'results', title: 'Results', nav: true }]);
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('aboutyou/deceasedwagehistory',['exports', 'jquery', 'moment', 'aurelia-framework', '../services/userdata', 'aurelia-router', 'src/services/constants.js'], function (exports, _jquery, _moment, _aureliaFramework, _userdata, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.deceasedwagehistory = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var deceasedwagehistory = exports.deceasedwagehistory = (_dec = (0, _aureliaFramework.inject)(_userdata.UserData, _aureliaRouter.Router), _dec(_class = function () {
        function deceasedwagehistory(userData, router) {
            _classCallCheck(this, deceasedwagehistory);

            this.userData = userData;
            this.router = router;
        }

        deceasedwagehistory.prototype.completeWages = function completeWages() {
            this.userData.deceased.showWages = true;
            this.userData.deceased.salary = this.userData.deceased.wages[this.userData.deceased.ageFrom18];
            this.router.navigate('#/personalinfo');
        };

        deceasedwagehistory.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        return deceasedwagehistory;
    }()) || _class);
});
define('aboutyou/personalinfo',['exports', 'jquery', 'bootstrap-toggle', 'ion-rangeslider', 'moment', 'src/services/constants.js', 'aurelia-framework', '../services/userdata', 'aurelia-router', 'jquery-ui-dist'], function (exports, _jquery, _bootstrapToggle, _ionRangeslider, _moment, _constants, _aureliaFramework, _userdata, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.personalinfo = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    var bootstrapToggle = _interopRequireWildcard(_bootstrapToggle);

    var ionRangeSlider = _interopRequireWildcard(_ionRangeslider);

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var personalinfo = exports.personalinfo = (_dec = (0, _aureliaFramework.inject)(_userdata.UserData, _aureliaRouter.Router), _dec(_class = function () {
        function personalinfo(userData, router) {
            _classCallCheck(this, personalinfo);

            this.userData = userData;
            this.router = router;
        }

        personalinfo.prototype.dob = function dob(value) {
            var dob = value;
            var date = (0, _moment2.default)(dob, 'M/D/YYYY');
            var yearOfBirth = date.format('YYYY');
            var monthOfBirth = date.month();
            var currentYear = (0, _moment2.default)().format('YYYY');

            if (!(dob.indexOf(date.format('MM/DD/YYYY')) >= 0 || dob.indexOf(date.format('M/DD/YYYY')) >= 0 || dob.indexOf(date.format('MM/D/YYYY')) >= 0 || dob.indexOf(date.format('M/D/YYYY')) >= 0) || !date.isValid() || yearOfBirth > currentYear) {
                alert('Invalid Date of Birth');
                return;
            } else {
                this.userData.client.age = (0, _moment2.default)().diff(dob, 'years');
                this.userData.client.yearOfBirth = parseInt(yearOfBirth);
                this.userData.client.monthOfBirth = parseInt(monthOfBirth);
                this.userData.client.currentYear = parseInt(currentYear);
                this.userData.client.ageFrom18 = this.userData.client.age - 18;
                this.userData.client.retirementyear = this.userData.client.retirementAge + this.userData.client.yearOfBirth;

                if (yearOfBirth >= 1900 && yearOfBirth <= 1937) {
                    this.userData.client.yearFRA = 65;
                    this.userData.client.monthFRA = 0;
                } else if (yearOfBirth == 1938) {
                    this.userData.client.yearFRA = 65;
                    this.userData.client.monthFRA = 2;
                } else if (yearOfBirth == 1939) {
                    this.userData.client.yearFRA = 65;
                    this.userData.client.monthFRA = 4;
                } else if (yearOfBirth == 1940) {
                    this.userData.client.yearFRA = 65;
                    this.userData.client.monthFRA = 6;
                } else if (yearOfBirth == 1941) {
                    this.userData.client.yearFRA = 65;
                    this.userData.client.monthFRA = 8;
                } else if (yearOfBirth == 1942) {
                    this.userData.client.yearFRA = 65;
                    this.userData.client.monthFRA = 10;
                } else if (yearOfBirth >= 1943 && yearOfBirth <= 1954) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 0;
                } else if (yearOfBirth == 1955) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 2;
                } else if (yearOfBirth == 1956) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 4;
                } else if (yearOfBirth == 1957) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 6;
                } else if (yearOfBirth == 1958) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 8;
                } else if (yearOfBirth == 1959) {
                    this.userData.client.yearFRA = 66;
                    this.userData.client.monthFRA = 10;
                } else {
                    this.userData.client.yearFRA = 67;
                    this.userData.client.monthFRA = 0;
                }

                if (this.userData.client.isSurvivor) {
                    if (this.userData.client.yearOfBirth >= 1945 && this.userData.client.yearOfBirth <= 1956) {
                        this.userData.client.yearFRA = 66;
                        this.userData.client.monthFRA = 0;
                    } else if (this.userData.client.yearOfBirth == 1957) {
                        this.userData.client.yearFRA = 66;
                        this.userData.client.monthFRA = 2;
                    } else if (this.userData.client.yearOfBirth == 1958) {
                        this.userData.client.yearFRA = 66;
                        this.userData.client.monthFRA = 4;
                    } else if (this.userData.client.yearOfBirth == 1959) {
                        this.userData.client.yearFRA = 66;
                        this.userData.client.monthFRA = 6;
                    } else if (this.userData.client.yearOfBirth == 1960) {
                        this.userData.client.yearFRA = 66;
                        this.userData.client.monthFRA = 8;
                    } else if (this.userData.client.yearOfBirth == 1961) {
                        this.userData.client.yearFRA = 66;
                        this.userData.client.monthFRA = 10;
                    } else if (this.userData.client.yearOfBirth >= 1962 && this.userData.client.yearOfBirth <= 2000) {
                        this.userData.client.yearFRA = 67;
                        this.userData.client.monthFRA = 0;
                    }
                }
            }
        };

        personalinfo.prototype.spousedob = function spousedob(value) {
            var dob = value;
            var date = (0, _moment2.default)(dob, 'M/D/YYYY');
            var yearOfBirth = date.format('YYYY');
            var monthOfBirth = date.month();
            var currentYear = (0, _moment2.default)().format('YYYY');

            if (!(dob.indexOf(date.format('MM/DD/YYYY')) >= 0 || dob.indexOf(date.format('M/DD/YYYY')) >= 0 || dob.indexOf(date.format('MM/D/YYYY')) >= 0 || dob.indexOf(date.format('M/D/YYYY')) >= 0) || !date.isValid() || yearOfBirth > currentYear) {
                alert('Invalid Date of Birth');
                return;
            } else {
                this.userData.spouse.age = (0, _moment2.default)().diff(dob, 'years');
                this.userData.spouse.yearOfBirth = parseInt(yearOfBirth);
                this.userData.spouse.monthOfBirth = parseInt(monthOfBirth);
                this.userData.spouse.currentYear = parseInt(currentYear);
                this.userData.spouse.ageFrom18 = this.userData.spouse.age - 18;
                this.userData.spouse.retirementyear = this.userData.spouse.retirementAge + this.userData.spouse.yearOfBirth;

                if (yearOfBirth >= 1900 && yearOfBirth <= 1937) {
                    this.userData.spouse.yearFRA = 65;
                    this.userData.spouse.monthFRA = 0;
                } else if (yearOfBirth == 1938) {
                    this.userData.spouse.yearFRA = 65;
                    this.userData.spouse.monthFRA = 2;
                } else if (yearOfBirth == 1939) {
                    this.userData.spouse.yearFRA = 65;
                    this.userData.spouse.monthFRA = 4;
                } else if (yearOfBirth == 1940) {
                    this.userData.spouse.yearFRA = 65;
                    this.userData.spouse.monthFRA = 6;
                } else if (yearOfBirth == 1941) {
                    this.userData.spouse.yearFRA = 65;
                    this.userData.spouse.monthFRA = 8;
                } else if (yearOfBirth == 1942) {
                    this.userData.spouse.yearFRA = 65;
                    this.userData.spouse.monthFRA = 10;
                } else if (yearOfBirth >= 1943 && yearOfBirth <= 1954) {
                    this.userData.spouse.yearFRA = 66;
                    this.userData.spouse.monthFRA = 0;
                } else if (yearOfBirth == 1955) {
                    this.userData.spouse.yearFRA = 66;
                    this.userData.spouse.monthFRA = 2;
                } else if (yearOfBirth == 1956) {
                    this.userData.spouse.yearFRA = 66;
                    this.userData.spouse.monthFRA = 4;
                } else if (yearOfBirth == 1957) {
                    this.userData.spouse.yearFRA = 66;
                    this.userData.spouse.monthFRA = 6;
                } else if (yearOfBirth == 1958) {
                    this.userData.spouse.yearFRA = 66;
                    this.userData.spouse.monthFRA = 8;
                } else if (yearOfBirth == 1959) {
                    this.userData.spouse.yearFRA = 66;
                    this.userData.spouse.monthFRA = 10;
                } else {
                    this.userData.spouse.yearFRA = 67;
                    this.userData.spouse.monthFRA = 0;
                }
            }
        };

        personalinfo.prototype.deceaseddob = function deceaseddob(value) {
            var dob = value;
            var date = (0, _moment2.default)(dob, 'M/D/YYYY');
            var yearOfBirth = date.format('YYYY');
            var monthOfBirth = date.month();
            var currentYear = (0, _moment2.default)().format('YYYY');
            var yearOfPassing = parseInt(this.userData.deceased.yearOfPassing);
            var yearFrom18toPassing = yearOfPassing - yearOfBirth - 18 + 1;

            if (!(dob.indexOf(date.format('MM/DD/YYYY')) >= 0 || dob.indexOf(date.format('M/DD/YYYY')) >= 0 || dob.indexOf(date.format('MM/D/YYYY')) >= 0 || dob.indexOf(date.format('M/D/YYYY')) >= 0) || !date.isValid() || yearOfBirth > currentYear || this.userData.deceased.yearOfPassing < yearOfBirth || this.userData.deceased.yearOfPassing - yearOfBirth < 18) {
                alert('Invalid Date of Birth');
                return;
            } else {
                this.userData.deceased.age = this.userData.deceased.yearOfPassing - parseInt(yearOfBirth);
                this.userData.deceased.yearOfBirth = parseInt(yearOfBirth);
                this.userData.deceased.monthOfBirth = parseInt(monthOfBirth);
                this.userData.deceased.ageFrom18 = this.userData.deceased.age - 18;
                this.userData.deceased.yearFrom18toPassing = yearFrom18toPassing;
            }
        };

        personalinfo.prototype.checkPassingYear = function checkPassingYear(value) {
            var currentYear = (0, _moment2.default)().format('YYYY');
            if (value > currentYear || value < 1900) {
                alert('Enter a valid Year of Passing');
                this.userData.deceased.isPassed = false;
            } else this.userData.deceased.isPassed = true;
        };

        personalinfo.prototype.checkMarried = function checkMarried(value) {
            if (value == "Married") {
                this.userData.client.isMarried = true;
                this.userData.client.isDivorced = false;
                this.userData.client.isSurvivor = false;
                this.userData.client.divorceCheck = false;
            } else if (value == "Divorced") {
                this.userData.client.isDivorced = true;
                this.userData.client.isMarried = false;
                this.userData.client.isSurvivor = false;
            } else if (value == "Widowed") {
                this.userData.client.isSurvivor = true;
                this.userData.client.isMarried = false;
                this.userData.client.isDivorced = false;
                this.userData.client.divorceCheck = false;

                if (this.userData.client.dateOfBirth) {
                    if (this.userData.client.yearOfBirth >= 1945 && this.userData.client.yearOfBirth <= 1956) {
                        this.userData.client.yearFRA = 66;
                        this.userData.client.monthFRA = 0;
                    } else if (this.userData.client.yearOfBirth == 1957) {
                        this.userData.client.yearFRA = 66;
                        this.userData.client.monthFRA = 2;
                    } else if (this.userData.client.yearOfBirth == 1958) {
                        this.userData.client.yearFRA = 66;
                        this.userData.client.monthFRA = 4;
                    } else if (this.userData.client.yearOfBirth == 1959) {
                        this.userData.client.yearFRA = 66;
                        this.userData.client.monthFRA = 6;
                    } else if (this.userData.client.yearOfBirth == 1960) {
                        this.userData.client.yearFRA = 66;
                        this.userData.client.monthFRA = 8;
                    } else if (this.userData.client.yearOfBirth == 1961) {
                        this.userData.client.yearFRA = 66;
                        this.userData.client.monthFRA = 10;
                    } else if (this.userData.client.yearOfBirth >= 1962 && this.userData.client.yearOfBirth <= 2000) {
                        this.userData.client.yearFRA = 67;
                        this.userData.client.monthFRA = 0;
                    }
                }
            } else {
                this.userData.client.isMarried = false;
                this.userData.client.isDivorced = false;
                this.userData.client.isSurvivor = false;
                this.userData.client.divorceCheck = false;
            }
        };

        personalinfo.prototype.checkEmployment = function checkEmployment(value) {
            if (value == "Employed" || value == "Business Owner") {
                this.userData.client.isEmployed = true;
                this.userData.client.isRetired = false;
                this.userData.client.notCurrentlyEmployed = false;
            } else if (value == "Retired") {
                this.userData.client.isRetired = true;
                this.userData.client.isEmployed = false;
                this.userData.client.notCurrentlyEmployed = false;
            } else if (value == "Not Currently Employed") {
                this.userData.client.notCurrentlyEmployed = true;
                this.userData.client.isEmployed = false;
                this.userData.client.isRetired = false;
            } else {
                this.userData.client.isEmployed = false;
                this.userData.client.isRetired = false;
            }
        };

        personalinfo.prototype.checkEmploymentSpouse = function checkEmploymentSpouse(value) {
            if (value == "Employed" || value == "Business Owner") {
                this.userData.spouse.isEmployed = true;
                this.userData.spouse.isRetired = false;
                this.userData.spouse.notCurrentlyEmployed = false;
            } else if (value == "Retired") {
                this.userData.spouse.isRetired = true;
                this.userData.spouse.isEmployed = false;
                this.userData.spouse.notCurrentlyEmployed = false;
            } else if (value == "Not Currently Employed") {
                this.userData.spouse.notCurrentlyEmployed = true;
                this.userData.spouse.isEmployed = false;
                this.userData.spouse.isRetired = false;
            } else {
                this.userData.spouse.isEmployed = false;
                this.userData.spouse.isRetired = false;
            }
        };

        personalinfo.prototype.checkNumOfDeps = function checkNumOfDeps(value) {
            if (value > 0) this.userData.client.showAgeOfDeps = true;else this.userData.client.showAgeOfDeps = false;
            console.log(value);
            this.userData.client.numOfDeps = parseInt(value);
        };

        personalinfo.prototype.addDep = function addDep() {
            this.userData.client.numOfDeps++;
            this.userData.client.hasDeps = true;
        };

        personalinfo.prototype.removeDep = function removeDep() {
            this.userData.client.numOfDeps--;
            if (this.userData.client.numOfDeps == 0) {
                this.userData.client.hasDeps = false;
            }
        };

        personalinfo.prototype.wagehistory = function wagehistory() {
            if (this.userData.client.age == 0 || this.userData.client.age < 18) alert('Enter valid Date of Birth');else this.router.navigate('#/wagehistory');
        };

        personalinfo.prototype.spousewagehistory = function spousewagehistory() {
            if (this.userData.spouse.age == 0 || this.userData.spouse.age < 18) alert('Enter valid Date of Birth');else this.router.navigate('#/spousewagehistory');
        };

        personalinfo.prototype.deceasedwagehistory = function deceasedwagehistory() {
            if (this.userData.deceased.age == 0 || this.userData.deceased.age < 18) alert('Enter valid Date of Birth');else this.router.navigate('#/deceasedwagehistory');
        };

        personalinfo.prototype.divorce = function divorce() {
            this.userData.client.divorceCheck = !this.userData.client.divorceCheck;
        };

        personalinfo.prototype.attached = function attached() {
            var _this = this;

            (0, _jquery2.default)("#slider").ionRangeSlider({
                grid: true,
                type: "double",
                min: 0,
                max: 100,
                from: 65,
                to: 91,
                step: 1,
                onFinish: function onFinish(data) {
                    _this.userData.client.retirementAge = data.from;
                    _this.userData.client.lifeExpectancy = data.to;
                    _this.userData.client.retirementyear = _this.userData.client.retirementAge + _this.userData.client.yearOfBirth;
                }
            });

            (0, _jquery2.default)("#sliderSpouse").ionRangeSlider({
                grid: true,
                type: "double",
                min: 0,
                max: 100,
                from: 65,
                to: 91,
                step: 1,
                onFinish: function onFinish(data) {
                    _this.userData.spouse.retirementAge = data.from;
                    _this.userData.spouse.lifeExpectancy = data.to;
                    _this.userData.spouse.retirementyear = _this.userData.spouse.retirementAge + _this.userData.spouse.yearOfBirth;
                }
            });

            (0, _jquery2.default)('#dob').tooltip({
                content: "You must be older than 18 to use this application."
            });

            (0, _jquery2.default)('#salary').tooltip({
                content: "We estimate your previous and future wages. Input them manually for better accuracy here."
            });

            (0, _jquery2.default)('#retiredSalary').tooltip({
                content: "Input your wages before retirement here."
            });

            (0, _jquery2.default)('#notCurrentlyEmployedSalary').tooltip({
                content: "Input any previous or future wages here."
            });

            (0, _jquery2.default)('#retirementIncome').tooltip({
                content: "Input the total amount of income you will receive after you retire."
            });

            (0, _jquery2.default)('#retirementAge').tooltip({
                content: "Input the age you would like to retire and the age you expect to live until."
            });

            (0, _jquery2.default)('#spousedob').tooltip({
                content: "You must be older than 18 to use this application."
            });

            (0, _jquery2.default)('#spousesalary').tooltip({
                content: "We estimate your previous and future wages. Input them manually for better accuracy here."
            });

            (0, _jquery2.default)('#spouseretiredSalary').tooltip({
                content: "Input your wages before retirement here."
            });

            (0, _jquery2.default)('#spousenotCurrentlyEmployedSalary').tooltip({
                content: "Input any previous or future wages here."
            });

            (0, _jquery2.default)('#spouseretirementIncome').tooltip({
                content: "Input the total amount of income you will receive after you retire."
            });

            (0, _jquery2.default)('#spouseretirementAge').tooltip({
                content: "Input the age you would like to retire and the age you expect to live until."
            });

            (0, _jquery2.default)('#deceasedsalary').tooltip({
                content: "We estimate previous and future wages. Input them manually for better accuracy here."
            });

            (0, _jquery2.default)('#deceaseddob').tooltip({
                content: "Deceased must be older than 18 for you to recieve survivor benefits."
            });
        };

        personalinfo.prototype.next = function next() {
            function checkFields(person, clientmaritalStatus) {
                if (!person.name) alert("Input a name");else if (!person.gender || person.gender == "Please Select") alert("Input a gender");else if (!person.age || person.age < 18 || person.yearOfBirth < 1938) alert("Input a valid date of birth");else if (!person.employmentStatus || person.employmentStatus == "Please Select") alert("Input your employment status");else if ((person.employmentStatus == "Employed" || person.employmentStatus == "Business Owner") && (person.salary == 0 || isNaN(person.salary))) {
                    alert('Input a salary');
                } else if (!clientmaritalStatus || clientmaritalStatus == "Please Select") {
                    alert("Input your marital status");
                } else return true;
            }

            function checkDeceasedFields(person) {
                if (!person.age || person.age < 18) alert("Input a valid date of birth");else return true;
            }

            var maritalStatus = this.userData.client.maritalStatus;

            if (checkFields(this.userData.client, maritalStatus)) {
                if (maritalStatus == "Married") {
                    if (checkFields(this.userData.spouse, maritalStatus)) this.router.navigate('#/exceptions');
                } else if (maritalStatus == "Widowed") {
                    if (checkDeceasedFields(this.userData.deceased)) this.router.navigate('#/exceptions');
                } else this.router.navigate('#/exceptions');
            }
        };

        return personalinfo;
    }()) || _class);
});
define('aboutyou/spousewagehistory',['exports', 'jquery', 'moment', 'aurelia-framework', '../services/userdata', 'aurelia-router', 'src/services/constants.js'], function (exports, _jquery, _moment, _aureliaFramework, _userdata, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.spousewagehistory = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var spousewagehistory = exports.spousewagehistory = (_dec = (0, _aureliaFramework.inject)(_userdata.UserData, _aureliaRouter.Router), _dec(_class = function () {
        function spousewagehistory(userData, router) {
            _classCallCheck(this, spousewagehistory);

            this.userData = userData;
            this.router = router;
        }

        spousewagehistory.prototype.completeWages = function completeWages() {
            this.userData.spouse.showWages = true;
            this.userData.spouse.salary = this.userData.spouse.wages[this.userData.spouse.ageFrom18];
            this.router.navigate('#/personalinfo');
        };

        spousewagehistory.prototype.futureWages = function futureWages() {
            if (this.userData.spouse.employmentStatus == "Retired" || this.userData.spouse.age > this.userData.spouse.yearFRA) {
                alert("You have exceeded your retirement age or you are retired. If you " + "still receive income, input it in the 'Retirement Income' field on the Personal Info page.");
            } else this.userData.spouse.futureWages = true;
        };

        spousewagehistory.prototype.noFutureWages = function noFutureWages() {
            this.userData.spouse.futureWages = false;
        };

        spousewagehistory.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        return spousewagehistory;
    }()) || _class);
});
define('aboutyou/wagehistory',['exports', 'jquery', 'moment', 'aurelia-framework', '../services/userdata', 'aurelia-router', 'src/services/constants.js'], function (exports, _jquery, _moment, _aureliaFramework, _userdata, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.wagehistory = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var wagehistory = exports.wagehistory = (_dec = (0, _aureliaFramework.inject)(_userdata.UserData, _aureliaRouter.Router), _dec(_class = function () {
        function wagehistory(userData, router) {
            _classCallCheck(this, wagehistory);

            this.userData = userData;
            this.router = router;
        }

        wagehistory.prototype.completeWages = function completeWages() {
            this.userData.client.showWages = true;
            this.userData.client.salary = this.userData.client.wages[this.userData.client.ageFrom18];
            this.router.navigate('#/personalinfo');
        };

        wagehistory.prototype.futureWages = function futureWages() {
            if (this.userData.client.employmentStatus == "Retired" || this.userData.client.age > this.userData.client.yearFRA) {
                alert("You have exceeded your retirement age or you are retired. If you " + "still receive income, input it in the 'Retirement Income' field on the Personal Info page.");
            } else this.userData.client.futureWages = true;
        };

        wagehistory.prototype.noFutureWages = function noFutureWages() {
            this.userData.client.futureWages = false;
        };

        wagehistory.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        return wagehistory;
    }()) || _class);
});
define('benefits/benefits',['exports', 'jquery', 'bootstrap-toggle', 'ion-rangeslider', 'aurelia-framework', '../services/userdata', 'aurelia-router', 'src/services/constants.js', 'jquery-ui-dist'], function (exports, _jquery, _bootstrapToggle, _ionRangeslider, _aureliaFramework, _userdata, _aureliaRouter, _constants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.benefits = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    var bootstrapToggle = _interopRequireWildcard(_bootstrapToggle);

    var ionRangeSlider = _interopRequireWildcard(_ionRangeslider);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var benefits = exports.benefits = (_dec = (0, _aureliaFramework.inject)(_userdata.UserData, _aureliaRouter.Router), _dec(_class = function () {
        function benefits(userData, router) {
            _classCallCheck(this, benefits);

            this.userData = userData;
            this.router = router;
        }

        benefits.prototype.benefitsCalc = function benefitsCalc() {
            function calculateSSBase(person, retirementAge) {
                var age = person.age;
                var yearOfBirth = person.yearOfBirth;
                var pia = person.pia;
                var yrsOfSubearnings = person.yrsOfSubearnings;
                var ssBase, consttier1, consttier2;

                var ageFrom62 = 62 - age;
                consttier1 = _constants.bendtier1[8 + ageFrom62];
                consttier2 = _constants.bendtier2[8 + ageFrom62];

                var tier1, tier2, tier3;
                var sum = consttier1 + consttier2;
                if (person.wep) {
                    if (pia > consttier1) {
                        switch (yrsOfSubearnings) {
                            case 29:
                                tier1 = consttier1 * _constants.subEarningsPerc[1];break;
                            case 28:
                                tier1 = consttier1 * _constants.subEarningsPerc[2];break;
                            case 27:
                                tier1 = consttier1 * _constants.subEarningsPerc[3];break;
                            case 26:
                                tier1 = consttier1 * _constants.subEarningsPerc[4];break;
                            case 25:
                                tier1 = consttier1 * _constants.subEarningsPerc[5];break;
                            case 24:
                                tier1 = consttier1 * _constants.subEarningsPerc[6];break;
                            case 23:
                                tier1 = consttier1 * _constants.subEarningsPerc[7];break;
                            case 22:
                                tier1 = consttier1 * _constants.subEarningsPerc[8];break;
                            case 21:
                                tier1 = consttier1 * _constants.subEarningsPerc[9];break;
                            default:
                                if (yrsOfSubearnings >= 30) tier1 = consttier1 * _constants.subEarningsPerc[0];else tier1 = consttier1 * _constants.subEarningsPerc[10];
                        }
                    } else {
                        switch (yrsOfSubearnings) {
                            case 29:
                                tier1 = pia * _constants.subEarningsPerc[1];break;
                            case 28:
                                tier1 = pia * _constants.subEarningsPerc[2];break;
                            case 27:
                                tier1 = pia * _constants.subEarningsPerc[3];break;
                            case 26:
                                tier1 = pia * _constants.subEarningsPerc[4];break;
                            case 25:
                                tier1 = pia * _constants.subEarningsPerc[5];break;
                            case 24:
                                tier1 = pia * _constants.subEarningsPerc[6];break;
                            case 23:
                                tier1 = pia * _constants.subEarningsPerc[7];break;
                            case 22:
                                tier1 = pia * _constants.subEarningsPerc[8];break;
                            case 21:
                                tier1 = pia * _constants.subEarningsPerc[9];break;
                            default:
                                if (yrsOfSubearnings >= 30) tier1 = pia * _constants.subEarningsPerc[0];else tier1 = pia * _constants.subEarningsPerc[10];
                        }
                    }
                } else {
                    if (pia > consttier1) tier1 = consttier1 * _constants.tier1perc;else tier1 = pia * _constants.tier1perc;
                }

                if (pia > sum) {
                    tier2 = consttier2 * _constants.tier2perc;
                } else tier2 = pia * _constants.tier2perc;

                if (pia > sum) {
                    tier3 = (pia - sum) * _constants.tier3perc;
                } else tier3 = 0;

                var sumOfTiers = tier1 + tier2 + tier3;

                switch (yearOfBirth) {
                    case 1955:
                        switch (retirementAge) {
                            case 62:
                                sumOfTiers = sumOfTiers * _constants.EL1955[0];break;
                            case 63:
                                sumOfTiers = sumOfTiers * _constants.EL1955[1];break;
                            case 64:
                                sumOfTiers = sumOfTiers * _constants.EL1955[2];break;
                            case 65:
                                sumOfTiers = sumOfTiers * _constants.EL1955[3];break;
                            case 66:
                                sumOfTiers = sumOfTiers * _constants.EL1955[4];break;
                            case 67:
                                sumOfTiers = sumOfTiers * _constants.EL1955[5];break;
                            case 68:
                                sumOfTiers = sumOfTiers * _constants.EL1955[6];break;
                            case 69:
                                sumOfTiers = sumOfTiers * _constants.EL1955[7];break;
                            case 70:
                                sumOfTiers = sumOfTiers * _constants.EL1955[8];break;
                        }
                    case 1956:
                        switch (retirementAge) {
                            case 62:
                                sumOfTiers = sumOfTiers * _constants.EL1956[0];break;
                            case 63:
                                sumOfTiers = sumOfTiers * _constants.EL1956[1];break;
                            case 64:
                                sumOfTiers = sumOfTiers * _constants.EL1956[2];break;
                            case 65:
                                sumOfTiers = sumOfTiers * _constants.EL1956[3];break;
                            case 66:
                                sumOfTiers = sumOfTiers * _constants.EL1956[4];break;
                            case 67:
                                sumOfTiers = sumOfTiers * _constants.EL1956[5];break;
                            case 68:
                                sumOfTiers = sumOfTiers * _constants.EL1956[6];break;
                            case 69:
                                sumOfTiers = sumOfTiers * _constants.EL1956[7];break;
                            case 70:
                                sumOfTiers = sumOfTiers * _constants.EL1956[8];break;
                        }
                    case 1957:
                        switch (retirementAge) {
                            case 62:
                                sumOfTiers = sumOfTiers * _constants.EL1957[0];break;
                            case 63:
                                sumOfTiers = sumOfTiers * _constants.EL1957[1];break;
                            case 64:
                                sumOfTiers = sumOfTiers * _constants.EL1957[2];break;
                            case 65:
                                sumOfTiers = sumOfTiers * _constants.EL1957[3];break;
                            case 66:
                                sumOfTiers = sumOfTiers * _constants.EL1957[4];break;
                            case 67:
                                sumOfTiers = sumOfTiers * _constants.EL1957[5];break;
                            case 68:
                                sumOfTiers = sumOfTiers * _constants.EL1957[6];break;
                            case 69:
                                sumOfTiers = sumOfTiers * _constants.EL1957[7];break;
                            case 70:
                                sumOfTiers = sumOfTiers * _constants.EL1957[8];break;
                        }
                    case 1958:
                        switch (retirementAge) {
                            case 62:
                                sumOfTiers = sumOfTiers * _constants.EL1958[0];break;
                            case 63:
                                sumOfTiers = sumOfTiers * _constants.EL1958[1];break;
                            case 64:
                                sumOfTiers = sumOfTiers * _constants.EL1958[2];break;
                            case 65:
                                sumOfTiers = sumOfTiers * _constants.EL1958[3];break;
                            case 66:
                                sumOfTiers = sumOfTiers * _constants.EL1958[4];break;
                            case 67:
                                sumOfTiers = sumOfTiers * _constants.EL1958[5];break;
                            case 68:
                                sumOfTiers = sumOfTiers * _constants.EL1958[6];break;
                            case 69:
                                sumOfTiers = sumOfTiers * _constants.EL1958[7];break;
                            case 70:
                                sumOfTiers = sumOfTiers * _constants.EL1958[8];break;
                        }
                    case 1959:
                        switch (retirementAge) {
                            case 62:
                                sumOfTiers = sumOfTiers * _constants.EL1959[0];break;
                            case 63:
                                sumOfTiers = sumOfTiers * _constants.EL1959[1];break;
                            case 64:
                                sumOfTiers = sumOfTiers * _constants.EL1959[2];break;
                            case 65:
                                sumOfTiers = sumOfTiers * _constants.EL1959[3];break;
                            case 66:
                                sumOfTiers = sumOfTiers * _constants.EL1959[4];break;
                            case 67:
                                sumOfTiers = sumOfTiers * _constants.EL1959[5];break;
                            case 68:
                                sumOfTiers = sumOfTiers * _constants.EL1959[6];break;
                            case 69:
                                sumOfTiers = sumOfTiers * _constants.EL1959[7];break;
                            case 70:
                                sumOfTiers = sumOfTiers * _constants.EL1959[8];break;
                        }
                    default:
                        if (yearOfBirth <= 1954) {
                            switch (retirementAge) {
                                case 62:
                                    sumOfTiers = sumOfTiers * _constants.EL1943plus[0];break;
                                case 63:
                                    sumOfTiers = sumOfTiers * _constants.EL1943plus[1];break;
                                case 64:
                                    sumOfTiers = sumOfTiers * _constants.EL1943plus[2];break;
                                case 65:
                                    sumOfTiers = sumOfTiers * _constants.EL1943plus[3];break;
                                case 66:
                                    sumOfTiers = sumOfTiers * _constants.EL1943plus[4];break;
                                case 67:
                                    sumOfTiers = sumOfTiers * _constants.EL1943plus[5];break;
                                case 68:
                                    sumOfTiers = sumOfTiers * _constants.EL1943plus[6];break;
                                case 69:
                                    sumOfTiers = sumOfTiers * _constants.EL1943plus[7];break;
                                case 70:
                                    sumOfTiers = sumOfTiers * _constants.EL1943plus[8];break;
                            }
                        } else {
                            switch (retirementAge) {
                                case 62:
                                    sumOfTiers = sumOfTiers * _constants.EL1960plus[0];break;
                                case 63:
                                    sumOfTiers = sumOfTiers * _constants.EL1960plus[1];break;
                                case 64:
                                    sumOfTiers = sumOfTiers * _constants.EL1960plus[2];break;
                                case 65:
                                    sumOfTiers = sumOfTiers * _constants.EL1960plus[3];break;
                                case 66:
                                    sumOfTiers = sumOfTiers * _constants.EL1960plus[4];break;
                                case 67:
                                    sumOfTiers = sumOfTiers * _constants.EL1960plus[5];break;
                                case 68:
                                    sumOfTiers = sumOfTiers * _constants.EL1960plus[6];break;
                                case 69:
                                    sumOfTiers = sumOfTiers * _constants.EL1960plus[7];break;
                                case 70:
                                    sumOfTiers = sumOfTiers * _constants.EL1960plus[8];break;
                            }
                        }
                }

                ssBase = sumOfTiers * 12;

                if (person.recievePension) {
                    var pension = parseFloat(person.pensionAmount) * 2 / 3;
                    pension = pension * 12;
                    ssBase = ssBase - pension;
                }

                person.ssBase.push(parseFloat(ssBase));
            }

            function spousalBenefit(client, spouse, retirementAge, i) {
                var spousalBenefit;
                var ssBaseClient = client.ssBase[i];
                var ssBaseSpouse = spouse.ssBase[i];
                var yearOfBirth = spouse.yearOfBirth;

                switch (yearOfBirth) {
                    case 1955:
                        switch (retirementAge) {
                            case 62:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1955[0];
                            case 63:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1955[1];
                            case 64:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1955[2];
                            case 65:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1955[3];
                            case 66:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1955[4];
                            case 67:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1955[5];
                            case 68:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1955[6];
                            case 69:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1955[7];
                            default:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1955[8];
                        }
                    case 1956:
                        switch (retirementAge) {
                            case 62:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1956[0];
                            case 63:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1956[1];
                            case 64:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1956[2];
                            case 65:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1956[3];
                            case 66:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1956[4];
                            case 67:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1956[5];
                            case 68:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1956[6];
                            case 69:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1956[7];
                            default:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1956[8];
                        }
                    case 1957:
                        switch (retirementAge) {
                            case 62:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1957[0];
                            case 63:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1957[1];
                            case 64:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1957[2];
                            case 65:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1957[3];
                            case 66:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1957[4];
                            case 67:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1957[5];
                            case 68:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1957[6];
                            case 69:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1957[7];
                            default:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1957[8];
                        }
                    case 1958:
                        switch (retirementAge) {
                            case 62:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1958[0];
                            case 63:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1958[1];
                            case 64:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1958[2];
                            case 65:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1958[3];
                            case 66:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1958[4];
                            case 67:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1958[5];
                            case 68:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1958[6];
                            case 69:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1958[7];
                            default:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1958[8];
                        }
                    case 1959:
                        switch (retirementAge) {
                            case 62:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1959[0];
                            case 63:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1959[1];
                            case 64:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1959[2];
                            case 65:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1959[3];
                            case 66:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1959[4];
                            case 67:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1959[5];
                            case 68:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1959[6];
                            case 69:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1959[7];
                            default:
                                spousalBenefit = ssBaseClient * _constants.spousalBenefits1959[8];
                        }
                    default:
                        if (yearOfBirth >= 1943 && yearOfBirth <= 1954) {
                            switch (retirementAge) {
                                case 62:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1943to1954[0];
                                case 63:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1943to1954[1];
                                case 64:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1943to1954[2];
                                case 65:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1943to1954[3];
                                case 66:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1943to1954[4];
                                case 67:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1943to1954[5];
                                case 68:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1943to1954[6];
                                case 69:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1943to1954[7];
                                default:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1943to1954[8];
                            }
                        } else if (yearOfBirth >= 1960 && yearOfBirth <= 2000) {
                            switch (retirementAge) {
                                case 62:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1960to2000[0];
                                case 63:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1960to2000[1];
                                case 64:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1960to2000[2];
                                case 65:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1960to2000[3];
                                case 66:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1960to2000[4];
                                case 67:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1960to2000[5];
                                case 68:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1960to2000[6];
                                case 69:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1960to2000[7];
                                default:
                                    spousalBenefit = ssBaseClient * _constants.spousalBenefits1960to2000[8];
                            }
                        }
                }

                if (parseInt(client.numOfDeps) > 0) {
                    var retirementDiff = retirementAge - spouse.age;
                    client.ageOfDeps.forEach(function (age, i) {
                        if (parseInt(age) + retirementDiff < 18) {
                            spousalBenefit = ssBaseClient * 0.50;
                        }
                    });
                }

                if (spousalBenefit > ssBaseSpouse) {
                    spouse.ssBase[i] = spousalBenefit;
                }
            }

            function results(person) {
                var early = 62;
                var FRA = person.yearFRA;
                var userSelected = person.retirementAge;
                var late = 70;
                var retirementAges = [early, userSelected, FRA, late];
                var yearOfBirth = person.yearOfBirth;
                var currentYear = person.currentYear;
                var retirementIncome = person.retirementIncome;

                retirementAges.forEach(function (age, i) {
                    var retirementYear = age + yearOfBirth;
                    var limitYear = retirementYear - currentYear;
                    var overLimit = retirementIncome - _constants.projEarningsLimit[limitYear];

                    if (overLimit > 0 && age < FRA) {
                        var reduction = overLimit / 2;
                        person.ssBaseAdj[i] = person.ssBase[i] - reduction;
                        if (person.ssBaseAdj[i] < 0) person.ssBaseAdj[i] = 0;
                    } else if (overLimit > 0 && age == FRA) {
                        var reduction = overLimit / 3;
                        person.ssBaseAdj[i] = person.ssBase[i] - reduction;
                        if (person.ssBaseAdj[i] < 0) person.ssBaseAdj[i] = 0;
                    } else person.ssBaseAdj[i] = person.ssBase[i];
                });

                person.ssBaseAdj.forEach(function (ssBase, i) {
                    var age = retirementAges[i];
                    var lifeExpectancy = person.lifeExpectancy;
                    var numOfYears = lifeExpectancy - age;

                    for (var j = 0; j <= numOfYears; j++) {
                        if (i == 0) {
                            if (j == 0) person.earlyBenefits[j] = ssBase;else {
                                person.earlyBenefits[j] = person.earlyBenefits[j - 1] + person.earlyBenefits[j - 1] * person.cola / 100;
                            }
                        } else if (i == 1) {
                            if (j == 0) person.userSelectedBenefits[j] = ssBase;else {
                                person.userSelectedBenefits[j] = person.userSelectedBenefits[j - 1] + person.userSelectedBenefits[j - 1] * person.cola / 100;
                            }
                        } else if (i == 2) {
                            if (j == 0) person.FRABenefits[j] = ssBase;else {
                                person.FRABenefits[j] = person.FRABenefits[j - 1] + person.FRABenefits[j - 1] * person.cola / 100;
                            }
                        } else if (i == 3) {
                            if (j == 0) person.lateBenefits[j] = ssBase;else {
                                person.lateBenefits[j] = person.lateBenefits[j - 1] + person.lateBenefits[j - 1] * person.cola / 100;
                            }
                        }
                    }
                });
            }

            var maritalStatus = this.userData.client.maritalStatus;

            calculateSSBase(this.userData.client, 62);
            calculateSSBase(this.userData.client, this.userData.client.retirementAge);
            calculateSSBase(this.userData.client, this.userData.client.yearFRA);
            calculateSSBase(this.userData.client, 70);

            if (maritalStatus == "Married") {
                calculateSSBase(this.userData.spouse, 62);
                calculateSSBase(this.userData.spouse, this.userData.spouse.retirementAge);
                calculateSSBase(this.userData.spouse, this.userData.spouse.yearFRA);
                calculateSSBase(this.userData.spouse, 70);

                var i = 0;
                spousalBenefit(this.userData.client, this.userData.spouse, 62, i);
                i++;
                spousalBenefit(this.userData.client, this.userData.spouse, this.userData.spouse.retirementAge, i);
                i++;
                spousalBenefit(this.userData.client, this.userData.spouse, this.userData.spouse.yearFRA, i);
                i++;
                spousalBenefit(this.userData.client, this.userData.spouse, 70, i);
            }

            results(this.userData.client);
            if (maritalStatus == "Married") {
                results(this.userData.spouse);
            }

            console.log(this.userData);
            this.router.navigate('#/results');
        };

        benefits.prototype.eligible = function eligible() {
            this.userData.client.eligibleSS = !this.userData.client.eligibleSS;
        };

        benefits.prototype.wep = function wep() {
            this.userData.client.wep = !this.userData.client.wep;
        };

        benefits.prototype.eligibleSpouse = function eligibleSpouse() {
            this.userData.spouse.eligibleSS = !this.userData.spouse.eligibleSS;
        };

        benefits.prototype.wepSpouse = function wepSpouse() {
            this.userData.spouse.wep = !this.userData.spouse.wep;
        };

        benefits.prototype.back = function back() {
            this.router.navigate('#/exceptions');
        };

        benefits.prototype.attached = function attached() {
            var _this = this;

            (0, _jquery2.default)("#benefitslider").ionRangeSlider({
                grid: true,
                type: "single",
                min: 0,
                max: 10,
                from: 2.6,
                step: 0.1,
                postfix: "%",
                disable: true,
                onFinish: function onFinish(data) {
                    _this.userData.client.cola = data.from;
                }
            });

            (0, _jquery2.default)("#spousebenefitslider").ionRangeSlider({
                grid: true,
                type: "single",
                min: 0,
                max: 10,
                from: 2.6,
                step: 0.1,
                postfix: "%",
                disable: true,
                onFinish: function onFinish(data) {
                    _this.userData.spouse.cola = data.from;
                }
            });

            (0, _jquery2.default)('#wep').tooltip({
                content: "<b>Windfall Elimination Provision:</b> If you work for a: federal, state, or local government; nonprofit organizations; or work in another country," + " you may qualify to be eligible for a pension based on earnings that are not covered by Social Security. This pension can affect your Social Security benefits."
            });

            (0, _jquery2.default)('#wepYears').tooltip({
                content: "If you've paid Social Security taxes on 30 or more years on substantial earnings, WEP does <i>not</i> affect your Social Security benefits."
            });

            (0, _jquery2.default)('#spousewep').tooltip({
                content: "<b>Windfall Elimination Provision:</b> If you work for a: federal, state, or local government; nonprofit organizations; or work in another country," + " you may qualify to be eligible for a pension based on earnings that are not covered by Social Security. This pension can affect your Social Security benefits."
            });

            (0, _jquery2.default)('#spousewepYears').tooltip({
                content: "If you've paid Social Security taxes on 30 or more years on substantial earnings, WEP does <i>not</i> affect your Social Security benefits."
            });

            (0, _jquery2.default)('#cola').tooltip({
                content: "<b>Cost Of Living Adjustment:</b> COLA is used to ensure that the purchasing power of both Social Security and Supplemental Security Income (SSI) benefits is not eroded by inflation."
            });

            (0, _jquery2.default)('#spousecola').tooltip({
                content: "<b>Cost Of Living Adjustment:</b> COLA is used to ensure that the purchasing power of both Social Security and Supplemental Security Income (SSI) benefits is not eroded by inflation."
            });
        };

        return benefits;
    }()) || _class);
});
define('exceptions/exceptions',['exports', 'jquery', 'bootstrap-toggle', 'ion-rangeslider', 'moment', 'src/services/constants.js', 'aurelia-framework', '../services/userdata', 'aurelia-router', 'jquery-ui-dist'], function (exports, _jquery, _bootstrapToggle, _ionRangeslider, _moment, _constants, _aureliaFramework, _userdata, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.exceptions = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    var bootstrapToggle = _interopRequireWildcard(_bootstrapToggle);

    var ionRangeSlider = _interopRequireWildcard(_ionRangeslider);

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var exceptions = exports.exceptions = (_dec = (0, _aureliaFramework.inject)(_userdata.UserData, _aureliaRouter.Router), _dec(_class = function () {
        function exceptions(userData, router) {
            _classCallCheck(this, exceptions);

            this.router = router;
            this.userData = userData;
        }

        exceptions.prototype.calculate = function calculate() {
            function militarySalary(person) {
                if (person.beginYear <= 1967 && person.endYear >= 1940) {
                    for (var year = person.beginYear; year <= Math.min(person.endYear, 1967); year++) {
                        var monthsWorked = 0;
                        if (year == person.beginYear) monthsWorked = 12 - person.beginMonth - 1;else if (year == person.endYear) monthsWorked = 12 - person.endMonth - 1;else monthsWorked = 12;
                        person.projectedSal[person.ageFrom18 - (person.currentYear - year)] += monthsWorked / 3 * 300;
                    }
                }

                if (person.beginYear <= 2001 && person.endYear >= 1967) {
                    for (var year = Math.max(person.beginYear, 1967); year <= person.endYear && year <= 2001; year++) {
                        var bonus = 1 / 3 * person.projectedSal[person.ageFrom18 - (person.currentYear - year)];
                        person.projectedSal[person.ageFrom18 - (person.currentYear - year)] += Math.min(bonus, 1200);
                    }
                }
            }

            function railroadSalary(person) {
                var start = person.yearsStartedOnRailroad;
                var end = person.yearsEndedOnRailroad;
                var difference = end - start;
                var yearsSinceStarted = person.currentYear - start;
                var yearsSinceEnded = person.currentYear - end;

                if (difference >= 10 || difference >= 5 && start >= 1995) {
                    for (var i = person.ageFrom18 - yearsSinceStarted; i <= person.ageFrom18 - yearsSinceEnded; i++) {
                        person.inflationAdjusted[i] = 0;
                    }
                }
            }

            function calculatePIA(person, widowcheck) {
                var sal = parseInt(person.salary);

                var pia, ageFrom18, yrsUntilRetire;

                ageFrom18 = person.ageFrom18;
                yrsUntilRetire = person.yearFRA - person.age;
                sal = parseInt(person.salary);

                person.projectedSal = new Array(55).join('0').split('').map(parseFloat);
                person.inflationAdjusted = new Array(55).join('0').split('').map(parseFloat);

                if (ageFrom18 >= 0) {
                    person.projectedSal[ageFrom18] = sal;
                    var count = 0;

                    if (!person.showWages) {
                        for (var i = ageFrom18 - 1; i >= 0; i--) {
                            person.projectedSal[i] = person.projectedSal[i + 1] - person.projectedSal[i + 1] * _constants.wagePerc[_constants.wagePerc.length - count - 2];
                            count++;
                        }
                    } else {
                        for (var i = ageFrom18 - 1; i >= 0; i--) {
                            person.projectedSal[i] = parseFloat(person.wages[i]);
                        }
                    }

                    if (!widowcheck) {
                        if (!person.futureWages) {
                            for (var i = ageFrom18 + 1; i <= ageFrom18 + yrsUntilRetire; i++) {
                                person.projectedSal[i] = parseFloat(person.projectedSal[i - 1]) + parseFloat(person.projectedSal[i - 1]) * _constants.wagePerc[_constants.wagePerc.length - 1];
                            }
                        } else {
                            for (var i = ageFrom18 + 1; i <= ageFrom18 + yrsUntilRetire; i++) {
                                person.projectedSal[i] = parseFloat(person.wages[i]);
                            }
                        }
                    } else {
                        for (var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) {
                            person.projectedSal[i] = 0;
                        }
                    }

                    if (person.militaryService) militarySalary(person);

                    count = 0;

                    for (var i = ageFrom18 - 1; i >= 0; i--) {
                        if (person.projectedSal[i] > _constants.allowedSalary[_constants.allowedSalary.length - count - 2]) {
                            person.inflationAdjusted[i] = _constants.allowedSalary[_constants.allowedSalary.length - count - 2] * _constants.inflationIndex[_constants.inflationIndex.length - count - 2];
                        } else {
                            person.inflationAdjusted[i] = person.projectedSal[i] * _constants.inflationIndex[_constants.inflationIndex.length - count - 2];
                        }
                        count++;
                    }

                    if (!widowcheck) {
                        var lastYearAllowed = _constants.allowedSalary[_constants.allowedSalary.length - 1];
                        for (var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) {
                            if (person.projectedSal[i] > lastYearAllowed) {
                                person.inflationAdjusted[i] = lastYearAllowed * _constants.inflationIndex[_constants.inflationIndex.length - 1];
                            } else {
                                person.inflationAdjusted[i] = person.projectedSal[i] * _constants.inflationIndex[_constants.inflationIndex.length - 1];
                            }
                            lastYearAllowed = lastYearAllowed * 1.021;
                        }
                    } else {
                        for (var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) {
                            person.inflationAdjusted[i] = 0;
                        }
                    }

                    if (person.workedOnARailroad) railroadSalary(person);

                    person.inflationAdjusted = person.inflationAdjusted.sort(function (a, b) {
                        return a - b;
                    });
                    person.topThirtyFive = person.inflationAdjusted.slice(person.inflationAdjusted.length - 35, person.inflationAdjusted.length);

                    pia = person.topThirtyFive.reduce(function (a, b) {
                        return a + b;
                    }, 0) / 420;
                    person.pia = pia;

                    return pia;
                } else {
                    alert("Client must be older than 18.");
                    return null;
                }
            }

            function adjustSurvivorPIA(client, deceased) {
                switch (client.yearOfBirth) {
                    case 1957:
                        switch (client.yearFRA) {
                            case 60:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1957[0];
                            case 61:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1957[1];
                            case 62:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1957[2];
                            case 63:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1957[3];
                            case 64:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1957[4];
                            case 65:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1957[5];
                            case 66:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1957[6];
                            case 67:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1957[7];
                            case 68:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1957[8];
                            case 69:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1957[9];
                            default:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1957[10];
                        }
                    case 1958:
                        switch (client.yearFRA) {
                            case 60:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1958[0];
                            case 61:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1958[1];
                            case 62:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1958[2];
                            case 63:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1958[3];
                            case 64:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1958[4];
                            case 65:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1958[5];
                            case 66:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1958[6];
                            case 67:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1958[7];
                            case 68:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1958[8];
                            case 69:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1958[9];
                            default:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1958[10];
                        }
                    case 1959:
                        switch (client.yearFRA) {
                            case 60:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1959[0];
                            case 61:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1959[1];
                            case 62:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1959[2];
                            case 63:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1959[3];
                            case 64:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1959[4];
                            case 65:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1959[5];
                            case 66:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1959[6];
                            case 67:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1959[7];
                            case 68:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1959[8];
                            case 69:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1959[9];
                            default:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1959[10];
                        }
                    case 1960:
                        switch (client.yearFRA) {
                            case 60:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1960[0];
                            case 61:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1960[1];
                            case 62:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1960[2];
                            case 63:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1960[3];
                            case 64:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1960[4];
                            case 65:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1960[5];
                            case 66:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1960[6];
                            case 67:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1960[7];
                            case 68:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1960[8];
                            case 69:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1960[9];
                            default:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1960[10];
                        }
                    case 1961:
                        switch (client.yearFRA) {
                            case 60:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1961[0];
                            case 61:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1961[1];
                            case 62:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1961[2];
                            case 63:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1961[3];
                            case 64:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1961[4];
                            case 65:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1961[5];
                            case 66:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1961[6];
                            case 67:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1961[7];
                            case 68:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1961[8];
                            case 69:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1961[9];
                            default:
                                client.survivorpia = deceased.pia * _constants.survivorFRA1961[10];
                        }
                    default:
                        if (client.yearOfBirth <= 1956) {
                            switch (client.yearFRA) {
                                case 60:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1945to1956[0];
                                case 61:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1945to1956[1];
                                case 62:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1945to1956[2];
                                case 63:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1945to1956[3];
                                case 64:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1945to1956[4];
                                case 65:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1945to1956[5];
                                case 66:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1945to1956[6];
                                case 67:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1945to1956[7];
                                case 68:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1945to1956[8];
                                case 69:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1945to1956[9];
                                default:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1945to1956[10];
                            }
                        } else {
                            switch (client.yearFRA) {
                                case 60:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1962to2000[0];
                                case 61:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1962to2000[1];
                                case 62:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1962to2000[2];
                                case 63:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1962to2000[3];
                                case 64:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1962to2000[4];
                                case 65:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1962to2000[5];
                                case 66:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1962to2000[6];
                                case 67:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1962to2000[7];
                                case 68:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1962to2000[8];
                                case 69:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1962to2000[9];
                                default:
                                    client.survivorpia = deceased.pia * _constants.survivorFRA1962to2000[10];
                            }
                        }
                }
            }

            var maritalStatus = this.userData.client.maritalStatus;
            var widowcheck = false;

            calculatePIA(this.userData.client, widowcheck);

            if (maritalStatus == "Married") calculatePIA(this.userData.spouse, widowcheck);else if (maritalStatus = "Widowed") {
                widowcheck = true;
                calculatePIA(this.userData.deceased, widowcheck);
                adjustSurvivorPIA(this.userData.client, this.userData.deceased);
            }

            if (this.userData.client.pia < this.userData.client.survivorpia) {
                this.userData.client.pia = this.userData.client.survivorpia;
            }

            console.log(this.userData);

            this.router.navigate('#/benefits');
        };

        exceptions.prototype.beganService = function beganService(date) {
            var beganService = (0, _moment2.default)(date, 'M/D/YYYY');
            var currentYear = (0, _moment2.default)().format('YYYY');
            var beginYear = beganService.format('YYYY');

            if (!(date.indexOf(beganService.format('MM/DD/YYYY')) >= 0 || date.indexOf(beganService.format('M/DD/YYYY')) >= 0 || date.indexOf(beganService.format('MM/D/YYYY')) >= 0 || date.indexOf(beganService.format('M/D/YYYY')) >= 0) || !beganService.isValid() || beginYear > currentYear) {
                alert('Invalid Year');
                return;
            } else {
                this.userData.client.beginYear = beginYear;
                this.userData.client.beginMonth = beganService.month();
            }
        };

        exceptions.prototype.endService = function endService(date) {
            var endService = (0, _moment2.default)(date, 'M/D/YYYY');
            var currentYear = (0, _moment2.default)().format('YYYY');
            var endYear = endService.format('YYYY');

            if (!(date.indexOf(endService.format('MM/DD/YYYY')) >= 0 || date.indexOf(endService.format('M/DD/YYYY')) >= 0 || date.indexOf(endService.format('MM/D/YYYY')) >= 0 || date.indexOf(endService.format('M/D/YYYY')) >= 0) || !endService.isValid() || endYear > currentYear) {
                alert('Invalid Year');
                return;
            } else {
                this.userData.client.endYear = endYear;
                this.userData.client.endMonth = endService.month();
            }
        };

        exceptions.prototype.beganServiceSpouse = function beganServiceSpouse(date) {
            var beganService = (0, _moment2.default)(date, 'M/D/YYYY');
            var currentYear = (0, _moment2.default)().format('YYYY');
            var beginYear = beganService.format('YYYY');

            if (!(date.indexOf(beganService.format('MM/DD/YYYY')) >= 0 || date.indexOf(beganService.format('M/DD/YYYY')) >= 0 || date.indexOf(beganService.format('MM/D/YYYY')) >= 0 || date.indexOf(beganService.format('M/D/YYYY')) >= 0) || !beganService.isValid() || beginYear > currentYear) {
                alert('Invalid Year');
                return;
            } else {
                this.userData.spouse.beginYear = beginYear;
                this.userData.spouse.beginMonth = beganService.month();
            }
        };

        exceptions.prototype.endServiceSpouse = function endServiceSpouse(date) {
            var endService = (0, _moment2.default)(date, 'M/D/YYYY');
            var currentYear = (0, _moment2.default)().format('YYYY');
            var endYear = endService.format('YYYY');

            if (!(date.indexOf(endService.format('MM/DD/YYYY')) >= 0 || date.indexOf(endService.format('M/DD/YYYY')) >= 0 || date.indexOf(endService.format('MM/D/YYYY')) >= 0 || date.indexOf(endService.format('M/D/YYYY')) >= 0) || !endService.isValid() || endYear > currentYear) {
                alert('Invalid Year');
                return;
            } else {
                this.userData.spouse.endYear = endYear;
                this.userData.spouse.endMonth = endService.month();
            }
        };

        exceptions.prototype.checkCitizenship = function checkCitizenship(value) {
            if (value == "Dual Citizen") {
                this.userData.client.dual26Countries = true;
                this.userData.client.notCitizen = false;
            } else if (value == "Not a US Citizen") {
                this.userData.client.notCitizen = true;
                this.userData.client.dual26Countries = false;
            } else {
                this.userData.client.dual26Countries = false;
                this.userData.client.notCitizen = false;
            }
        };

        exceptions.prototype.checkCitizenshipSpouse = function checkCitizenshipSpouse(value) {
            if (value == "Dual Citizen") {
                this.userData.spouse.dual26Countries = true;
                this.userData.spouse.notCitizen = false;
            } else if (value == "Not a US Citizen") {
                this.userData.spouse.notCitizen = true;
                this.userData.spouse.dual26Countries = false;
            } else {
                this.userData.spouse.dual26Countries = false;
                this.userData.spouse.notCitizen = false;
            }
        };

        exceptions.prototype.militaryService = function militaryService() {
            this.userData.client.militaryService = !this.userData.client.militaryService;
        };

        exceptions.prototype.railroad = function railroad() {
            this.userData.client.workedOnARailroad = !this.userData.client.workedOnARailroad;
        };

        exceptions.prototype.gpo = function gpo() {
            this.userData.client.recievePension = !this.userData.client.recievePension;
        };

        exceptions.prototype.check26Countries = function check26Countries() {
            this.userData.client.isDual26Countries = !this.userData.client.isDual26Countries;
        };

        exceptions.prototype.canadaItaly = function canadaItaly() {
            this.userData.client.dualCanadaItaly = !this.userData.client.dualCanadaItaly;
            if (!this.userData.client.dualCanadaItaly) alert("You are not eligible for Social Security");
        };

        exceptions.prototype.instrumentality = function instrumentality() {
            this.userData.client.checkInstrumentality = !this.userData.client.checkInstrumentality;
        };

        exceptions.prototype.conditions = function conditions() {
            this.userData.client.checkConditions = !this.userData.client.checkConditions;
            if (this.userData.client.checkConditions) alert("You are not eligible for Social Security");
        };

        exceptions.prototype.militaryServiceSpouse = function militaryServiceSpouse() {
            this.userData.spouse.militaryService = !this.userData.spouse.militaryService;
        };

        exceptions.prototype.railroadSpouse = function railroadSpouse() {
            this.userData.spouse.workedOnARailroad = !this.userData.spouse.workedOnARailroad;
        };

        exceptions.prototype.gpoSpouse = function gpoSpouse() {
            this.userData.spouse.recievePension = !this.userData.spouse.recievePension;
        };

        exceptions.prototype.check26CountriesSpouse = function check26CountriesSpouse() {
            this.userData.spouse.isDual26Countries = !this.userData.spouse.isDual26Countries;
        };

        exceptions.prototype.canadaItalySpouse = function canadaItalySpouse() {
            this.userData.spouse.dualCanadaItaly = !this.userData.spouse.dualCanadaItaly;
            if (!this.userData.spouse.dualCanadaItaly) alert("You are not eligible for Social Security");
        };

        exceptions.prototype.instrumentalitySpouse = function instrumentalitySpouse() {
            this.userData.spouse.checkInstrumentality = !this.userData.spouse.checkInstrumentality;
        };

        exceptions.prototype.conditionsSpouse = function conditionsSpouse() {
            this.userData.spouse.checkConditions = !this.userData.spouse.checkConditions;
            if (this.userData.spouse.checkConditions) alert("You are not eligible for Social Security");
        };

        exceptions.prototype.attached = function attached() {};

        exceptions.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        return exceptions;
    }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('src/services/constants.js',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var wagePerc = exports.wagePerc = [0.0699, 0.031, 0.0088, 0.0495, 0.0392, 0.0199, 0.0501, 0.0245, 0.0409, 0.018, 0.06, 0.0557, 0.0687, 0.0578, 0.0496, 0.0502, 0.098, 0.0626, 0.0594, 0.0747, 0.069, 0.0599, 0.0794, 0.0875, 0.0901, 0.1007, 0.0551, 0.0487, 0.0588, 0.0426, 0.0297, 0.0638, 0.0493, 0.0396, 0.0462, 0.0373, 0.0515, 0.0086, 0.0268, 0.0401, 0.0489, 0.0584, 0.0523, 0.0557, 0.0553, 0.0239, 0.01, 0.0244, 0.0465, 0.0366, 0.046, 0.0454, 0.023, -0.0151, 0.0236, 0.0313, 0.0128, 0.0355, 0.0348, 0.0348, 0.025, 0.025];

    var inflationIndex = exports.inflationIndex = [13.6165708, 13.2076684, 13.0923376, 12.4743581, 12.0032916, 11.7693797, 11.2081442, 10.9398609, 10.5103293, 10.3244303, 9.7397982, 9.2258912, 8.6325739, 8.1609414, 7.7750993, 7.4031149, 6.7423575, 6.3453318, 5.9892999, 5.5728277, 5.2131073, 4.918342, 4.5565075, 4.1899732, 3.8437514, 3.4922153, 3.3099927, 3.1562355, 2.9809992, 2.8591827, 2.7767654, 2.6102952, 2.4877692, 2.3930202, 2.2873633, 2.2051858, 2.0971332, 2.0792511, 2.0249045, 1.9468668, 1.8560938, 1.7537603, 1.666536, 1.5785652, 1.4958451, 1.460991, 1.4464844, 1.4119683, 1.3492451, 1.3016185, 1.2444211, 1.1903987, 1.1636305, 1.1814475, 1.1541687, 1.1191035, 1.085217, 1.0715215, 1.0347904, 1, 1, 1];

    var allowedSalary = exports.allowedSalary = [4200, 4200, 4200, 4800, 4800, 4800, 4800, 4800, 4800, 4800, 6600, 6600, 7800, 7800, 7800, 7800, 9000, 10800, 13200, 14100, 15300, 16500, 17700, 22900, 25900, 29700, 32400, 35700, 37800, 39600, 42000, 43800, 45000, 48000, 51300, 53400, 55500, 57600, 60600, 61200, 62700, 65400, 68400, 72600, 76200, 80400, 84900, 87000, 87900, 90000, 94200, 97500, 102000, 106800, 106800, 110100, 113700, 117000, 118500, 118500, 118500, 127200];

    var tier1perc = exports.tier1perc = 0.90;
    var tier2perc = exports.tier2perc = 0.32;
    var tier3perc = exports.tier3perc = 0.15;

    var bendtier1 = exports.bendtier1 = [744, 761, 749, 767, 791, 816, 826, 856, 885, 907, 930, 953, 977, 1002, 1027, 1052, 1079, 1106, 1133, 1162, 1191, 1220, 1251, 1282, 1314, 1347, 1381, 1415, 1451, 1487, 1524, 1562, 1601, 1641, 1682, 1724, 1768, 1812, 1857, 1903, 1951, 2000, 2050, 2101, 2154, 2207, 2263, 2319, 2377, 2437, 2497, 2560, 2624, 2689, 2757, 2826, 2896, 2969, 3043, 3119, 3197, 3277, 3359, 3443, 3529, 3617, 3707, 3800, 3895, 3993, 4092, 4195];

    var bendtier2 = exports.bendtier2 = [4483, 4586, 4517, 4624, 4768, 4917, 4980, 5157, 5336, 5470, 5607, 5747, 5890, 6038, 6189, 6343, 6502, 6664, 6831, 7002, 7177, 7356, 7540, 7729, 7922, 8120, 8323, 8531, 8744, 8963, 9187, 9417, 9652, 9893, 10141, 10394, 10654, 10920, 11193, 11473, 11760, 12054, 12355, 12664, 12981, 13306, 13638, 13979, 14329, 14687, 15054, 15430, 15816, 16211, 16617, 17032, 17458, 17894, 18342, 18800, 19270, 19752, 20246, 20752, 21271, 21803, 22348, 22906, 23479, 24066, 24668, 25284];

    var subEarningsPerc = exports.subEarningsPerc = [.9000, .8500, .8000, .7500, .7000, .6500, .6000, .5500, .5000, .4500, .4000];

    var EL1943plus = exports.EL1943plus = [0.75, 0.8, 0.867, 0.933, 1, 1.08, 1.16, 1.24, 1.32];

    var EL1955 = exports.EL1955 = [0.742, 0.796, 0.856, 0.922, 0.989, 1.069, 1.149, 1.229, 1.309];

    var EL1956 = exports.EL1956 = [0.733, 0.783, 0.844, 0.911, 0.978, 1.058, 1.138, 1.218, 1.298];

    var EL1957 = exports.EL1957 = [0.725, 0.775, 0.833, 0.9, 0.967, 1.047, 1.127, 1.207, 1.287];

    var EL1958 = exports.EL1958 = [0.717, 0.767, 0.822, 0.889, 0.956, 1.036, 1.116, 1.196, 1.276];

    var EL1959 = exports.EL1959 = [0.708, 0.758, 0.811, 0.878, 0.944, 1.024, 1.104, 1.184, 1.264];

    var EL1960plus = exports.EL1960plus = [0.7, 0.75, 0.8, 0.867, 0.933, 1, 1.08, 1.16, 1.24];

    var survivorFRA1945to1956 = exports.survivorFRA1945to1956 = [0.71488, 0.7624, 0.80992, 0.85744, 0.90496, 0.95248, 1, 1, 1, 1, 1];

    var survivorFRA1957 = exports.survivorFRA1957 = [0.7151, 0.7613, 0.8075, 0.8537, 0.8999, 0.9461, 0.9923, 1, 1, 1, 1];

    var survivorFRA1958 = exports.survivorFRA1958 = [0.715, 0.76, 0.805, 0.85, 0.895, 0.94, 0.985, 1, 1, 1, 1];

    var survivorFRA1959 = exports.survivorFRA1959 = [0.7153, 0.7591, 0.8029, 0.8467, 0.8905, 0.9343, 0.9781, 1, 1, 1, 1];

    var survivorFRA1960 = exports.survivorFRA1960 = [0.7152, 0.75792, 0.80064, 0.84336, 0.88608, 0.9288, 0.97152, 1, 1, 1, 1];

    var survivorFRA1961 = exports.survivorFRA1961 = [0.71464, 0.7564, 0.79816, 0.83992, 0.88168, 0.92344, 0.9652, 1, 1, 1, 1];

    var survivorFRA1962to2000 = exports.survivorFRA1962to2000 = [0.71524, 0.75592, 0.7966, 0.83728, 0.87796, 0.91864, 0.95932, 1, 1, 1, 1];

    var projEarningsLimit = exports.projEarningsLimit = [16920, 17343, 17776.575, 18220.989375, 18676.514109375, 19143.4269621094, 19622.0126361621, 20112.5629520662, 20615.3770258678, 21130.7614515145, 21659.0304878024, 22200.5062499974, 22755.5189062474, 23324.4068789036, 23907.5170508761, 24505.204977148, 25117.8351015768, 25745.7809791162, 26389.4255035941, 27049.1611411839, 27725.3901697135, 28418.5249239564, 29128.9880470553, 29857.2127482317, 30603.6430669374, 31368.7341436109, 32152.9524972012, 32956.7763096312, 33780.695717372, 34625.2131103063, 35490.8434380639, 36378.1145240155, 37287.5673871159, 38219.7565717938, 39175.2504860886, 40154.6317482409, 41158.4975419469, 42187.4599804956];

    var spousalBenefits1943to1954 = exports.spousalBenefits1943to1954 = [0, 0.375, 0.4167, 0.4584, 0.5, 0.5, 0.5, 0.5, 0.5];

    var spousalBenefits1955 = exports.spousalBenefits1955 = [.3479, .3709, .4097, .4514, .4931, .50, .50, .50, .50];

    var spousalBenefits1956 = exports.spousalBenefits1956 = [0.3438, 0.3667, 0.4028, 0.4445, 0.4861, 0.5, 0.5, 0.5, 0.5];

    var spousalBenefits1957 = exports.spousalBenefits1957 = [.3396, .3625, .3959, .4375, .4792, .5000, .50, .50, .50];

    var spousalBenefits1958 = exports.spousalBenefits1958 = [0.3354, 0.3584, 0.3889, 0.4306, 0.4722, 0.5, 0.5, 0.5, 0.5];

    var spousalBenefits1959 = exports.spousalBenefits1959 = [0.3313, 0.3563, 0.3854, 0.4271, 0.4688, 0.5, 0.5, 0.5, 0.5];

    var spousalBenefits1960to2000 = exports.spousalBenefits1960to2000 = [0.3271, 0.35, 0.371, 0.4167, 0.4584, 0.5, 0.5, 0.5, 0.5];
});
define('services/user',["exports"], function (exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
                value: true
        });

        function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                }
        }

        var User = exports.User = function User() {
                _classCallCheck(this, User);

                this.ssBase = [];
                this.ssBaseAdj = [];
                this.pia = 0;
                this.survivorpia = 0;

                this.earlyBenefits = [];
                this.FRABenefits = [];
                this.userSelectedBenefits = [];
                this.lateBenefits = [];

                this.name = "";
                this.gender = "";
                this.dateOfBirth = "";

                this.age = 0;
                this.ageFrom18 = 0;
                this.yearOfBirth = 0;
                this.monthOfBirth = 0;
                this.currentYear = 0;
                this.isPassed = false;
                this.yearOfPassing = 0;
                this.yearFrom18toPassing = 0;
                this.yearFRA = 0;
                this.monthFRA = 0;

                this.employmentStatus = "";
                this.isEmployed = false;
                this.salary = 0;
                this.projectedSal = [];
                this.inflationAdjusted = [];
                this.topThirtyFive = [];

                this.isRetired = false;
                this.notCurrentlyEmployed = false;

                this.maritalStatus = "";
                this.isMarried = false;
                this.isDivorced = false;
                this.divorceCheck = false;
                this.isSurvivor = false;

                this.numOfDeps = 0;
                this.ageOfDeps = [];
                this.showAgeOfDeps = false;
                this.hasDeps = false;

                this.retirementIncome = 0;
                this.retirementAge = 65;
                this.lifeExpectancy = 91;
                this.retirementYear = 0;

                this.militaryService = false;
                this.beganService = "";
                this.endService = "";

                this.beginMonth = 0;
                this.beginYear = 0;
                this.endMonth = 0;
                this.endYear = 0;

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

                this.showWages = false;
                this.wages = new Array(55).join('0').split('').map(parseFloat);
                this.futureWages = false;

                this.eligibleSS = false;
                this.cola = 2.5;
                this.wep = false;
                this.yrsOfSubEarnings = 0;

                this.showChart = false;
                this.netEarly = 0;
                this.netUserSelected = 0;
                this.netFRA = 0;
                this.netLate = 0;

                this.earlyTuples = [];
                this.userSelectedTuples = [];
                this.FRATuples = [];
                this.lateTuples = [];

                this.benefitAge = 0;
                this.checkEarly = false;
                this.checkUserSelected = false;
                this.checkFRA = false;
                this.checkLate = false;
        };
});
define('services/userdata',['exports', 'aurelia-framework', '../services/user'], function (exports, _aureliaFramework, _user) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UserData = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var UserData = exports.UserData = (_dec = (0, _aureliaFramework.singleton)(), _dec(_class = function UserData() {
        _classCallCheck(this, UserData);

        this.client = new _user.User();
        this.spouse = new _user.User();
        this.deceased = new _user.User();
    }) || _class);
});
define('results/results',['exports', 'jquery', 'ion-rangeslider', 'aurelia-framework', '../services/userdata', 'aurelia-router', 'src/services/constants.js', 'highcharts', 'jquery-ui-dist'], function (exports, _jquery, _ionRangeslider, _aureliaFramework, _userdata, _aureliaRouter, _constants, _highcharts) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.results = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    var ionRangeSlider = _interopRequireWildcard(_ionRangeslider);

    var HighCharts = _interopRequireWildcard(_highcharts);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var results = exports.results = (_dec = (0, _aureliaFramework.inject)(_userdata.UserData, _aureliaRouter.Router), _dec(_class = function () {
        function results(userData, router) {
            _classCallCheck(this, results);

            this.userData = userData;
            this.router = router;

            this.netEarly = 0;
            this.netUserSelected = 0;
            this.netFRA = 0;
            this.netLate = 0;
        }

        results.prototype.back = function back() {
            this.router.navigate('#/benefits');
        };

        results.prototype.results = function results() {
            function makeChart(containerID, person) {
                person.earlyTuples = [];
                person.userSelectedTuples = [];
                person.FRATuples = [];
                person.lateTuples = [];

                function generateTuples(array, startAge, person) {
                    var tuples = [];

                    switch (startAge) {
                        case 62:
                            person.netEarly = 0;
                            break;
                        case person.retirementAge:
                            person.netUserSelected = 0;
                            break;
                        case person.yearFRA:
                            person.netFRA = 0;
                            break;
                        default:
                            person.netLate = 0;
                    }

                    for (var i = 0; i < array.length; i++) {
                        tuples.push([startAge + i, parseFloat(array[i].toFixed(2))]);
                        switch (startAge) {
                            case 62:
                                person.netEarly += array[i];
                                person.earlyTuples.push(parseFloat(array[i].toFixed(2)));
                                person.earlyTuples[i] = "$" + parseFloat(person.earlyTuples[i]).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                                break;
                            case person.retirementAge:
                                person.netUserSelected += array[i];
                                person.userSelectedTuples.push(parseFloat(array[i].toFixed(2)));
                                person.userSelectedTuples[i] = "$" + parseFloat(person.userSelectedTuples[i]).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                                break;
                            case person.yearFRA:
                                person.netFRA += array[i];
                                person.FRATuples.push(parseFloat(array[i].toFixed(2)));
                                person.FRATuples[i] = "$" + parseFloat(person.FRATuples[i]).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                                break;
                            default:
                                person.netLate += array[i];
                                person.lateTuples.push(parseFloat(array[i].toFixed(2)));
                                person.lateTuples[i] = "$" + parseFloat(person.lateTuples[i]).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                        }
                    }

                    switch (startAge) {
                        case 62:
                            person.netEarly = "$" + parseFloat(person.netEarly).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                            break;
                        case person.retirementAge:
                            person.netUserSelected = "$" + parseFloat(person.netUserSelected).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                            break;
                        case person.yearFRA:
                            person.netFRA = "$" + parseFloat(person.netFRA).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                            break;
                        default:
                            person.netLate = "$" + parseFloat(person.netLate).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                    }

                    return tuples;
                }

                Highcharts.chart(containerID, {
                    title: {
                        text: person.name + ': Benefits vs. Age'
                    },
                    xAxis: {
                        title: {
                            text: 'Age'
                        }
                    },
                    plotOptions: {
                        series: {
                            pointStart: 62
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Yearly Benefits'
                        }
                    },
                    series: [{
                        name: 'Receive at 62 (earliest)',
                        data: generateTuples(person.earlyBenefits, 62, person)
                    }, {
                        name: 'Receive at ' + person.retirementAge + ' (user-selected)',
                        data: generateTuples(person.userSelectedBenefits, person.retirementAge, person)
                    }, {
                        name: 'Receive at ' + person.yearFRA + ' (FRA)',
                        data: generateTuples(person.FRABenefits, person.yearFRA, person)
                    }, {
                        name: 'Receive at 70 (latest)',
                        data: generateTuples(person.lateBenefits, 70, person)
                    }]
                });
            }

            function currencyFormat(num) {
                return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            }

            var maritalStatus = this.userData.client.maritalStatus;

            if (!this.userData.client.showChart) {
                makeChart('clientContainer', this.userData.client);
                this.userData.client.showChart = true;

                if (maritalStatus == "Married") {
                    makeChart('spouseContainer', this.userData.spouse);
                    this.userData.spouse.showChart = true;
                }
            } else {
                this.userData.client.showChart = !this.userData.client.showChart;
                if (maritalStatus == "Married") {
                    this.userData.spouse.showChart = !this.userData.spouse.showChart;
                }
            }
        };

        results.prototype.checkAge = function checkAge(value) {
            if (value.indexOf('Early') >= 0) {
                this.userData.client.checkEarly = true;
                this.userData.client.checkUserSelected = false;
                this.userData.client.checkFRA = false;
                this.userData.client.checkLate = false;
            } else if (value.indexOf('Selected Age') >= 0) {
                this.userData.client.checkEarly = false;
                this.userData.client.checkUserSelected = true;
                this.userData.client.checkFRA = false;
                this.userData.client.checkLate = false;
            } else if (value.indexOf('FRA') >= 0) {
                this.userData.client.checkEarly = false;
                this.userData.client.checkUserSelected = false;
                this.userData.client.checkFRA = true;
                this.userData.client.checkLate = false;
            } else if (value.indexOf('Late') >= 0) {
                this.userData.client.checkEarly = false;
                this.userData.client.checkUserSelected = false;
                this.userData.client.checkFRA = false;
                this.userData.client.checkLate = true;
            } else {
                this.userData.client.checkEarly = false;
                this.userData.client.checkUserSelected = false;
                this.userData.client.checkFRA = false;
                this.userData.client.checkLate = false;
            }
        };

        results.prototype.checkAgeSpouse = function checkAgeSpouse(value) {
            if (value.indexOf('Early') >= 0) {
                this.userData.spouse.checkEarly = true;
                this.userData.spouse.checkUserSelected = false;
                this.userData.spouse.checkFRA = false;
                this.userData.spouse.checkLate = false;
            } else if (value.indexOf('Selected Age') >= 0) {
                this.userData.spouse.checkEarly = false;
                this.userData.spouse.checkUserSelected = true;
                this.userData.spouse.checkFRA = false;
                this.userData.spouse.checkLate = false;
            } else if (value.indexOf('FRA') >= 0) {
                this.userData.spouse.checkEarly = false;
                this.userData.spouse.checkUserSelected = false;
                this.userData.spouse.checkFRA = true;
                this.userData.spouse.checkLate = false;
            } else if (value.indexOf('Late') >= 0) {
                this.userData.spouse.checkEarly = false;
                this.userData.spouse.checkUserSelected = false;
                this.userData.spouse.checkFRA = false;
                this.userData.spouse.checkLate = true;
            } else {
                this.userData.spouse.checkEarly = false;
                this.userData.spouse.checkUserSelected = false;
                this.userData.spouse.checkFRA = false;
                this.userData.spouse.checkLate = false;
            }
        };

        results.prototype.attached = function attached() {
            this.userData.client.showChart = false;
            this.userData.spouse.showChart = false;
        };

        return results;
    }()) || _class);
});
define('text!styles.css', ['module'], function(module) { module.exports = "html, body {\r\n\tmargin:0;\r\n\tpadding:0;\r\n\theight:100%;\r\n}\r\n\r\n#app {\r\n\tmin-height:100%;\r\n\tposition:relative;\r\n}\r\n\r\n#content {\r\n\tpadding-bottom:100px; /* Height of the footer element */\r\n}\r\n\r\n#footer {\r\n\tbackground:#ededed;\r\n\twidth:100%;\r\n\theight:60px;\r\n\tposition:absolute;\r\n\tbottom:0;\r\n\tleft:0;\r\n    text-align: center;\r\n}\r\n\r\n#persinfointro {\r\n    text-align: center;\r\n    width: 500px;\r\n    margin: 0 auto;\r\n}\r\n\r\n#persinfo, #benefits, #wagehistory, #exceptions, #spousewagehistory {\r\n    text-align: center;\r\n    width: 500px;\r\n    margin: 0 auto;\r\n}\r\n\r\n#results {\r\n    text-align: center;\r\n    width: 750px;\r\n    margin: 0 auto;\r\n}\r\n\r\n#divorceCheck {\r\n    width: 5000px;\r\n}\r\n\r\n#wages {\r\n    display: inline-block;\r\n}\r\n\r\n#custom-handle {\r\n    width: 3em;\r\n    height: 1.6em;\r\n    top: 50%;\r\n    margin-top: -.8em;\r\n    text-align: center;\r\n    line-height: 1.6em;\r\n  }\r\n\r\n.range-slider {\r\n    position: relative;\r\n    height: 80px;\r\n}\r\n\r\n.glyphicon-question-sign {\r\n    color: #006dcc;\r\n}\r\n\r\n\r\n.table-outter {\r\n    overflow-x: scroll;\r\n}\r\n\r\n.search-table {\r\n    margin:40px auto 0px auto; \r\n}\r\n\r\n.search-table, td, th {\r\n    border-collapse: collapse; \r\n    text-align: center;\r\n}\r\n\r\nth {\r\n    padding: 50 100px; \r\n    font-size: 15px; \r\n}\r\n\r\ntd {\r\n    padding: 50px 100px; \r\n    height: 35px;\r\n}\r\n\r\n.highcharts-title {\r\n    font-weight: bold;\r\n}"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"./styles.css\"></require><div id=\"app\"><div id=\"content\"><nav class=\"navbar navbar-default\"><div class=\"container-fluid\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" href=\"#\">Social Security Calculator</a></div><div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\"><ul class=\"nav navbar-nav\"><li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : 'disabled'}\"><a href.bind=\"row.href\">${row.title}</a></li></ul></div></div></nav><router-view></router-view><br><br><br><br><br></div><footer id=\"footer\"><div class=\"footer-copyright\"><div class=\"container-fluid\"><br>©2017, PIEtech, Inc. All rights reserved.</div></div></footer></div></template>"; });
define('text!aboutyou/deceasedwagehistory.html', ['module'], function(module) { module.exports = "<template><form id=\"wagehistory\" submit.delegate=\"completeWages()\"><h1>Deceased's Wage History</h1><p>If you would like to submit your own wages to ensure accuracy, input them here and select \"Submit Wages.\"</p><div class=\"form-group\"><label for=\"wagehistory\">Wages:</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div repeat.for=\"age of userData.deceased.yearFrom18toPassing\" id=\"wages\"><label for=\"year\">${userData.deceased.yearOfBirth + 18 + age}</label><input id=\"wagesInput\" type=\"text\" value.bind=\"userData.deceased.wages[age]\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"><br></div><br></div></div><button class=\"btn btn-secondary\" type=\"button\" click.delegate=\"back()\">Back</button> <button class=\"btn btn-primary\" type=\"submit\">Submit Wages</button></form></template>"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><require from=\".././styles.css\"></require><require from=\"jquery-ui-dist/jquery-ui.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><require from=\"bootstrap-toggle/css/bootstrap-toggle.css\"></require><require from=\"bootstrap-toggle/css/bootstrap2-toggle.css\"></require><div id=\"persinfointro\"><h1>Personal Information</h1><p>Please enter the specified personal information, so we can make the best estimates of your lifetime Social Security benefits.</p></div><form id=\"persinfo\" submit.delegate=\"next()\"><div id=\"client\"><h1>Client</h1><div class=\"form-group\"><label for=\"firstName\">First Name</label><input type=\"text\" value.bind=\"userData.client.name\" class=\"form-control\" id=\"name\" placeholder=\"John\"></div><div class=\"form-group\"><label for=\"gender\">Gender</label><select class=\"form-control\" value.bind=\"userData.client.gender\" id=\"gender\"><option data-hidden=\"true\">Please Select</option><option>Male</option><option>Female</option></select></div><div class=\"form-group\"><label for=\"dob\">Date of Birth</label><span id=\"dob\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"userData.client.dateOfBirth\" change.delegate=\"dob(userData.client.dateOfBirth)\" class=\"form-control\" placeholder=\"01/01/1970\"></div><div class=\"form-group\"><label for=\"empStatus\">Employment Status</label><select class=\"form-control\" value.bind=\"userData.client.employmentStatus\" change.delegate=\"checkEmployment(userData.client.employmentStatus)\" id=\"empStatus\"><option data-hidden=\"true\">Please Select</option><option>Employed</option><option>Business Owner</option><option>Retired</option><option>Not Currently Employed</option></select></div><div show.bind=\"userData.client.isEmployed\" class=\"form-group\"><label for=\"salary\">Salary</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"userData.client.salary\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"></div><br><button style=\"width:200px\" class=\"btn btn-primary\" type=\"button\" id=\"wagehistory\" click.delegate=\"wagehistory()\">Input Your Own Wages</button> <span id=\"salary\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span></div><div show.bind=\"userData.client.isRetired\"><button style=\"width:200px\" class=\"btn btn-primary\" type=\"button\" id=\"wagehistory\" click.delegate=\"wagehistory()\">Input Your Own Wages</button> <span id=\"retiredSalary\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span></div><div show.bind=\"userData.client.notCurrentlyEmployed\"><button style=\"width:200px\" class=\"btn btn-primary\" type=\"button\" id=\"wagehistory\" click.delegate=\"wagehistory()\">Input Your Own Wages</button> <span id=\"notCurrentlyEmployedSalary\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span></div><br><div class=\"form-group\"><label for=\"maritalStatus\">Marital Status</label><select class=\"form-control\" value.bind=\"userData.client.maritalStatus\" change.delegate=\"checkMarried(userData.client.maritalStatus)\" id=\"maritalStatus\"><option data-hidden=\"true\">Please Select</option><option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option></select></div><div show.bind=\"userData.client.isDivorced\"><hr><label for=\"divorceCheck\">Were you married for more than 10 years?</label><br><div click.delegate=\"divorce()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.client.divorceCheck ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.client.divorceCheck ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div show.bind=\"userData.client.divorceCheck\"><br><label for=\"exSpouseDOB\">Date of Birth of Ex-Spouse</label><input type=\"text\" value.bind=\"userData.spouse.dateOfBirth\" change.delegate=\"dob(userData.spouse.dateOfBirth)\" class=\"form-control\" id=\"dob\" placeholder=\"01/01/1970\"><br><label for=\"exSpouseSalary\">Salary of Ex-Spouse</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"userData.spouse.salary\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"></div></div><div show.bind=\"userData.client.isSurvivor\"><hr><div class=\"form-group\"><label for=\"dob\">Year of Passing of Deceased</label><input type=\"text\" value.bind=\"userData.deceased.yearOfPassing\" change.delegate=\"checkPassingYear(userData.deceased.yearOfPassing)\" class=\"form-control\" id=\"deceasedPassing\" placeholder=\"60\"></div><div show.bind=\"userData.deceased.isPassed\" class=\"form-group\"><label for=\"deceaseddob\">Date of Birth of Deceased</label><span id=\"deceaseddob\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"userData.deceased.dateOfBirth\" change.delegate=\"deceaseddob(userData.deceased.dateOfBirth)\" class=\"form-control\" id=\"deceaseddob\" placeholder=\"01/01/1970\"></div><div show.bind=\"userData.deceased.isPassed\" class=\"form-group\"><label for=\"salary\">Most Recent Salary of Deceased</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"userData.deceased.salary\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"></div><br><button style=\"width:200px\" class=\"btn btn-primary\" type=\"button\" click.delegate=\"deceasedwagehistory()\">Input Your Own Wages</button> <span id=\"deceasedsalary\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span></div></div><hr><h3>Retirement Information</h3><div class=\"form-group\"><label for=\"retirementIncome\">Retirement Income</label><span id=\"retirementIncome\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"userData.client.retirementIncome\" class=\"form-control\" id=\"retirementIncome\" placeholder=\"0\"></div></div><label for=\"retirementAge\">Retirement Age and Life Expectancy</label><span id=\"retirementAge\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" id=\"slider\" value=\"\" style=\"position:relative;height:80px\"></div><hr><h3>Dependent Information</h3><button class=\"btn btn-primary\" type=\"button\" click.delegate=\"addDep()\"><span class=\"glyphicon glyphicon-plus-sign\"></span> Add Dependent</button><div show.bind=\"userData.client.hasDeps\" class=\"form-group\"><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\" id=\"ageOfDeps\"><div repeat.for=\"num of userData.client.numOfDeps\"><br><label for=\"year\">Age of Dependent ${num}:</label><input type=\"text\" value.bind=\"userData.client.ageOfDeps[num]\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"8\"></div></div><br><button class=\"btn btn-danger\" type=\"button\" click.delegate=\"removeDep()\"><span class=\"glyphicon glyphicon-minus\"></span> Remove Dependent</button></div><div show.bind=\"userData.client.isMarried\"><hr><br><br><br><h1>Co-Client</h1><div class=\"form-group\"><label for=\"firstName\">First Name</label><input type=\"text\" value.bind=\"userData.spouse.name\" class=\"form-control\" id=\"name\" placeholder=\"John\"></div><div class=\"form-group\"><label for=\"gender\">Gender</label><select class=\"form-control\" value.bind=\"userData.spouse.gender\" id=\"gender\"><option data-hidden=\"true\">Please Select</option><option>Male</option><option>Female</option></select></div><div class=\"form-group\"><label for=\"dob\">Date of Birth</label><span id=\"spousedob\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"userData.spouse.dateOfBirth\" change.delegate=\"spousedob(userData.spouse.dateOfBirth)\" class=\"form-control\" id=\"dob\" placeholder=\"01/01/1970\"></div><div class=\"form-group\"><label for=\"empStatus\">Employment Status</label><select class=\"form-control\" value.bind=\"userData.spouse.employmentStatus\" change.delegate=\"checkEmploymentSpouse(userData.spouse.employmentStatus)\" id=\"empStatusSpouse\"><option data-hidden=\"true\">Please Select</option><option>Employed</option><option>Business Owner</option><option>Retired</option><option>Not Currently Employed</option></select></div><div show.bind=\"userData.spouse.isEmployed\" class=\"form-group\"><label for=\"salary\">Salary</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"userData.spouse.salary\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"></div><br><button style=\"width:200px\" class=\"btn btn-primary\" type=\"button\" id=\"spousewagehistory\" click.delegate=\"spousewagehistory()\">Input Your Own Wages</button> <span id=\"spousesalary\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span></div><div show.bind=\"userData.spouse.isRetired\"><button style=\"width:200px\" class=\"btn btn-primary\" type=\"button\" id=\"wagehistory\" click.delegate=\"spousewagehistory()\">Input Your Own Wages</button> <span id=\"spouseretiredSalary\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span></div><div show.bind=\"userData.spouse.notCurrentlyEmployed\"><button style=\"width:200px\" class=\"btn btn-primary\" type=\"button\" id=\"wagehistory\" click.delegate=\"spousewagehistory()\">Input Your Own Wages</button> <span id=\"spousenotCurrentlyEmployedSalary\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span></div><hr><h3>Retirement Information</h3><div class=\"form-group\"><label for=\"retirementIncome\">Retirement Income</label><span id=\"spouseretirementIncome\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"userData.spouse.retirementIncome\" class=\"form-control\" id=\"retirementIncome\" placeholder=\"0\"></div></div><label for=\"retirementAge\">Retirement Age and Life Expectancy</label><span id=\"spouseretirementAge\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" id=\"sliderSpouse\" value=\"\" style=\"position:relative;height:80px\"></div><br><br><button class=\"btn btn-primary\" type=\"submit\" id=\"next\">Next</button></form></template>"; });
define('text!aboutyou/spousewagehistory.html', ['module'], function(module) { module.exports = "<template><form id=\"wagehistory\" submit.delegate=\"completeWages()\"><h1>Co-Client's Wage History</h1><p>If you would like to submit your own wages to ensure accuracy, input them here and select \"Submit Wages.\"</p><div class=\"form-group\"><label for=\"wagehistory\">Wages:</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div repeat.for=\"age of userData.spouse.ageFrom18 + 1\" id=\"wages\"><label for=\"year\">${userData.spouse.yearOfBirth + 18 + age}</label><input id=\"wagesInput\" type=\"text\" value.bind=\"userData.spouse.wages[age]\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"><br></div><br><br><button show.bind=\"!userData.spouse.futureWages\" class=\"btn btn-primary\" click.delegate=\"futureWages()\">Input future wages</button></div><button show.bind=\"userData.spouse.futureWages\" click.delegate=\"noFutureWages()\" class=\"btn btn-danger\">Do not input future wages</button><br><br><div show.bind=\"userData.spouse.futureWages\" class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div repeat.for=\"age of userData.spouse.yearFRA - (userData.spouse.age)\" id=\"wages\"><label for=\"year\">${userData.spouse.currentYear + age + 1}</label><input id=\"wagesInput\" type=\"text\" value.bind=\"userData.spouse.wages[age + userData.spouse.ageFrom18 + 1]\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"><br></div></div></div><button class=\"btn btn-secondary\" type=\"button\" click.delegate=\"back()\">Back</button> <button class=\"btn btn-primary\" type=\"submit\">Submit Wages</button></form></template>"; });
define('text!aboutyou/wagehistory.html', ['module'], function(module) { module.exports = "<template><form id=\"wagehistory\" submit.delegate=\"completeWages()\"><h1>Client's Wage History</h1><p>If you would like to submit your own wages to ensure accuracy, input them here and select \"Submit Wages.\"</p><div class=\"form-group\"><label for=\"wagehistory\">Wages:</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div repeat.for=\"age of userData.client.ageFrom18 + 1\" id=\"wages\"><label for=\"year\">${userData.client.yearOfBirth + 18 + age}</label><input id=\"wagesInput\" type=\"text\" value.bind=\"userData.client.wages[age]\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"><br></div><br><br><button show.bind=\"!userData.client.futureWages\" class=\"btn btn-primary\" click.delegate=\"futureWages()\">Input future wages</button></div><button show.bind=\"userData.client.futureWages\" click.delegate=\"noFutureWages()\" class=\"btn btn-danger\">Do not input future wages</button><br><br><div show.bind=\"userData.client.futureWages\" class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div repeat.for=\"age of userData.client.yearFRA - (userData.client.age)\" id=\"wages\"><label for=\"year\">${userData.client.currentYear + age + 1}</label><input id=\"wagesInput\" type=\"text\" value.bind=\"userData.client.wages[age + userData.client.ageFrom18 + 1]\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"><br></div></div></div><button class=\"btn btn-secondary\" type=\"button\" click.delegate=\"back()\">Back</button> <button class=\"btn btn-primary\" type=\"submit\">Submit Wages</button></form></template>"; });
define('text!benefits/benefits.html', ['module'], function(module) { module.exports = "<template><require from=\"jquery-ui-dist/jquery-ui.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><require from=\"bootstrap-toggle/css/bootstrap-toggle.css\"></require><require from=\"bootstrap-toggle/css/bootstrap2-toggle.css\"></require><form id=\"benefits\" submit.delegate=\"benefitsCalc()\"><h1>Benefits</h1><p>Verify your benefits.</p><div id=\"client\"><h1>Client</h1><div><div class=\"form-group\"><label for=\"wep\">Does WEP apply to you?</label><span id=\"wep\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><br><div click.delegate=\"wep()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.client.wep ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.client.wep ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div show.bind=\"userData.client.wep\" class=\"form-group\"><label for=\"dob\">Years of Substantial Earnings</label><span id=\"wepYears\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"userData.client.yrsOfSubEarnings\" class=\"form-control\" id=\"yrsOfSubEarningsCheck\"></div><hr><label for=\"cola\">Cost of Living Adjustment</label><span id=\"cola\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" id=\"benefitslider\" value=\"\" style=\"position:relative;height:80px\"></div></div><div id=\"spouse\" show.bind=\"userData.client.isMarried\"><h1>Co-Client</h1><div><div class=\"form-group\"><label for=\"wep\">Does WEP apply to you?</label><span id=\"spousewep\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><br><div click.delegate=\"wepSpouse()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.spouse.wep ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.spouse.wep ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div show.bind=\"userData.spouse.wep\" class=\"form-group\"><label for=\"dob\">Years of Substantial Earnings</label><span id=\"spousewepYears\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"userData.spouse.yrsOfSubEarnings\" class=\"form-control\" id=\"yrsOfSubEarningsCheck\"></div><hr><label for=\"cola\">Cost of Living Adjustment</label><span id=\"spousecola\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" id=\"spousebenefitslider\" value=\"\" style=\"position:relative;height:80px\"></div></div><br><br><br><button class=\"btn btn-secondary\" click.delegate=\"back()\" id=\"back\">Back</button> <button class=\"btn btn-primary\" type=\"submit\" id=\"next\">Next</button></form></template>"; });
define('text!exceptions/exceptions.html', ['module'], function(module) { module.exports = "<template><require from=\"jquery-ui-dist/jquery-ui.css\"></require><require from=\"bootstrap-toggle/css/bootstrap-toggle.css\"></require><require from=\"bootstrap-toggle/css/bootstrap2-toggle.css\"></require><form id=\"exceptions\" submit.delegate=\"calculate()\"><h1>Exceptions</h1><p>These special exceptions may impact your benefits. Input them if applicable.</p><div id=\"client\"><h1>Client</h1><div class=\"form-group\"><label for=\"militaryService\">Have you served in the military?</label><br><div click.delegate=\"militaryService()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.client.militaryService ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.client.militaryService ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div show.bind=\"userData.client.militaryService\"><div class=\"form-group\"><label for=\"clientBeganService\">Began Service</label><input type=\"text\" value.bind=\"userData.client.beganService\" change.delegate=\"beganService(userData.client.beganService)\" class=\"form-control\" id=\"clientBeganService\" placeholder=\"01/01/1970\"></div><div class=\"form-group\"><label for=\"clientEndService\">End Service</label><input type=\"text\" value.bind=\"userData.client.endService\" change.delegate=\"endService(userData.client.endService)\" class=\"form-control\" id=\"clientEndService\" placeholder=\"01/01/1990\"></div></div><hr><div class=\"form-group\"><label for=\"clientWorkedOnARailroad\">Have you worked on a railroad?</label><br><div click.delegate=\"railroad()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.client.workedOnARailroad ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.client.workedOnARailroad ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div show.bind=\"userData.client.workedOnARailroad\" class=\"form-group\"><label for=\"yearsOnRailroad\">What year did you start working on the railroad?</label><input type=\"text\" value.bind=\"userData.client.yearsStartedOnRailroad\" class=\"form-control\" placeholder=\"0\"></div><div show.bind=\"userData.client.workedOnARailroad\" class=\"form-group\"><label for=\"yearsOnRailroad\">What year did you stop working on the railroad?</label><input type=\"text\" value.bind=\"userData.client.yearsEndedOnRailroad\" class=\"form-control\" placeholder=\"0\"></div><hr><div class=\"form-group\"><label for=\"clientRecievePension\">Do you receive a government pension that is based on income?</label><br><div click.delegate=\"gpo()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.client.recievePension ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.client.recievePension ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div show.bind=\"userData.client.recievePension\" class=\"form-group\" id=\"clientPensionBox\"><label for=\"clientPensionAmount\">How much government pension do you receive per month?</label><input type=\"text\" value.bind=\"userData.client.pensionAmount\" class=\"form-control\" placeholder=\"2000\"></div><hr><div class=\"form-group\" id=\"clientCitizenshipBox\"><label for=\"clientCitizenship\">Citizenship</label><select class=\"form-control\" value.bind=\"userData.client.citizenship\" change.delegate=\"checkCitizenship(userData.client.citizenship)\"><option data-hidden=\"true\">Please Select</option><option>US Citizen</option><option>Dual Citizen</option><option>Not a US Citizen</option></select></div><div show.bind=\"userData.client.dual26Countries\"><div class=\"form-group\"><label for=\"client26Countries\">Is your dual citizenship with one of these 26 countries?</label><div>Italy, Germany, Switzerland, Belgium, Norway, Canada, United Kingdom, Sweden, Spain, France, Portugal, Netherlands, Austria, Finland, Ireland, Luxembourg, Greece, South Korea, Chile, Australia, Japan, Denmark, Czech Republic, Poland, Slovak Republic, Hungary</div><br><div click.delegate=\"check26Countries()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.client.isDual26Countries ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.client.isDual26Countries ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div show.bind=\"userData.client.isDual26Countries\" class=\"form-group\"><label for=\"clientCanadaItaly\">Is your dual citizenship with Italy or Canada (provided you were hired in the US by the Canadian government)?</label><br><div click.delegate=\"canadaItaly()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.client.dualCanadaItaly ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.client.dualCanadaItaly ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div></div><div show.bind=\"userData.client.notCitizen\"><div class=\"form-group\"><label for=\"clientInstrumentality\">Do you work for an Instrumentality?</label><br><div click.delegate=\"instrumentality()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.client.checkInstrumentality ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.client.checkInstrumentality ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div show.bind=\"userData.client.checkInstrumentality\" class=\"form-group\" id=\"clientOneOrTwoBox\"><label for=\"clientOneOrTwo\">Do all 3 of these conditions apply?</label><p>Condition 1: The organization for which you work is completely owned by a foreign government.</p><p>Condition 2: Your work is like work performed in foreign countries by employees of the U.S. government of an instrumentality</p><p>Condition 3: The Secretary of State certifies to the Secretary of the Treasury that the foreign government grants an equivalent exemption for similar work in the foreign country by employees of the U.S. government or its instrumentalities.</p><br><div click.delegate=\"conditions()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.client.checkConditions ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.client.checkConditions ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div></div></div><div show.bind=\"userData.client.isMarried\" id=\"spouse\"><br><hr><br><h1>Co-Client</h1><div class=\"form-group\"><label for=\"spouseMilitaryService\">Have you served in the military?</label><br><div click.delegate=\"militaryServiceSpouse()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.spouse.militaryService ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.spouse.militaryService ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div show.bind=\"userData.spouse.militaryService\"><div class=\"form-group\"><label for=\"spouseBeganService\">Began Service</label><input type=\"text\" value.bind=\"userData.spouse.beganService\" change.delegate=\"beganServiceSpouse(userData.spouse.beganService)\" class=\"form-control\" id=\"spouseBeganService\" placeholder=\"01/01/1970\"></div><div class=\"form-group\"><label for=\"spouseEndService\">End Service</label><input type=\"text\" value.bind=\"userData.spouse.endService\" change.delegate=\"endServiceSpouse(userData.spouse.endService)\" class=\"form-control\" id=\"spouseEndService\" placeholder=\"01/01/1970\"></div></div><hr><div class=\"form-group\"><label for=\"spouseWorkedOnARailroad\">Have you worked on a railroad?</label><br><div click.delegate=\"railroadSpouse()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.spouse.workedOnARailroad ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.spouse.workedOnARailroad ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div show.bind=\"userData.spouse.workedOnARailroad\" class=\"form-group\"><label for=\"yearsOnRailroad\">What year did you start working on the railroad?</label><input type=\"text\" value.bind=\"userData.spouse.yearsStartedOnRailroad\" class=\"form-control\" placeholder=\"0\"></div><div show.bind=\"userData.spouse.workedOnARailroad\" class=\"form-group\"><label for=\"yearsOnRailroad\">What year did you stop working on the railroad?</label><input type=\"text\" value.bind=\"userData.spouse.yearsEndedOnRailroad\" class=\"form-control\" placeholder=\"0\"></div><hr><div class=\"form-group\"><label for=\"spouseRecievePension\">Do you receive a government pension that is based on income?</label><br><div click.delegate=\"gpoSpouse()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.spouse.recievePension ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.spouse.recievePension ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div show.bind=\"userData.spouse.recievePension\" class=\"form-group\" id=\"spousePensionBox\"><label for=\"spousePensionAmount\">How much government pension do you receive per month?</label><input type=\"text\" value.bind=\"userData.spouse.pensionAmount\" class=\"form-control\" placeholder=\"2000\"></div><hr><div class=\"form-group\" id=\"spouseCitizenshipBox\"><label for=\"spouseCitizenship\">Citizenship</label><select class=\"form-control\" value.bind=\"userData.spouse.citizenship\" change.delegate=\"checkCitizenshipSpouse(userData.spouse.citizenship)\"><option data-hidden=\"true\">Please Select</option><option>US Citizen</option><option>Dual Citizen</option><option>Not a US Citizen</option></select></div><div show.bind=\"userData.spouse.dual26Countries\"><div show.bind=\"userData.spouse.dual26Countries\" class=\"form-group\"><label for=\"spouse26Countries\">Is your dual citizenship with one of these 26 countries?</label><div>Italy, Germany, Switzerland, Belgium, Norway, Canada, United Kingdom, Sweden, Spain, France, Portugal, Netherlands, Austria, Finland, Ireland, Luxembourg, Greece, South Korea, Chile, Australia, Japan, Denmark, Czech Republic, Poland, Slovak Republic, Hungary</div><br><div click.delegate=\"check26CountriesSpouse()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.spouse.isDual26Countries ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.spouse.isDual26Countries ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div show.bind=\"userData.spouse.isDual26Countries\" class=\"form-group\" id=\"spouseCanadaItalyBox\"><label for=\"spouseCanadaItaly\">Is your dual citizenship with Italy or Canada (provided you were hired in the US by the Canadian government)?</label><br><div click.delegate=\"canadaItalySpouse()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.spouse.dualCanadaItaly ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.spouse.dualCanadaItaly ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div></div><div show.bind=\"userData.spouse.notCitizen\"><div class=\"form-group\" id=\"spouseInstrumentalityBox\"><label for=\"spouseInstrumentality\">Do you work for an Instrumentality?</label><br><div click.delegate=\"instrumentalitySpouse()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.spouse.checkInstrumentality ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.spouse.checkInstrumentality ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div show.bind=\"userData.spouse.checkInstrumentality\" class=\"form-group\" id=\"spouseOneOrTwoBox\"><label for=\"spouseOneOrTwo\">Do all 3 of these conditions apply?</label><p>Condition 1: The organization for which you work is completely owned by a foreign government.</p><p>Condition 2: Your work is like work performed in foreign countries by employees of the U.S. government of an instrumentality</p><p>Condition 3: The Secretary of State certifies to the Secretary of the Treasury that the foreign government grants an equivalent exemption for similar work in the foreign country by employees of the U.S. government or its instrumentalities.</p><br><div click.delegate=\"conditionsSpouse()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.spouse.checkConditions ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.spouse.checkConditions ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div></div></div><button class=\"btn btn-secondary\" click.delegate=\"back()\" id=\"back\">Back</button> <button class=\"btn btn-primary\" type=\"submit\" id=\"next\">Next</button></form></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><require from=\"highcharts/css/highcharts.css\"></require><div id=\"results\"><h1>Results</h1><button class=\"btn btn-primary\" click.delegate=\"results()\">Get Results</button><br><br><br><div id=\"client\" show.bind=\"userData.client.showChart\"><div id=\"clientContainer\" style=\"width:750px;height:600px;margin:0 auto\"></div><div style=\"width:300px;margin:0 auto\" class=\"form-group\"><label for=\"empStatus\">Select Benefit Age</label><select class=\"form-control\" value.bind=\"userData.client.benefitAge\" change.delegate=\"checkAge(userData.client.benefitAge)\"><option data-hidden=\"true\">Please Select</option><option>Early (62)</option><option>Your Selected Age (${userData.client.retirementAge})</option><option>Your FRA (${userData.client.yearFRA})</option><option>Late (70)</option></select></div><div show.bind=\"userData.client.checkEarly\" class=\"table-outter\"><table class=\"table table-hover table-bordered search-table\"><thead><tr><th>Year</th><th repeat.for=\"year of userData.client.earlyTuples.length\">${userData.client.currentYear + (62-userData.client.age) + year}</th><th>Net Benefit</th></tr></thead><tbody><tr><th>Ages</th><td repeat.for=\"tuple of userData.client.earlyTuples.length\">${tuple + 62}</td><td>End of Plan</td></tr><tr><th scope=\"row\">Benefit</th><td repeat.for=\"tuple of userData.client.earlyTuples.length\">${userData.client.earlyTuples[tuple]}</td><td>${userData.client.netEarly}</td></tr></tbody></table></div><div show.bind=\"userData.client.checkUserSelected\" class=\"table-outter\"><table class=\"table table-hover table-bordered search-table\"><thead><tr><th>Year</th><th repeat.for=\"year of userData.client.userSelectedTuples.length\">${userData.client.currentYear + (userData.client.retirementAge-userData.client.age) + year}</th><th>Net Benefit</th></tr></thead><tbody><tr><th>Ages</th><td repeat.for=\"tuple of userData.client.userSelectedTuples.length\">${tuple + userData.client.retirementAge}</td><td>End of Plan</td></tr><tr><th scope=\"row\">Benefit</th><td repeat.for=\"tuple of userData.client.userSelectedTuples.length\">${userData.client.userSelectedTuples[tuple]}</td><td>${userData.client.netUserSelected}</td></tr></tbody></table></div><div show.bind=\"userData.client.checkFRA\" class=\"table-outter\"><table class=\"table table-hover table-bordered search-table\"><thead><tr><th>Year</th><th repeat.for=\"year of userData.client.FRATuples.length\">${userData.client.currentYear + (userData.client.yearFRA-userData.client.age) + year}</th><th>Net Benefit</th></tr></thead><tbody><tr><th>Ages</th><td repeat.for=\"tuple of userData.client.FRATuples.length\">${tuple + userData.client.yearFRA}</td><td>End of Plan</td></tr><tr><th scope=\"row\">Benefit</th><td repeat.for=\"tuple of userData.client.FRATuples.length\">${userData.client.FRATuples[tuple]}</td><td>${userData.client.netFRA}</td></tr></tbody></table></div><div show.bind=\"userData.client.checkLate\" class=\"table-outter\"><table class=\"table table-hover table-bordered search-table\"><thead><tr><th>Year</th><th repeat.for=\"year of userData.client.lateTuples.length\">${userData.client.currentYear + (70-userData.client.age) + year}</th><th>Net Benefit</th></tr></thead><tbody><tr><th>Ages</th><td repeat.for=\"tuple of userData.client.lateTuples.length\">${tuple + 70}</td><td>End of Plan</td></tr><tr><th scope=\"row\">Benefit</th><td repeat.for=\"tuple of userData.client.lateTuples.length\">${userData.client.lateTuples[tuple]}</td><td>${userData.client.netLate}</td></tr></tbody></table></div></div><div id=\"spouse\" show.bind=\"userData.spouse.showChart\"><hr><div id=\"spouseContainer\" style=\"width:750px;height:600px;margin:0 auto\"></div><div style=\"width:300px;margin:0 auto\" class=\"form-group\"><label for=\"empStatus\">Select Benefit Age</label><select class=\"form-control\" value.bind=\"userData.spouse.benefitAge\" change.delegate=\"checkAgeSpouse(userData.spouse.benefitAge)\"><option data-hidden=\"true\">Please Select</option><option>Early (62)</option><option>Your Selected Age (${userData.spouse.retirementAge})</option><option>Your FRA (${userData.spouse.yearFRA})</option><option>Late (70)</option></select></div><div show.bind=\"userData.spouse.checkEarly\" class=\"table-outter\"><table class=\"table table-hover table-bordered search-table\"><thead><tr><th>Year</th><th repeat.for=\"year of userData.spouse.earlyTuples.length\">${userData.spouse.currentYear + (62-userData.spouse.age) + year}</th><th>Net Benefit</th></tr></thead><tbody><tr><th>Ages</th><td repeat.for=\"tuple of userData.spouse.earlyTuples.length\">${tuple + 62}</td><td>End of Plan</td></tr><tr><th scope=\"row\">Benefit</th><td repeat.for=\"tuple of userData.spouse.earlyTuples.length\">${userData.spouse.earlyTuples[tuple]}</td><td>${userData.spouse.netEarly}</td></tr></tbody></table></div><div show.bind=\"userData.spouse.checkUserSelected\" class=\"table-outter\"><table class=\"table table-hover table-bordered search-table\"><thead><tr><th>Year</th><th repeat.for=\"year of userData.spouse.userSelectedTuples.length\">${userData.spouse.currentYear + (userData.spouse.retirementAge-userData.spouse.age) + year}</th><th>Net Benefit</th></tr></thead><tbody><tr><th>Ages</th><td repeat.for=\"tuple of userData.spouse.userSelectedTuples.length\">${tuple + userData.spouse.retirementAge}</td><td>End of Plan</td></tr><tr><th scope=\"row\">Benefit</th><td repeat.for=\"tuple of userData.spouse.userSelectedTuples.length\">${userData.spouse.userSelectedTuples[tuple]}</td><td>${userData.spouse.netUserSelected}</td></tr></tbody></table></div><div show.bind=\"userData.spouse.checkFRA\" class=\"table-outter\"><table class=\"table table-hover table-bordered search-table\"><thead><tr><th>Year</th><th repeat.for=\"year of userData.spouse.FRATuples.length\">${userData.spouse.currentYear + (userData.spouse.yearFRA-userData.spouse.age) + year}</th><th>Net Benefit</th></tr></thead><tbody><tr><th>Ages</th><td repeat.for=\"tuple of userData.spouse.FRATuples.length\">${tuple + userData.spouse.yearFRA}</td><td>End of Plan</td></tr><tr><th scope=\"row\">Benefit</th><td repeat.for=\"tuple of userData.spouse.FRATuples.length\">${userData.spouse.FRATuples[tuple]}</td><td>${userData.spouse.netFRA}</td></tr></tbody></table></div><div show.bind=\"userData.spouse.checkLate\" class=\"table-outter\"><table class=\"table table-hover table-bordered search-table\"><thead><tr><th>Year</th><th repeat.for=\"year of userData.spouse.lateTuples.length\">${userData.spouse.currentYear + (70-userData.spouse.age) + year}</th><th>Net Benefit</th></tr></thead><tbody><tr><th>Ages</th><td repeat.for=\"tuple of userData.spouse.lateTuples.length\">${tuple + 70}</td><td>End of Plan</td></tr><tr><th scope=\"row\">Benefit</th><td repeat.for=\"tuple of userData.spouse.lateTuples.length\">${userData.spouse.lateTuples[tuple]}</td><td>${userData.spouse.netLate}</td></tr></tbody></table></div></div><br><br><button class=\"btn btn-secondary\" click.delegate=\"back()\" id=\"back\">Back</button></div></template>"; });
//# sourceMappingURL=app-bundle.js.map