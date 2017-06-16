
export class App {
  configureRouter(config, router) {
    config.title = 'Retirement Calc';
    config.map([
      { route: ['', 'basic-calc'], name: 'basic-calc', moduleId: 'basic-calc', nav: true, title: 'Retirement Calculator'},
      { route: 'advanced-1', name: 'advanced-1', moduleId: 'advanced-1',      nav: true, title: 'advanced-1' },
      { route: 'advanced-2',    name: 'advanced-2',   moduleId: 'advanced-2',   nav: true, title: 'advanced-2' },
      { route: 'advanced-3',    name: 'advanced-3',   moduleId: 'advanced-3',   nav: true, title: 'advanced-3' },
      { route: 'advanced-4',    name: 'advanced-4',   moduleId: 'advanced-4',   nav: true, title: 'advanced-4' },
      { route: 'advanced-results',    name: 'advanced-results',   moduleId: 'advanced-results',   nav: true, title: 'advanced-results' },
    ]);

    this.router = router;
  }
}
