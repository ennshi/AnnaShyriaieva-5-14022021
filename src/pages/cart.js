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
        const total = createElement({tagName: 'li'});
        const totalPriceEl = `
        <span>Prix Total:</span>
        <span id="totalPrice">${cartService.getTotalPrice()}</span>
        `;
        
        items.forEach((b, i) => {
            const bear = renderBearCartCard(b, renderEmptyList);
            bearsList.append(bear);
        });

        total.innerHTML = totalPriceEl;
        bearsList.append(total);
    
        cartContainer.append(bearsList, renderForm());
    }

    rootContainer.append(cartContainer);
}

export function updateTotalPrice() {
    const totalPriceElement = document.getElementById('totalPrice');
    if(!totalPriceElement) return;
    totalPriceElement.innerText = cartService.getTotalPrice();
}