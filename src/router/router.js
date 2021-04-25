import {getHash, getQueryObj} from '../helpers/urlParserHelper';
import {PAGES} from '../helpers/constants';

const DEFAULT_ROUTE = {
    hash: PAGES.INDEX,
    cb: () => {},
    defaultRoute: true
};

class Router {
    constructor() {
        this.routes = [];
    }

    init() {
        window.onload = () => {
            this.navigate(window.location.hash);
        };
        window.onhashchange = () => {
            this.navigate(window.location.hash);
        };
    }

    set(hash, cb, defaultRoute) {
        if(this.routes.find(route => route.hash === hash)) return;
        this.routes.push({hash, cb, defaultRoute});
    }

    navigate(hashWithQuery) {
        const route = this.routes.find(r => r.hash === getHash(hashWithQuery));
        if(route) {
            if(window.location.hash !== hashWithQuery) {
                window.history.pushState({}, '', hashWithQuery);
            }
            return route.cb(getQueryObj(hashWithQuery));
        }
        this.replaceWithDefaultRoute();
    }

    replaceWithDefaultRoute() {
        const defaultRoute = this.routes.find(r => r.defaultRoute) || DEFAULT_ROUTE;
        window.history.replaceState({}, '', defaultRoute.hash);
        window.location.hash = defaultRoute.hash;
        return defaultRoute.cb();
    }
}

export const router = new Router();
