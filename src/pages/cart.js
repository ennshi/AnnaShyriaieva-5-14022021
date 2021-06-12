import {renderHeader} from '../components/header';
import {createElement} from '../helpers/domHelper';
import {cartService} from '../services/cartService';
import {renderBearCartCard} from '../components/bearCartCard';
import {renderForm} from '../components/form';
import {router} from '../router/router';
import {PAGES} from '../helpers/constants';

/**
 * Render Cart page
 * @param {HTMLElement} rootContainer
 * @returns {void}
 */
export function renderCartPage(rootContainer) {
    rootContainer.innerHTML = '';

    const cartContainer = createElement({tagName: 'section', className: 'cart__section'});
    const header = renderHeader('Panier');
    cartContainer.append(header);


    const items = cartService.getItemsFromCart();

    /**
     * Render an empty cart state
     * @returns {void}
     */
    const renderEmptyList = () => {
        const emptyContainer = createElement({tagName: 'div', className: 'cart__empty-state'});
        emptyContainer.innerHTML = `
            <h2 class="cart__subtitle">Aucun produit...</h2>
        `
        const buttonShop = createElement({tagName: 'button', className: 'btn--basic'});
        buttonShop.innerText = 'Voir nos ours';
        buttonShop.addEventListener('click', () => router.navigate(PAGES.INDEX));

        emptyContainer.append(buttonShop);
        cartContainer.append(emptyContainer);
    }

    if(!items.length) {
        renderEmptyList();
    } else {
        const bearsList = createElement({tagName: 'ul', className: 'cart__list'});
        const total = createElement({tagName: 'li', className: 'cart-card__container'});
        const totalPriceEl = `
        <span><span class="cart-card__total-price">Prix total:</span>
        <span id="totalPrice" class="cart-card__title">${cartService.getTotalPrice()}¥</span></span>
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

/**
 * @returns {void}
 */
export function updateTotalPrice() {
    const totalPriceElement = document.getElementById('totalPrice');
    if(!totalPriceElement) return;
    totalPriceElement.innerText = cartService.getTotalPrice() + '¥';
}