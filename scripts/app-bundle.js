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
        name: 'spousewagehistory', title: 'Spouse Wage History', nav: false }, { route: 'exceptions', moduleId: 'exceptions/exceptions',
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

            if (!(dob.indexOf(date.format('MM/DD/YYYY')) >= 0 || dob.indexOf(date.format('M/DD/YYYY')) >= 0 || dob.indexOf(date.format('MM/D/YYYY')) >= 0 || dob.indexOf(date.format('M/D/YYYY')) >= 0) || !date.isValid() || yearOfBirth > currentYear) {
                alert('Invalid Date of Birth');
                return;
            } else {
                this.userData.deceased.age = this.userData.deceased.yearOfPassing - parseInt(yearOfBirth);
                this.userData.deceased.yearOfBirth = parseInt(yearOfBirth);
                this.userData.deceased.monthOfBirth = parseInt(monthOfBirth);
                this.userData.deceased.ageFrom18 = this.userData.deceased.age - 18;
            }
        };

        personalinfo.prototype.checkMarried = function checkMarried(value) {
            if (value == "Married") {
                this.userData.client.isMarried = true;
                this.userData.client.isDivorced = false;
                this.userData.client.isSurvivor = false;
            } else if (value == "Divorced") {
                this.userData.client.isDivorced = true;
                this.userData.client.isMarried = false;
                this.userData.client.isSurvivor = false;
            } else if (value == "Widowed") {
                this.userData.client.isSurvivor = true;
                this.userData.client.isMarried = false;
                this.userData.client.isDivorced = false;

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
                console.log(this.userData.client.yearFRA);
                console.log(this.userData.client.monthFRA);
            } else {
                this.userData.client.isMarried = false;
                this.userData.client.isDivorced = false;
                this.userData.client.isSurvivor = false;
            }
        };

        personalinfo.prototype.checkEmployment = function checkEmployment(value) {
            if (value == "Employed" || value == "Business Owner") {
                this.userData.client.isEmployed = true;
            } else this.userData.client.isEmployed = false;
        };

        personalinfo.prototype.checkEmploymentSpouse = function checkEmploymentSpouse(value) {
            if (value == "Employed" || value == "Business Owner") {
                this.userData.spouse.isEmployed = true;
            } else this.userData.spouse.isEmployed = false;
        };

        personalinfo.prototype.checkNumOfDeps = function checkNumOfDeps(value) {
            if (value > 0) this.userData.client.showAgeOfDeps = true;else this.userData.client.showAgeOfDeps = false;
            console.log(value);
        };

        personalinfo.prototype.wagehistory = function wagehistory() {
            this.router.navigate('#/wagehistory');
        };

        personalinfo.prototype.spousewagehistory = function spousewagehistory() {
            this.router.navigate('#/spousewagehistory');
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
                to: 93,
                step: 1,
                onFinish: function onFinish(data) {
                    _this.userData.spouse.retirementAge = data.from;
                    _this.userData.spouse.lifeExpectancy = data.to;
                    _this.userData.spouse.retirementyear = _this.userData.spouse.retirementAge + _this.userData.spouse.yearOfBirth;
                }
            });

            (0, _jquery2.default)('#toggle').bootstrapToggle();
        };

        personalinfo.prototype.next = function next() {
            this.router.navigate('#/exceptions');
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

        spousewagehistory.prototype.showWages = function showWages() {
            this.userData.spouse.showWages = true;
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

        wagehistory.prototype.showWages = function showWages() {
            this.userData.client.showWages = true;
        };

        wagehistory.prototype.completeWages = function completeWages() {
            (0, _jquery2.default)('input').each(function () {
                if (!(0, _jquery2.default)(this).val) alert("Input all salaries.");else this.router.navigate('#/personalinfo');
            });
        };

        return wagehistory;
    }()) || _class);
});
define('benefits/benefits',['exports', 'jquery', 'ion-rangeslider', 'aurelia-framework', '../services/userdata', 'aurelia-router', 'src/services/constants.js', 'jquery-ui-dist'], function (exports, _jquery, _ionRangeslider, _aureliaFramework, _userdata, _aureliaRouter, _constants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.benefits = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

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
            function calculateSSBase(person) {
                var age = person.age;
                var yearOfBirth = person.yearOfBirth;
                var pia = person.pia;
                var retirementAge = person.retirementAge;
                var yrsOfSubearnings = person.yrsOfSubearnings;
                var ssBase;

                switch (yearOfBirth) {
                    case 1955:
                        switch (retirementAge) {
                            case 62:
                                pia = pia * _constants.EL1955[0];break;
                            case 63:
                                pia = pia * _constants.EL1955[1];break;
                            case 64:
                                pia = pia * _constants.EL1955[2];break;
                            case 65:
                                pia = pia * _constants.EL1955[3];break;
                            case 66:
                                pia = pia * _constants.EL1955[4];break;
                            case 67:
                                pia = pia * _constants.EL1955[5];break;
                            case 68:
                                pia = pia * _constants.EL1955[6];break;
                            case 69:
                                pia = pia * _constants.EL1955[7];break;
                            case 70:
                                pia = pia * _constants.EL1955[8];break;
                        }
                    case 1956:
                        switch (retirementAge) {
                            case 62:
                                pia = pia * _constants.EL1956[0];break;
                            case 63:
                                pia = pia * _constants.EL1956[1];break;
                            case 64:
                                pia = pia * _constants.EL1956[2];break;
                            case 65:
                                pia = pia * _constants.EL1956[3];break;
                            case 66:
                                pia = pia * _constants.EL1956[4];break;
                            case 67:
                                pia = pia * _constants.EL1956[5];break;
                            case 68:
                                pia = pia * _constants.EL1956[6];break;
                            case 69:
                                pia = pia * _constants.EL1956[7];break;
                            case 70:
                                pia = pia * _constants.EL1956[8];break;
                        }
                    case 1957:
                        switch (retirementAge) {
                            case 62:
                                pia = pia * _constants.EL1957[0];break;
                            case 63:
                                pia = pia * _constants.EL1957[1];break;
                            case 64:
                                pia = pia * _constants.EL1957[2];break;
                            case 65:
                                pia = pia * _constants.EL1957[3];break;
                            case 66:
                                pia = pia * _constants.EL1957[4];break;
                            case 67:
                                pia = pia * _constants.EL1957[5];break;
                            case 68:
                                pia = pia * _constants.EL1957[6];break;
                            case 69:
                                pia = pia * _constants.EL1957[7];break;
                            case 70:
                                pia = pia * _constants.EL1957[8];break;
                        }
                    case 1958:
                        switch (retirementAge) {
                            case 62:
                                pia = pia * _constants.EL1958[0];break;
                            case 63:
                                pia = pia * _constants.EL1958[1];break;
                            case 64:
                                pia = pia * _constants.EL1958[2];break;
                            case 65:
                                pia = pia * _constants.EL1958[3];break;
                            case 66:
                                pia = pia * _constants.EL1958[4];break;
                            case 67:
                                pia = pia * _constants.EL1958[5];break;
                            case 68:
                                pia = pia * _constants.EL1958[6];break;
                            case 69:
                                pia = pia * _constants.EL1958[7];break;
                            case 70:
                                pia = pia * _constants.EL1958[8];break;
                        }
                    case 1959:
                        switch (retirementAge) {
                            case 62:
                                pia = pia * _constants.EL1959[0];break;
                            case 63:
                                pia = pia * _constants.EL1959[1];break;
                            case 64:
                                pia = pia * _constants.EL1959[2];break;
                            case 65:
                                pia = pia * _constants.EL1959[3];break;
                            case 66:
                                pia = pia * _constants.EL1959[4];break;
                            case 67:
                                pia = pia * _constants.EL1959[5];break;
                            case 68:
                                pia = pia * _constants.EL1959[6];break;
                            case 69:
                                pia = pia * _constants.EL1959[7];break;
                            case 70:
                                pia = pia * _constants.EL1959[8];break;
                        }
                    default:
                        if (yearOfBirth <= 1954) {
                            switch (retirementAge) {
                                case 62:
                                    pia = pia * _constants.EL1943plus[0];break;
                                case 63:
                                    pia = pia * _constants.EL1943plus[1];break;
                                case 64:
                                    pia = pia * _constants.EL1943plus[2];break;
                                case 65:
                                    pia = pia * _constants.EL1943plus[3];break;
                                case 66:
                                    pia = pia * _constants.EL1943plus[4];break;
                                case 67:
                                    pia = pia * _constants.EL1943plus[5];break;
                                case 68:
                                    pia = pia * _constants.EL1943plus[6];break;
                                case 69:
                                    pia = pia * _constants.EL1943plus[7];break;
                                case 70:
                                    pia = pia * _constants.EL1943plus[8];break;
                            }
                        } else {
                            switch (retirementAge) {
                                case 62:
                                    pia = pia * _constants.EL1960plus[0];break;
                                case 63:
                                    pia = pia * _constants.EL1960plus[1];break;
                                case 64:
                                    pia = pia * _constants.EL1960plus[2];break;
                                case 65:
                                    pia = pia * _constants.EL1960plus[3];break;
                                case 66:
                                    pia = pia * _constants.EL1960plus[4];break;
                                case 67:
                                    pia = pia * _constants.EL1960plus[5];break;
                                case 68:
                                    pia = pia * _constants.EL1960plus[6];break;
                                case 69:
                                    pia = pia * _constants.EL1960plus[7];break;
                                case 70:
                                    pia = pia * _constants.EL1960plus[8];break;
                            }
                        }
                }

                var tier1, tier2, tier3;
                var sum = _constants.consttier1 + _constants.consttier2;
                if (pia > _constants.consttier1) {
                    switch (yrsOfSubearnings) {
                        case 29:
                            tier1 = _constants.consttier1 * _constants.subEarningsPerc[1];break;
                        case 28:
                            tier1 = _constants.consttier1 * _constants.subEarningsPerc[2];break;
                        case 27:
                            tier1 = _constants.consttier1 * _constants.subEarningsPerc[3];break;
                        case 26:
                            tier1 = _constants.consttier1 * _constants.subEarningsPerc[4];break;
                        case 25:
                            tier1 = _constants.consttier1 * _constants.subEarningsPerc[5];break;
                        case 24:
                            tier1 = _constants.consttier1 * _constants.subEarningsPerc[6];break;
                        case 23:
                            tier1 = _constants.consttier1 * _constants.subEarningsPerc[7];break;
                        case 22:
                            tier1 = _constants.consttier1 * _constants.subEarningsPerc[8];break;
                        case 21:
                            tier1 = _constants.consttier1 * _constants.subEarningsPerc[9];break;
                        default:
                            if (yrsOfSubearnings >= 30) tier1 = _constants.consttier1 * _constants.subEarningsPerc[0];else tier1 = _constants.consttier1 * _constants.subEarningsPerc[10];
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

                if (pia > sum) {
                    tier2 = _constants.consttier2 * _constants.tier2perc;
                } else tier2 = pia * _constants.tier2perc;

                if (pia > sum) {
                    tier3 = (pia - sum) * _constants.tier3perc;
                } else tier3 = 0;

                var sumOfTiers = tier1 + tier2 + tier3;
                ssBase = sumOfTiers * 12;

                person.pia = pia;
                person.ssBase = ssBase;
            }

            var maritalStatus = this.userData.client.maritalStatus;
            calculateSSBase(this.userData.client);

            if (maritalStatus == "Married") {
                calculateSSBase(this.userData.spouse);
            }

            console.log(this.userData);
            this.router.navigate('#/results');
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
                from: 2.5,
                step: 0.1,
                postfix: "%",
                onFinish: function onFinish(data) {
                    _this.userData.client.cola = data.from;
                }
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
            function militarySalary(person, sal) {
                if (person.beginYear >= 1940 && person.endYear <= 1967) {} else if (person.beginYear >= 1967 && person.endYear <= 2001) {}
            }

            function railroadSalary(person, sal) {
                var start = person.yearsStartedOnRailroad;
                var end = person.yearsEndedOnRailroad;
                var difference = end - start;
                if (difference >= 10 || difference >= 5 && start >= 1995) {
                    var i = 0;
                    while (start < end) {
                        person.yearsOnRailroad[i] = start;
                        i++;
                        start++;
                    }
                }
            }

            function GPO(person) {
                var pension = person.pensionAmount * 2 / 3;
            }

            function calculatePIA(person, widowcheck) {
                var empStatus = person.employmentStatus;
                var sal = parseInt(person.salary);
                var retirementAge = person.retirementAge;

                var pia, ageFrom18, yrsUntilRetire;

                ageFrom18 = person.ageFrom18;
                yrsUntilRetire = person.retirementAge - person.age;

                sal = parseInt(person.salary);

                if (ageFrom18 >= 0) {
                    person.projectedSal[ageFrom18 - 1] = sal;
                    for (var i = ageFrom18 - 2; i >= 0; i--) {
                        person.projectedSal[i] = person.projectedSal[i + 1] - person.projectedSal[i + 1] * _constants.wagePerc[_constants.wagePerc.length - i - 3];
                    }

                    if (!widowcheck) {
                        for (var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) {
                            person.projectedSal[i] = parseFloat(person.projectedSal[i - 1]) + parseFloat(person.projectedSal[i - 1]) * _constants.wagePerc[_constants.wagePerc.length - 1];
                        }
                    } else {
                        for (var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) {
                            person.projectedSal[i] = 0;
                        }
                    }

                    for (var i = ageFrom18 - 1; i >= 0; i--) {
                        if (person.projectedSal[i] > _constants.allowedSalary[_constants.inflationIndex.length - (ageFrom18 - i) - 1]) {
                            person.inflationAdjusted[i] = _constants.allowedSalary[_constants.inflationIndex.length - (ageFrom18 - i) - 1] * _constants.inflationIndex[_constants.inflationIndex.length - (ageFrom18 - i) - 1];
                        } else {
                            person.inflationAdjusted[i] = person.projectedSal[i] * _constants.inflationIndex[_constants.inflationIndex.length - (ageFrom18 - i) - 1];
                        }
                    }

                    if (!widowcheck) {
                        var lastYearAllowed = _constants.allowedSalary[_constants.allowedSalary.length - 1];
                        for (var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) {
                            if (person.projectedSal[i] > _constants.allowedSalary[i]) {
                                person.inflationAdjusted[i] = lastYearAllowed * _constants.inflationIndex[_constants.inflationIndex.length - 1];
                                lastYearAllowed = lastYearAllowed * 1.021;
                            } else {
                                person.inflationAdjusted[i] = person.projectedSal[i] * _constants.inflationIndex[_constants.inflationIndex.length - 1];
                            }
                        }
                    } else {
                        for (var i = ageFrom18; i <= ageFrom18 + yrsUntilRetire; i++) {
                            person.inflationAdjusted[i] = 0;
                        }
                    }

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
                        switch (client.retirementAge) {
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
                        switch (client.retirementAge) {
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
                        switch (client.retirementAge) {
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
                        switch (client.retirementAge) {
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
                        switch (client.retirementAge) {
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
                            switch (client.retirementAge) {
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
                            switch (client.retirementAge) {
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

            if (calculatePIA(this.userData.client, widowcheck) == null) {
                return;
            }

            if (maritalStatus == "Married") {
                if (calculatePIA(this.userData.spouse, widowcheck) == null) {
                    return;
                }
            } else if (maritalStatus = "Widowed") {
                widowcheck = true;
                if (calculatePIA(this.userData.deceased, widowcheck) == null) {
                    return;
                }
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

        exceptions.prototype.checkCanadaItaly = function checkCanadaItaly(value) {
            if (value == false) alert("You are not eligible for Social Security");
        };

        exceptions.prototype.checkConditions = function checkConditions(value) {
            if (value == true) alert("You are not eligible for Social Security");
        };

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
define('results/results',['exports', 'jquery', 'ion-rangeslider', 'aurelia-framework', '../services/userdata', 'aurelia-router', 'src/services/constants.js', 'jquery-ui-dist'], function (exports, _jquery, _ionRangeslider, _aureliaFramework, _userdata, _aureliaRouter, _constants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.results = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

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

    var results = exports.results = (_dec = (0, _aureliaFramework.inject)(_userdata.UserData, _aureliaRouter.Router), _dec(_class = function () {
        function results(userData, router) {
            _classCallCheck(this, results);

            this.userData = userData;
            this.router = router;
        }

        results.prototype.attached = function attached() {
            function results(person) {
                var early = 62;
                var FRA = person.yearFRA;
                var userSelected = person.retirementAge;
                var late = 70;
                var retirementAges = [early, FRA, userSelected, late];

                var yearOfBirth = person.yearOfBirth;
                var currentYear = person.currentYear;
                var retirementIncome = person.retirementIncome;

                retirementAges.forEach(function (age, i) {
                    var retirementYear = age + yearOfBirth;
                    var limitYear = retirementYear - currentYear;
                    var overLimit = retirementIncome - _constants.projEarningsLimit[limitYear];

                    if (overLimit > 0 && age < FRA) {
                        var reduction = overLimit / 2;
                        person.ssBaseAdj[i] = person.ssBase - reduction;
                        if (person.ssBaseAdj[i] < 0) person.ssBaseAdj[i] = 0;
                    } else if (overLimit > 0 && age == FRA) {
                        var reduction = overLimit / 3;
                        person.ssBaseAdj[i] = person.ssBase - reduction;
                        if (person.ssBaseAdj[i] < 0) person.ssBaseAdj[i] = 0;
                    } else person.ssBaseAdj[i] = person.ssBase;
                });

                person.ssBaseAdj.forEach(function (ssBase, i) {
                    var age = retirementAges[i];
                    var lifeExpectancy = person.lifeExpectancy;
                    var numOfYears = lifeExpectancy - age;

                    for (var j = 0; j < numOfYears; j++) {
                        if (i == 0) {
                            if (j == 0) person.earlyBenefits[j] = ssBase;else {
                                person.earlyBenefits[j] = person.earlyBenefits[j - 1] + person.earlyBenefits[j - 1] * person.cola / 100;
                            }
                        } else if (i == 1) {
                            if (j == 0) person.FRABenefits[j] = ssBase;else {
                                person.FRABenefits[j] = person.FRABenefits[j - 1] + person.FRABenefits[j - 1] * person.cola / 100;
                            }
                        } else if (i == 2) {
                            if (j == 0) person.userSelectedBenefits[j] = ssBase;else {
                                person.userSelectedBenefits[j] = person.userSelectedBenefits[j - 1] + person.userSelectedBenefits[j - 1] * person.cola / 100;
                            }
                        } else if (i == 3) {
                            if (j == 0) person.lateBenefits[j] = ssBase;else {
                                person.lateBenefits[j] = person.lateBenefits[j - 1] + person.lateBenefits[j - 1] * person.cola / 100;
                            }
                        }
                    }
                });
            }

            results(this.userData.client);
            console.log(this.userData);
        };

        return results;
    }()) || _class);
});
define('src/services/constants.js',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var wagePerc = exports.wagePerc = [0.0699, 0.031, 0.0088, 0.0495, 0.0392, 0.0199, 0.0501, 0.0245, 0.0409, 0.018, 0.06, 0.0557, 0.0687, 0.0578, 0.0496, 0.0502, 0.098, 0.0626, 0.0594, 0.0747, 0.069, 0.0599, 0.0794, 0.0875, 0.0901, 0.1007, 0.0551, 0.0487, 0.0588, 0.0426, 0.0297, 0.0638, 0.0493, 0.0396, 0.0462, 0.0373, 0.0515, 0.0086, 0.0268, 0.0401, 0.0489, 0.0584, 0.0523, 0.0557, 0.0553, 0.0239, 0.01, 0.0244, 0.0465, 0.0366, 0.046, 0.0454, 0.023, -0.0151, 0.0236, 0.0313, 0.0128, 0.0355, 0.0348, 0.0348, 0.045955, 0.045955];

    var inflationIndex = exports.inflationIndex = [13.6165708, 13.2076684, 13.0923376, 12.4743581, 12.0032916, 11.7693797, 11.2081442, 10.9398609, 10.5103293, 10.3244303, 9.7397982, 9.2258912, 8.6325739, 8.1609414, 7.7750993, 7.4031149, 6.7423575, 6.3453318, 5.9892999, 5.5728277, 5.2131073, 4.918342, 4.5565075, 4.1899732, 3.8437514, 3.4922153, 3.3099927, 3.1562355, 2.9809992, 2.8591827, 2.7767654, 2.6102952, 2.4877692, 2.3930202, 2.2873633, 2.2051858, 2.0971332, 2.0792511, 2.0249045, 1.9468668, 1.8560938, 1.7537603, 1.666536, 1.5785652, 1.4958451, 1.460991, 1.4464844, 1.4119683, 1.3492451, 1.3016185, 1.2444211, 1.1903987, 1.1636305, 1.1814475, 1.1541687, 1.1191035, 1.085217, 1.0715215, 1.0347904, 1, 1, 1];

    var allowedSalary = exports.allowedSalary = [4200, 4200, 4200, 4800, 4800, 4800, 4800, 4800, 4800, 4800, 6600, 6600, 7800, 7800, 7800, 7800, 9000, 10800, 13200, 14100, 15300, 16500, 17700, 22900, 25900, 29700, 32400, 35700, 37800, 39600, 42000, 43800, 45000, 48000, 51300, 53400, 55500, 57600, 60600, 61200, 62700, 65400, 68400, 72600, 76200, 80400, 84900, 87000, 87900, 90000, 94200, 97500, 102000, 106800, 106800, 110100, 113700, 117000, 118500, 118500, 118500, 127200];

    var consttier1 = exports.consttier1 = 885;
    var tier1perc = exports.tier1perc = 0.90;
    var consttier2 = exports.consttier2 = 5336;
    var tier2perc = exports.tier2perc = 0.32;
    var tier3perc = exports.tier3perc = 0.15;

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

    var spousalBenefits1955 = exports.spousalBenefits1955 = [34.79, 37.09, 40.97, 45.14, 49.31, 50, 50, 50, 50];

    var spousalBenefits1956 = exports.spousalBenefits1956 = [];
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

                this.ssBase = 0;
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
                this.yearOfPassing = 0;
                this.yearFRA = 0;
                this.monthFRA = 0;

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
                this.isSurvivor = false;

                this.numOfDeps = 0;
                this.ageOfDeps = [];
                this.showAgeOfDeps = false;

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

                this.eligibleSS = false;
                this.cola = 2.5;
                this.wep = false;
                this.yrsOfSubEarnings = 0;
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
define('text!styles.css', ['module'], function(module) { module.exports = "#persinfointro {\r\n    text-align: center;\r\n    width: 1000px;\r\n    margin: 0 auto;\r\n}\r\n\r\n#persinfo, #benefits, #results, #wagehistory, #exceptions, #spousewagehistory {\r\n    text-align: center;\r\n    width: 375px;\r\n    margin: 0 auto;\r\n}\r\n\r\n#custom-handle {\r\n    width: 3em;\r\n    height: 1.6em;\r\n    top: 50%;\r\n    margin-top: -.8em;\r\n    text-align: center;\r\n    line-height: 1.6em;\r\n  }\r\n\r\n .toggle input[type=\"checkbox\"] {\r\n     display: none;\r\n     margin: 4px 0 0;\r\n     line-height: normal;\r\n }\r\n\r\n.range-slider {\r\n    position: relative;\r\n    height: 80px;\r\n}\r\n"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"./styles.css\"></require><nav class=\"navbar navbar-default\"><div class=\"container-fluid\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" href=\"#\">Social Security Calculator</a></div><div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\"><ul class=\"nav navbar-nav\"><li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\"><a href.bind=\"row.href\">${row.title}</a></li></ul></div></div></nav><router-view></router-view></template>"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><require from=\".././styles.css\"></require><require from=\"jquery-ui-dist/jquery-ui.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinModern.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><div id=\"persinfointro\"><h1>Personal Information</h1><p>Please enter the specified personal information, so we can make the best estimates of your lifetime Social Security benefits.</p></div><form id=\"persinfo\" submit.delegate=\"next()\"><div id=\"client\"><h3>Client</h3><div class=\"form-group\"><label for=\"firstName\">First Name</label><input type=\"text\" value.bind=\"userData.client.name\" class=\"form-control\" id=\"name\" placeholder=\"John\"></div><div class=\"form-group\"><label for=\"gender\">Gender</label><select class=\"form-control\" value.bind=\"userData.client.gender\" id=\"gender\"><option data-hidden=\"true\">Please Select</option><option>Male</option><option>Female</option></select></div><div class=\"form-group\"><label for=\"dob\">Date of Birth</label><input type=\"text\" value.bind=\"userData.client.dateOfBirth\" change.delegate=\"dob(userData.client.dateOfBirth)\" class=\"form-control\" id=\"dob\" placeholder=\"01/01/1970\"></div><div class=\"form-group\"><label for=\"empStatus\">Employment Status</label><select class=\"form-control\" value.bind=\"userData.client.employmentStatus\" change.delegate=\"checkEmployment(userData.client.employmentStatus)\" id=\"empStatus\"><option data-hidden=\"true\">Please Select</option><option>Employed</option><option>Business Owner</option><option>Retired</option><option>Not Currently Employed</option></select></div><div show.bind=\"userData.client.isEmployed\" class=\"form-group\"><label for=\"salary\">Salary</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"userData.client.salary\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"></div><button type=\"button\" id=\"wagehistory\" click.delegate=\"wagehistory()\">Input Your Own Wages</button></div><div class=\"form-group\"><label for=\"maritalStatus\">Marital Status</label><select class=\"form-control\" value.bind=\"userData.client.maritalStatus\" change.delegate=\"checkMarried(userData.client.maritalStatus)\" id=\"maritalStatus\"><option data-hidden=\"true\">Please Select</option><option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option></select></div><div show.bind=\"userData.client.isDivorced\"><label for=\"divorceCheck\">Have you been divorced for more than 10 years?</label><br><input type=\"checkbox\" checked.bind=\"userData.client.divorceCheck\" data-toggle=\"toggle\" id=\"divorceCheck\"></div><div show.bind=\"userData.client.isSurvivor\"><div class=\"form-group\"><label for=\"salary\">Most Recent Salary of Deceased</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"userData.deceased.salary\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"></div><button type=\"button\" id=\"wagehistory\" click.delegate=\"deceasedwagehistory()\">Input Your Own Wages</button></div><div class=\"form-group\"><label for=\"deceaseddob\">Date of Birth</label><input type=\"text\" value.bind=\"userData.deceased.dateOfBirth\" change.delegate=\"deceaseddob(userData.deceased.dateOfBirth)\" class=\"form-control\" id=\"deceaseddob\" placeholder=\"01/01/1970\"></div><div class=\"form-group\"><label for=\"dob\">Year of Passing</label><input type=\"text\" value.bind=\"userData.deceased.yearOfPassing\" change.delegate=\"deceaseddob(userData.deceased.dateOfBirth)\" class=\"form-control\" id=\"deceasedPassing\" placeholder=\"60\"></div></div><div class=\"form-group\"><label for=\"numOfDeps\">Number of Dependents</label><input type=\"text\" value.bind=\"userData.client.numOfDeps\" change.delegate=\"checkNumOfDeps(userData.client.numOfDeps)\" class=\"form-control\"></div><div show.bind=\"userData.client.showAgeOfDeps\" class=\"form-group\"><label for=\"ageOfDeps\">Age of Dependents:</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div repeat.for=\"num of parseInt(userData.client.numOfDeps)\"><label for=\"ageOfDep\">Age of Dependent ${num + 1}</label><input type=\"text\" value.bind=\"userData.client.ageOfDeps[num]\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"8\"></div></div></div><hr><h1>Retirement Information</h1><div class=\"form-group\"><label for=\"retirementIncome\">Retirement Income</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"userData.client.retirementIncome\" class=\"form-control\" id=\"retirementIncome\" placeholder=\"0\"></div></div><label for=\"retirementAge\">Retirement Age and Life Expectancy</label><input type=\"text\" id=\"slider\" value=\"\" style=\"position:relative;height:80px\"></div><div show.bind=\"userData.client.isMarried\"><br><br><br><h3>Co-Client</h3><div class=\"form-group\"><label for=\"firstName\">First Name</label><input type=\"text\" value.bind=\"userData.spouse.name\" class=\"form-control\" id=\"name\" placeholder=\"John\"></div><div class=\"form-group\"><label for=\"gender\">Gender</label><select class=\"form-control\" value.bind=\"userData.spouse.gender\" id=\"gender\"><option data-hidden=\"true\">Please Select</option><option>Male</option><option>Female</option></select></div><div class=\"form-group\"><label for=\"dob\">Date of Birth</label><input type=\"text\" value.bind=\"userData.spouse.dateOfBirth\" change.delegate=\"spousedob(userData.spouse.dateOfBirth)\" class=\"form-control\" id=\"dob\" placeholder=\"01/01/1970\"></div><div class=\"form-group\"><label for=\"empStatus\">Employment Status</label><select class=\"form-control\" value.bind=\"userData.spouse.employmentStatus\" change.delegate=\"checkEmploymentSpouse(userData.spouse.employmentStatus)\" id=\"empStatusSpouse\"><option data-hidden=\"true\">Please Select</option><option>Employed</option><option>Business Owner</option><option>Retired</option><option>Not Currently Employed</option></select></div><div show.bind=\"userData.spouse.isEmployed\" class=\"form-group\"><label for=\"salary\">Salary</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"userData.spouse.salary\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"></div><button type=\"button\" id=\"spousewagehistory\" click.delegate=\"spousewagehistory()\">Input Your Own Wages</button></div><hr><h1>Retirement Information</h1><div class=\"form-group\"><label for=\"retirementIncome\">Retirement Income</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"userData.spouse.retirementIncome\" class=\"form-control\" id=\"retirementIncome\" placeholder=\"0\"></div></div><label for=\"retirementAge\">Retirement Age and Life Expectancy</label><input type=\"text\" id=\"sliderSpouse\" value=\"\" style=\"position:relative;height:80px\"></div><br><br><button type=\"submit\" id=\"next\">Next</button></form></template>"; });
define('text!aboutyou/spousewagehistory.html', ['module'], function(module) { module.exports = "<template><div id=\"wagehistory\"><h1>Co-Client's Wage History</h1><div id=\"wage\"><label for=\"spousewageCheck\">Click if you would like to input your own wages</label><br><button id=\"spousewageCheck\" click.delegate=\"showWages()\">Input My Wages</button></div><br><br><form show.bind=\"userData.spouse.showWages\" submit.delegate=\"completeWages()\"><div class=\"form-group\"><label for=\"spousewagehistory\">Wages:</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\" id=\"spousewages\"><div repeat.for=\"age of userData.spouse.ageFrom18\"><label for=\"year\">${userData.spouse.yearOfBirth + 18 + age}</label><input type=\"text\" value.bind=\"userData.spouse.wages[age]\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"></div></div></div><button type=\"submit\">Submit Wages</button></form></div></template>"; });
define('text!aboutyou/wagehistory.html', ['module'], function(module) { module.exports = "<template><div id=\"wagehistory\"><h1>Client's Wage History</h1><div id=\"wage\"><label for=\"wageCheck\">Click if you would like to input your own wages</label><br><button id=\"wageCheck\" click.delegate=\"showWages()\">Input My Wages</button></div><br><br><form show.bind=\"userData.client.showWages\" submit.delegate=\"completeWages()\"><div class=\"form-group\"><label for=\"wagehistory\">Wages:</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\" id=\"wages\"><div repeat.for=\"age of userData.client.ageFrom18\"><label for=\"year\">${userData.client.yearOfBirth + 18 + age}</label><input type=\"text\" value.bind=\"userData.client.wages[age]\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"></div></div></div><button type=\"submit\">Submit Wages</button></form></div></template>"; });
define('text!benefits/benefits.html', ['module'], function(module) { module.exports = "<template><require from=\"jquery-ui-dist/jquery-ui.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinModern.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><form id=\"benefits\" submit.delegate=\"benefitsCalc()\"><h1>Benefits</h1><div class=\"form-group\"><label for=\"eligible\">Are you eligible for Social Security benefits?</label><br><input type=\"checkbox\" id=\"eligible\" checked.bind=\"userData.client.eligibleSS\" data-toggle=\"toggle\"></div><div show.bind=\"userData.client.eligibleSS\"><div class=\"form-group\"><label for=\"wep\">Does WEP apply to you?</label><br><input type=\"checkbox\" id=\"wep\" checked.bind=\"userData.client.wep\" data-toggle=\"toggle\"></div><div show.bind=\"userData.client.wep\" class=\"form-group\"><label for=\"dob\">Years of Substantial Earnings</label><input type=\"text\" value.bind=\"userData.client.yrsOfSubEarnings\" class=\"form-control\" id=\"yrsOfSubEarningsCheck\"></div><label for=\"cola\">Cost of Living Adjustment</label><input type=\"text\" id=\"benefitslider\" value=\"\" style=\"position:relative;height:80px\"></div><button click.delegate=\"back()\" id=\"back\">Back</button> <button type=\"submit\" id=\"next\">Next</button></form></template>"; });
define('text!exceptions/exceptions.html', ['module'], function(module) { module.exports = "<template><form id=\"exceptions\" submit.delegate=\"calculate()\"><h1>Exceptions</h1><div id=\"client\"><h3>Client</h3><div class=\"form-group\"><label for=\"clientMilitaryService\">Have you served in the military?</label><br><input type=\"checkbox\" id=\"clientMilitaryService\" checked.bind=\"userData.client.militaryService\" data-toggle=\"toggle\"></div><div show.bind=\"userData.client.militaryService\"><div class=\"form-group\"><label for=\"clientBeganService\">Began Service</label><input type=\"text\" value.bind=\"userData.client.beganService\" change.delegate=\"beganService(userData.client.beganService)\" class=\"form-control\" id=\"clientBeganService\" placeholder=\"01/01/1970\"></div><div class=\"form-group\"><label for=\"clientEndService\">End Service</label><input type=\"text\" value.bind=\"userData.client.endService\" change.delegate=\"endService(userData.client.endService)\" class=\"form-control\" id=\"clientEndService\" placeholder=\"01/01/1990\"></div></div><div class=\"form-group\"><label for=\"clientWorkedOnARailroad\">Have you worked on a railroad?</label><br><input type=\"checkbox\" id=\"clientWorkedOnARailroad\" checked.bind=\"userData.client.workedOnARailroad\" data-toggle=\"toggle\"></div><div show.bind=\"userData.client.workedOnARailroad\" class=\"form-group\"><label for=\"yearsOnRailroad\">What year did you start working on the railroad?</label><input type=\"text\" value.bind=\"userData.client.yearsStartedOnRailroad\" class=\"form-control\" placeholder=\"0\"></div><div show.bind=\"userData.client.workedOnARailroad\" class=\"form-group\"><label for=\"yearsOnRailroad\">What year did you stop working on the railroad?</label><input type=\"text\" value.bind=\"userData.client.yearsEndedOnRailroad\" class=\"form-control\" placeholder=\"0\"></div><div class=\"form-group\"><label for=\"clientRecievePension\">Have you received a government pension?</label><br><input type=\"checkbox\" id=\"clientRecievePension\" checked.bind=\"userData.client.recievePension\" data-toggle=\"toggle\"></div><div show.bind=\"userData.client.recievePension\" class=\"form-group\" id=\"clientPensionBox\"><label for=\"clientPensionAmount\">How much government pension do you receive per month?</label><input type=\"text\" value.bind=\"userData.client.pensionAmount\" class=\"form-control\" placeholder=\"2000\"></div><div class=\"form-group\" id=\"clientCitizenshipBox\"><label for=\"clientCitizenship\">Citizenship</label><select class=\"form-control\" value.bind=\"userData.client.citizenship\" change.delegate=\"checkCitizenship(userData.client.citizenship)\"><option data-hidden=\"true\">Please Select</option><option>US Citizen</option><option>Dual Citizen</option><option>Not a US Citizen</option></select></div><div show.bind=\"userData.client.dual26Countries\"><div class=\"form-group\"><label for=\"client26Countries\">Is your dual citizenship with one of these 26 coutnries?</label><br><input type=\"checkbox\" id=\"client26Countries\" checked.bind=\"userData.client.isDual26Countries\" data-toggle=\"toggle\"></div><div show.bind=\"userData.client.isDual26Countries\" class=\"form-group\" id=\"clientCanadaItalyBox\"><label for=\"clientCanadaItaly\">Is your dual citizenship with Italy or Canada (provided you were hired in the US by the Canadian government)?</label><br><input type=\"checkbox\" id=\"clientCanadaItaly\" checked.bind=\"userData.client.dualCanadaItaly\" change.delegate=\"checkCanadaItaly(userData.client.dualCanadaItaly)\" data-toggle=\"toggle\"></div></div><div show.bind=\"userData.client.notCitizen\"><div class=\"form-group\" id=\"clientInstrumentalityBox\"><label for=\"clientInstrumentality\">Do you work for an Instrumentality?</label><br><input type=\"checkbox\" id=\"clientInstrumentality\" checked.bind=\"userData.client.checkInstrumentality\" data-toggle=\"toggle\"></div><div show.bind=\"userData.client.checkInstrumentality\" class=\"form-group\" id=\"clientOneOrTwoBox\"><label for=\"clientOneOrTwo\">Do all 3 of these conditions apply?</label><br><input type=\"checkbox\" id=\"clientOneOrTwo\" checked.bind=\"userData.client.checkConditions\" change.delegate=\"checkConditions(userData.client.checkConditions)\" data-toggle=\"toggle\"></div></div></div><div show.bind=\"userData.client.isMarried\" id=\"spouse\"><br><hr><br><h3>Co-Client</h3><div class=\"form-group\"><label for=\"spouseMilitaryService\">Have you served in the military?</label><br><input type=\"checkbox\" checked.bind=\"userData.spouse.militaryService\" data-toggle=\"toggle\"></div><div show.bind=\"userData.spouse.militaryService\"><div class=\"form-group\"><label for=\"spouseBeganService\">Began Service</label><input type=\"text\" value.bind=\"userData.spouse.beganService\" change.delegate=\"beganServiceSpouse(userData.spouse.beganService)\" class=\"form-control\" id=\"spouseBeganService\" placeholder=\"01/01/1970\"></div><div class=\"form-group\"><label for=\"spouseEndService\">End Service</label><input type=\"text\" value.bind=\"userData.spouse.endService\" change.delegate=\"endServiceSpouse(userData.spouse.endService)\" class=\"form-control\" id=\"spouseEndService\" placeholder=\"01/01/1970\"></div></div><div class=\"form-group\"><label for=\"spouseWorkedOnARailroad\">Have you worked on a railroad?</label><br><input type=\"checkbox\" id=\"spouseWorkedOnARailroad\" checked.bind=\"userData.spouse.workedOnARailroad\" data-toggle=\"toggle\"></div><div show.bind=\"userData.spouse.workedOnARailroad\" class=\"form-group\"><label for=\"yearsOnRailroad\">What year did you start working on the railroad?</label><input type=\"text\" value.bind=\"userData.spouse.yearsStartedOnRailroad\" class=\"form-control\" placeholder=\"0\"></div><div show.bind=\"userData.spouse.workedOnARailroad\" class=\"form-group\"><label for=\"yearsOnRailroad\">What year did you stop working on the railroad?</label><input type=\"text\" value.bind=\"userData.spouse.yearsEndedOnRailroad\" class=\"form-control\" placeholder=\"0\"></div><div class=\"form-group\"><label for=\"spouseRecievePension\">Have you received a government pension?</label><br><input type=\"checkbox\" id=\"spouseRecievePension\" checked.bind=\"userData.spouse.recievePension\" data-toggle=\"toggle\"></div><div show.bind=\"userData.spouse.recievePension\" class=\"form-group\" id=\"spousePensionBox\"><label for=\"spousePensionAmount\">How much government pension do you receive per month?</label><input type=\"text\" value.bind=\"userData.spouse.pensionAmount\" class=\"form-control\" placeholder=\"2000\"></div><div class=\"form-group\" id=\"spouseCitizenshipBox\"><label for=\"spouseCitizenship\">Citizenship</label><select class=\"form-control\" value.bind=\"userData.spouse.citizenship\" change.delegate=\"checkCitizenshipSpouse(userData.spouse.citizenship)\"><option data-hidden=\"true\">Please Select</option><option>US Citizen</option><option>Dual Citizen</option><option>Not a US Citizen</option></select></div><div show.bind=\"userData.spouse.dual26Countries\"><div show.bind=\"userData.spouse.dual26Countries\" class=\"form-group\"><label for=\"spouse26Countries\">Is your dual citizenship with one of these 26 coutnries?</label><br><input type=\"checkbox\" id=\"spouse26Countries\" checked.bind=\"userData.spouse.isDual26Countries\" data-toggle=\"toggle\"></div><div show.bind=\"userData.spouse.isDual26Countries\" class=\"form-group\" id=\"spouseCanadaItalyBox\"><label for=\"spouseCanadaItaly\">Is your dual citizenship with Italy or Canada (provided you were hired in the US by the Canadian government)?</label><br><input type=\"checkbox\" id=\"spouseCanadaItaly\" checked.bind=\"userData.spouse.dualCanadaItaly\" change.delegate=\"checkCanadaItaly(userData.spouse.dualCanadaItaly)\" data-toggle=\"toggle\"></div></div><div show.bind=\"userData.spouse.notCitizen\"><div class=\"form-group\" id=\"spouseInstrumentalityBox\"><label for=\"spouseInstrumentality\">Do you work for an Instrumentality?</label><br><input type=\"checkbox\" id=\"spouseInstrumentality\" checked.bind=\"userData.spouse.checkInstrumentality\" data-toggle=\"toggle\"></div><div show.bind=\"userData.spouse.checkInstrumentality\" class=\"form-group\" id=\"spouseOneOrTwoBox\"><label for=\"spouseOneOrTwo\">Do all 3 of these conditions apply?</label><br><input type=\"checkbox\" id=\"spouseOneOrTwo\" checked.bind=\"userData.spouse.checkConditions\" change.delegate=\"checkConditions(userData.spouse.checkConditions)\" data-toggle=\"toggle\"></div></div></div><button click.delegate=\"back()\" id=\"back\">Back</button> <button type=\"submit\" id=\"next\">Next</button></form></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><div id=\"results\"><h1>Results</h1><div repeat.for=\"benefit of userData.client.ssBaseAdj.length\"><p>Hello</p></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map