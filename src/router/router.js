import {getHash, getQueryObj} from '../helpers/urlParserHelper';

class Router {
    constructor() {
        this.routes = [];
    }

    set(hash, cb, defaultRoute) {
        if(this.routes.find(route => route.hash === hash)) return;
        this.routes.push({hash, cb, defaultRoute});
    }

    push(hash) {
        const route = this.routes.find(r => r.hash === getHash(hash));
        if(route) {
            window.history.pushState({}, '', hash);
            return route.cb(getQueryObj(hash))
        }
        window.history.replaceState({}, '', '');
        window.location = '';
        return this.routes.find(r => r.defaultRoute).cb();
    }
}

export const router = new Router();
