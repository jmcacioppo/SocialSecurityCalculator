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
        name: 'personalinfo', title: 'Personal Info', nav: true }, { route: 'retirementinfo', moduleId: 'aboutyou/retirementinfo',
        name: 'retirementinfo', title: 'Retirement Info', nav: true }, { route: 'benefits', moduleId: 'benefits/benefits',
        name: 'benefits', title: 'Benefits', nav: true }, { route: 'costofliving', moduleId: 'benefits/costOfLiving',
        name: 'costofliving', title: 'Cost of Living', nav: true }, { route: 'other', moduleId: 'benefits/other',
        name: 'otherbenefits', title: 'Other Benefits', nav: true }, { route: 'results', moduleId: 'results/results',
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
define('aboutyou/personalinfo',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var personalinfo = exports.personalinfo = function personalinfo() {
        _classCallCheck(this, personalinfo);

        this.message = "Personal Information";
    };
});
define('aboutyou/retirementinfo',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var retirementinfo = exports.retirementinfo = function retirementinfo() {
        _classCallCheck(this, retirementinfo);
    };
});
define('benefits/benefits',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var benefits = exports.benefits = function benefits() {
        _classCallCheck(this, benefits);
    };
});
define('benefits/costOfLiving',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var costOfLiving = exports.costOfLiving = function costOfLiving() {
        _classCallCheck(this, costOfLiving);
    };
});
define('benefits/other',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var other = exports.other = function other() {
        _classCallCheck(this, other);
    };
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
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
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"./styles.css\"></require><nav class=\"navbar navbar-default\"><div class=\"container-fluid\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" href=\"#\">Social Security Calculator</a></div><div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\"><ul class=\"nav navbar-nav\"><li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">About You<span class=\"caret\"></span></a><ul class=\"dropdown-menu\"><li class=\"active\"><a href=\"#\">Personal Info</a></li><li><a href=\"#/retirementinfo\">Retirement Info</a></li></ul></li><li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Benefits<span class=\"caret\"></span></a><ul class=\"dropdown-menu\"><li><a href=\"#/benefits\">Benefits</a></li><li><a href=\"#/costOfLiving\">Cost of Living</a></li><li><a href=\"#/other\">Other Benefits</a></li></ul></li><li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Results<span class=\"caret\"></span></a><ul class=\"dropdown-menu\"><li><a href=\"#/results\">Results</a></li></ul></li></ul></div></div></nav><router-view></router-view></template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "#persinfo {\r\n    text-align: center;\r\n    width: 300px;\r\n}"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><require from=\".././styles.css\"></require><div><h1>${message}</h1><p>Please enter the specified personal information, so we can make the best estimates of your lifetime Social Security benefits.</p></div><form id=\"persinfo\"><div class=\"form-group\"><label for=\"formGroupExampleInput\">First Name</label><input type=\"text\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"John\"></div><div class=\"form-group\"><label for=\"exampleSelect1\">Gender</label><select class=\"form-control\" id=\"exampleSelect1\"><option>Male</option><option>Female</option></select></div><div class=\"form-group\"><label for=\"formGroupExampleInput\">Date of Birth</label><input type=\"text\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"01/01/1970\"></div><div class=\"form-group\"><label for=\"exampleSelect1\">Employment Status</label><select class=\"form-control\" id=\"exampleSelect1\"><option>Retired</option><option>Employed</option><option>Business Owner</option><option>Homemaker</option><option>Not Currently Employed</option></select></div><div class=\"form-group\"><label for=\"formGroupExampleInput\">Salary</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" class=\"form-control\" id=\"inlineFormInputGroup\" placeholder=\"0\"></div></div><div class=\"form-group\"><label for=\"exampleSelect1\">Marital Status</label><select class=\"form-control\" id=\"exampleSelect1\"><option>Single</option><option>Married</option><option>Divorced</option><option>Separated</option><option>Widowed</option><option>Domestic Partner</option></select></div><div class=\"form-group\"><label for=\"formGroupExampleInput\">Age of Dependent</label><input type=\"text\" class=\"form-control\" id=\"formGroupExampleInput\" placeholder=\"10\"></div></form></template>"; });
define('text!aboutyou/retirementinfo.html', ['module'], function(module) { module.exports = "<template><h1>Retirement Info</h1></template>"; });
define('text!benefits/benefits.html', ['module'], function(module) { module.exports = "<template><h1>Benefits</h1></template>"; });
define('text!benefits/costOfLiving.html', ['module'], function(module) { module.exports = "<template><h1>Cost of Living</h1></template>"; });
define('text!benefits/other.html', ['module'], function(module) { module.exports = "<template><h1>Other Benefits</h1></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><h1>Results</h1></template>"; });
//# sourceMappingURL=app-bundle.js.map