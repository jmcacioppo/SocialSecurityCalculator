import 'bootstrap'

export class App {
  constructor() {
    this.message = 'Social Security Calculator!';
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = "Social Security Calculator";
    config.map([
      { route: ['', 'personalinfo'], moduleId: 'aboutyou/personalinfo',
        name: 'personalinfo', title: 'Personal Info', nav: true},
        
      { route: 'wagehistory', moduleId: 'aboutyou/wagehistory',
        name: 'wagehistory', title: 'Wage History', nav: false}, 
      { route: 'spousewagehistory', moduleId: 'aboutyou/spousewagehistory',
        name: 'spousewagehistory', title: 'Spouse Wage History', nav: false}, 
      { route: 'deceasedwagehistory', moduleId: 'aboutyou/deceasedwagehistory',
        name: 'deceasedwagehistory', title: 'Deceased Wage History', nav: false},   

      { route: 'exceptions', moduleId: 'exceptions/exceptions',
        name: 'exceptions', title: 'Exceptions', nav: true},

      { route: 'benefits', moduleId: 'benefits/benefits',
        name: 'benefits', title: 'Benefits', nav: true},
     
      { route: 'results', moduleId: 'results/results',
        name: 'results', title: 'Results', nav: true}
    ]);
  }

}
