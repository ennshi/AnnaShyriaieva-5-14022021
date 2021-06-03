import {router} from '../router/router';
import {renderHomePage} from '../pages/home';
import {renderCartPage} from '../pages/cart';
import {renderBearDetailsPage} from '../pages/bearDetails';
import {PAGES} from '../helpers/constants';
import {renderNavbar} from './navbar';
import {cartService} from '../services/cartService';
import {renderSuccessPage} from '../pages/orderSuccess';

/**
 * Main class
 * @name App
 * @class
 */
class App {
    /**
     * Set root and navbar container, call the start the application
     * @constructor
     */
    constructor() {
        this.rootContainer = document.getElementById('main');
        this.navbarContainer = document.getElementById('navbar');
        this.start();
    }

    /**
     * Method to set routes, call render of navbar and index page
     * @returns {void}
     */
    start() {
        router.set('', renderHomePage.bind(null, this.rootContainer), true);
        router.set(PAGES.CART, renderCartPage.bind(null, this.rootContainer), false);
        router.set(PAGES.BEAR_DETAILS, renderBearDetailsPage.bind(null, this.rootContainer), false);
        router.set(PAGES.ORDER_SUCCESS, renderSuccessPage.bind(null, this.rootContainer), false);

        renderNavbar(this.navbarContainer);
        cartService.displayItemsNumber();

        router.init();
    }
}

export default App
