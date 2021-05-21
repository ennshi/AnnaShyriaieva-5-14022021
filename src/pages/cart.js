import {renderHeader} from '../components/header';
import {createElement} from '../helpers/domHelper';
import {cartService} from '../services/cartService';
import {renderBearCartCard} from '../components/bearCartCard';
import {renderForm} from '../components/form';

/**
 * @param {HTMLElement} rootContainer
 * @returns {void}
 */
export function renderCartPage(rootContainer) {
    rootContainer.innerHTML = '';

    const cartContainer = createElement({tagName: 'section', className: 'cart__section'});
    const header = renderHeader('Panier');
    cartContainer.append(header);


    const items = cartService.getItemsFromCart();
    const renderEmptyList = () => {
        const noItems = createElement({tagName: 'h2', className: 'cart__subtitle'});
        noItems.innerText = 'Aucun produit';
        cartContainer.append(noItems);
    }

    if(!items.length) {
        renderEmptyList();
    } else {
        const bearsList = createElement({tagName: 'ul', className: 'cart__list'});
        items.forEach((b, i) => {
            const bear = renderBearCartCard(b, renderEmptyList);
            bearsList.append(bear);
        });
        cartContainer.append(bearsList, renderForm());
    }

    rootContainer.append(cartContainer);
}
