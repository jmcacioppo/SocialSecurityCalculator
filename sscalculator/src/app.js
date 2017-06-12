import 'bootstrap'

export class App {
  constructor() {
    this.message = 'Social Security Calculator!';
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = "Social Security Calculator";
    config.map([
      { route: ['', 'personalinfo'], moduleId: 'personalinfo',
        name: 'personalinfo', title: 'Personal Info', nav: true},
      { route: 'retirementinfo', moduleId: 'retirementinfo',
        name: 'retirementinfo', title: 'Retirement Info', nav: true},
      { route: 'benefits', moduleId: 'benefits',
        name: 'benefits', title: 'Benefits', nav: true},
      { route: 'costofliving', moduleId: 'costofliving',
        name: 'costofliving', title: 'Cost of Living', nav: true},
      { route: 'other benefits', moduleId: 'other benefits',
        name: 'otherbenefits', title: 'Other Benefits', nav: true},
      { route: 'results', moduleId: 'results',
        name: 'results', title: 'Results', nav: true}
    ]);
  }

}
