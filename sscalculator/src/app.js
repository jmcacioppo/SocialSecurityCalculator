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
      { route: 'retirementinfo', moduleId: 'aboutyou/retirementinfo',
        name: 'retirementinfo', title: 'Retirement Info', nav: true},
      { route: 'benefits', moduleId: 'benefits/benefits',
        name: 'benefits', title: 'Benefits', nav: true},
      { route: 'costofliving', moduleId: 'benefits/costOfLiving',
        name: 'costofliving', title: 'Cost of Living', nav: true},
      { route: 'other benefits', moduleId: 'benefits/other',
        name: 'otherbenefits', title: 'Other Benefits', nav: true},
      { route: 'results', moduleId: 'results/results',
        name: 'results', title: 'Results', nav: true}
    ]);
  }

}
