import {renderHeader} from '../components/header';
import {createElement} from '../helpers/domHelper';
import {cartService} from '../services/cartService';

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
        items.forEach((b, i) => {
            const bear = createElement({tagName: 'h4', className: 'cart-item__title'});
            bear.innerText = b.item.name;
            cartContainer.append(bear);
        })
    }

    rootContainer.append(cartContainer);
}
