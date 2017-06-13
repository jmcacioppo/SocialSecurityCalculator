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
        name: 'personalinfo', title: 'Personal Info', nav: true }, { route: 'benefits', moduleId: 'benefits/benefits',
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
define('aboutyou/personalinfo',['exports', 'jquery', 'aurelia-framework', '../services/userdata', 'jquery-ui-dist'], function (exports, _jquery, _aureliaFramework, _userdata) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.personalinfo = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

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

    var personalinfo = exports.personalinfo = (_dec = (0, _aureliaFramework.inject)(_userdata.UserData), _dec(_class = function () {
        function personalinfo(userData) {
            _classCallCheck(this, personalinfo);

            this.message = "Personal Information";
            this.userData = userData;
        }

        personalinfo.prototype.print = function print() {
            console.log(this.userData);
        };

        personalinfo.prototype.attached = function attached() {
            (0, _jquery2.default)("#empStatus").change(function () {
                var val = (0, _jquery2.default)(this).val();
                if (val == "Employed" || val == "Business Owner") (0, _jquery2.default)('#salary').show();else (0, _jquery2.default)('#salary').hide();
            });

            (0, _jquery2.default)('#ageOfDependent').hide();
            (0, _jquery2.default)("#numOfDependents").change(function () {
                var val = (0, _jquery2.default)(this).val();
                if (val > 0) (0, _jquery2.default)('#ageOfDependent').show();else (0, _jquery2.default)('#ageOfDependent').hide();
            });

            console.log(this.userData.client.employmentStatus);

            (0, _jquery2.default)('#retire').slider({
                range: true,
                min: 50,
                max: 100,
                values: [65, 91],
                slide: function slide(event, ui) {
                    (0, _jquery2.default)("#amount").val("Retire at " + ui.values[0] + " - Live to " + ui.values[1]);
                }
            });

            (0, _jquery2.default)("#amount").val("Retire at " + (0, _jquery2.default)("#retire").slider("values", 0) + " - Live to  " + (0, _jquery2.default)("#retire").slider("values", 1));
        };

        return personalinfo;
    }()) || _class);
});
define('benefits/benefits',['exports', 'jquery', 'jquery-ui-dist'], function (exports, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.benefits = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

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

    var benefits = exports.benefits = function () {
        function benefits() {
            _classCallCheck(this, benefits);
        }

        benefits.prototype.attached = function attached() {
            var handle = (0, _jquery2.default)("#custom-handle");
            (0, _jquery2.default)('#benefitslider').slider({
                min: 0,
                max: 10,
                value: 2.5,
                step: 0.1,
                create: function create() {
                    handle.text((0, _jquery2.default)(this).slider("value"));
                },
                slide: function slide(event, ui) {
                    handle.text(ui.value);
                }
            });

            (0, _jquery2.default)("#cola").val((0, _jquery2.default)("#benefitslider").slider("values", 0) + "%");
        };

        return benefits;
    }();
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
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

                this.name = "";
                this.gender = "";
                this.dateOfBirth = "";
                this.employmentStatus = "";
                this.salary = 0;
                this.maritalStatus = "";
                this.numOfDependents = 0;
                this.ageOfDependent = "";
                this.retirementIncome;

                this.eligibleSS = false;
                this.cola = 2.5;
                this.widowerIncome = 0;
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
    }) || _class);
});
define('results/results',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var results = exports.results = function results() {
        _classCallCheck(this, results);
    };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"./styles.css\"></require><nav class=\"navbar navbar-default\"><div class=\"container-fluid\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" href=\"#\">Social Security Calculator</a></div><div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\"><ul class=\"nav navbar-nav\"><li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\"><a href.bind=\"row.href\">${row.title}</a></li></ul></div></div></nav><router-view></router-view></template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "#persinfointro {\r\n    text-align: center;\r\n    width: 1000px;\r\n    margin: 0 auto;\r\n}\r\n\r\n#persinfo, #benefits, #results {\r\n    text-align: center;\r\n    width: 500px;\r\n    margin: 0 auto;\r\n}\r\n\r\n#retire, #benefitslider {\r\n    width: 300px;\r\n    margin: 0 auto;\r\n}\r\n\r\n#custom-handle {\r\n    width: 3em;\r\n    height: 1.6em;\r\n    top: 50%;\r\n    margin-top: -.8em;\r\n    text-align: center;\r\n    line-height: 1.6em;\r\n  }"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><require from=\".././styles.css\"></require><require from=\"jquery-ui-dist/jquery-ui.css\"></require><div id=\"persinfointro\"><h1>${message}</h1><p>Please enter the specified personal information, so we can make the best estimates of your lifetime Social Security benefits.</p></div><form id=\"persinfo\" submit.delegate=\"print()\"><div class=\"form-group\"><label for=\"formGroupExampleInput\">First Name</label><input type=\"text\" value.bind=\"userData.client.name\" class=\"form-control\" id=\"name\" placeholder=\"John\"></div><div class=\"form-group\"><label for=\"exampleSelect1\">Gender</label><select class=\"form-control\" id=\"gender\" value.bind=\"userData.client.gender\"><option>Male</option><option>Female</option></select></div><div class=\"form-group\"><label for=\"formGroupExampleInput\">Date of Birth</label><input type=\"text\" value.bind=\"userData.client.dateOfBirth\" class=\"form-control\" id=\"dob\" placeholder=\"01/01/1970\"></div><div class=\"form-group\"><label for=\"exampleSelect1\">Employment Status</label><select class=\"form-control\" value.bind=\"userData.client.employmentStatus\" id=\"empStatus\"><option>Employed</option><option>Business Owner</option><option>Retired</option><option>Not Currently Employed</option></select></div><div class=\"form-group\" id=\"salary\"><label for=\"formGroupExampleInput\">Salary</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"userData.client.salary\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"></div></div><div class=\"form-group\"><label for=\"exampleSelect1\">Marital Status</label><select class=\"form-control\" value.bind=\"userData.client.maritalStatus\" id=\"maritalStatus\"><option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option></select></div><div class=\"form-group\"><label for=\"formGroupExampleInput\">Number of Dependents:</label><select class=\"form-control\" value.bind=\"userData.client.numOfDependents\" id=\"numOfDependents\"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select></div><div class=\"form-group\" id=\"ageOfDependent\"><label for=\"formGroupExampleInput\">Age of Dependent:</label><input type=\"text\" value.bind=\"userData.client.ageOfDependent\" class=\"form-control\" id=\"ageOfDependent\" placeholder=\"10\"></div><br><h1>Retirement Information</h1><div class=\"form-group\"><label for=\"formGroupExampleInput\">Retirement Income</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"></div></div><p><label for=\"amount\">${userData.client.firstName}</label><input type=\"text\" id=\"amount\" readonly=\"readonly\" style=\"border:0;font-weight:700\"></p><div id=\"retire\"></div><br><br><button type=\"submit\">Submit</button></form></template>"; });
define('text!benefits/benefits.html', ['module'], function(module) { module.exports = "<template><require from=\"jquery-ui-dist/jquery-ui.css\"></require><form id=\"benefits\"><h1>Benefits</h1><div class=\"form-group\"><label for=\"exampleSelect1\">Are you eligible for Social Security benefits?</label><select class=\"form-control\" id=\"exampleSelect1\" value.bind=\"userData.client.eligibleSS\"><option>Yes</option><option>No</option></select></div><label for=\"cola\">Cost of Living Adjustment</label><div id=\"benefitslider\"><div id=\"custom-handle\" class=\"ui-slider-handle\"></div></div><br><div class=\"form-group\"><label for=\"formGroupExampleInput\">Annual amount of widower income (if applicable):</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\" value.bind=\"userData.client.widowerIncome\"></div></div></form></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><div id=\"results\"><h1>Results</h1></div></template>"; });
//# sourceMappingURL=app-bundle.js.map