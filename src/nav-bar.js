import $ from 'jquery';
import {inject} from 'aurelia-framework';
import {Data} from './data';
import {Router} from 'aurelia-router';
@inject(Data, Router)

export class NavBar {
    constructor(data, router) {
        this.data = data;
        this.router = router;
    }
    addClass(advanced) {
        if(advanced=="advanced1"){
            this.router.navigate('#/advanced-1');
            document.getElementById("advanced1").className="active";
        }
        if(advanced=="advanced2"){
            this.router.navigate('#/advanced-2');
            document.getElementById("advanced1").className="active";
            document.getElementById("advanced2").className="active";
        }
        if(advanced=="advanced3"){
            this.router.navigate('#/advanced-3');
            document.getElementById("advanced1").className="active";
            document.getElementById("advanced2").className="active";
            document.getElementById("advanced3").className="active";            
        }
        if(advanced=="advanced4"){
            this.router.navigate('#/advanced-4');
            document.getElementById("advanced1").className="active";
            document.getElementById("advanced2").className="active";
            document.getElementById("advanced3").className="active";
            document.getElementById("advanced4").className="active";
            
        }
        if(advanced=="advancedResults"){
            this.router.navigate('#/advanced-results');
            document.getElementById("advanced1").className="active";
            document.getElementById("advanced2").className="active";
            document.getElementById("advanced3").className="active";
            document.getElementById("advanced4").className="active";
            document.getElementById("advancedResults").className="active";
        }
    }

}