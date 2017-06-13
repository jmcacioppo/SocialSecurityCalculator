import {singleton} from 'aurelia-framework';
import {User} from '../services/user'

@singleton()
export class UserData {
    constructor() {
        this.client = new User();
        this.spouse = new User();
    }
}