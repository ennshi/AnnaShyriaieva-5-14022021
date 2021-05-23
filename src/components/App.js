import {router} from '../router/router';
import {renderHomePage} from '../pages/home';
import {renderCartPage} from '../pages/cart';
import {renderBearDetailsPage} from '../pages/bearDetails';
import {PAGES} from '../helpers/constants';
import {renderNavbar} from './navbar';
import {cartService} from '../services/cartService';
import {renderSuccessPage} from '../pages/orderSuccess';

class App {
    constructor() {
        this.rootContainer = document.getElementById('main');
        this.navbarContainer = document.getElementById('navbar');
        this.start();
    }

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
