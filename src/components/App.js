import {router} from '../router/router';
import {renderHomePage} from '../pages/home';
import {renderCartPage} from '../pages/cart';
import {renderBearDetailsPage} from '../pages/bearDetails';
import {PAGES} from '../helpers/constants';

class App {
    constructor() {
        this.rootContainer = document.getElementById('main');
        this.init();
    }

    init() {
        router.set('', renderHomePage.bind(null, this.rootContainer), true);
        router.set(PAGES.CART, renderCartPage.bind(null, this.rootContainer), false);
        router.set(PAGES.BEAR_DETAILS, renderBearDetailsPage.bind(null, this.rootContainer), false);

        window.onload = () => {
            router.push(window.location.hash);
        };
        window.onhashchange = () => {
            router.push(window.location.hash)
        };
    }
}

export default App
