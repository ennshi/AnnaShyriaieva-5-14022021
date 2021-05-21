import {getHash, getQueryObj} from '../helpers/urlParserHelper';
import {PAGES} from '../helpers/constants';

const DEFAULT_ROUTE = {
    hash: PAGES.INDEX,
    cb: () => {},
    defaultRoute: true
};

/**
 * @name Router
 * @class
 */
class Router {
    /**
     * @constructor
     */
    constructor() {
        this.routes = [];
    }

    /**
     * @method Router#init
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
     * @method Router#set
     * @param {string} hash
     * @param {Function} cb
     * @param {boolean} defaultRoute
     * @returns {void}
     */
    set(hash, cb, defaultRoute) {
        if(this.routes.find(route => route.hash === hash)) return;
        this.routes.push({hash, cb, defaultRoute});
    }

    /**
     * @method Router#navigate
     * @param {string} hashWithQuery
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
     * @method Router#replaceWithDefaultRoute
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
