import {renderHeader} from '../components/header';
import {createElement} from '../helpers/domHelper';
import {cartService} from '../services/cartService';
import {renderBearCartCard} from '../components/bearCartCard';

export function renderCartPage(rootContainer) {
    rootContainer.innerHTML = '';

    const cartContainer = createElement({tagName: 'section', className: 'cart__section'});
    const header = renderHeader('Panier');
    cartContainer.append(header);


    const items = cartService.getItemsFromCart();

    if(!items.length) {
        const noItems = createElement({tagName: 'h2', className: 'cart__subtitle'});
        noItems.innerText = 'Aucun produit';
        cartContainer.append(noItems);
    } else {
        const bearsList = createElement({tagName: 'ul', className: 'cart__list'});
        items.forEach((b, i) => {
            const bear = renderBearCartCard(b);
            bearsList.append(bear);
        });
        cartContainer.append(bearsList);
    }

    rootContainer.append(cartContainer);
}
