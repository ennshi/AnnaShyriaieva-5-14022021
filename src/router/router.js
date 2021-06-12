import {getHash, getQueryObj} from '../helpers/urlParserHelper';
import {PAGES} from '../helpers/constants';

const DEFAULT_ROUTE = {
    hash: PAGES.INDEX,
    cb: () => {},
    defaultRoute: true
};

/**
 * Router class
 * @name Router
 * @class
 */
class Router {
    /**
     * Routes list
     * @constructor
     */
    constructor() {
        this.routes = [];
    }

    /**
     * Initiate router by adding listeners
     * @returns {void}
     */
    init() {
        window.onload = () => {
            this.navigate(window.location.hash);
        };
        window.onhashchange = () => {
            this.navigate(window.location.hash);
        };
    }

    /**
     * Set a route
     * @param {String} hash
     * @param {Function} cb callback
     * @param {Boolean} defaultRoute is default route
     * @returns {void}
     */
    set(hash, cb, defaultRoute) {
        if(this.routes.find(route => route.hash === hash)) return;
        this.routes.push({hash, cb, defaultRoute});
    }

    /**
     * Navigate to route
     * @param {String} hashWithQuery
     * @returns {void}
     */
    navigate(hashWithQuery) {
        const route = this.routes.find(r => r.hash === getHash(hashWithQuery));
        if(! route) return this.replaceWithDefaultRoute();
        if(window.location.hash !== hashWithQuery) {
            window.history.pushState({}, '', hashWithQuery);
        }
        return route.cb(getQueryObj(hashWithQuery));

    }

    /**
     * Redirect to the default route
     * @returns {void}
     */
    replaceWithDefaultRoute() {
        const defaultRoute = this.routes.find(r => r.defaultRoute) || DEFAULT_ROUTE;
        window.history.replaceState({}, '', defaultRoute.hash);
        window.location.hash = defaultRoute.hash;
        return defaultRoute.cb();
    }
}

export const router = new Router();
