import {createElement} from '../helpers/domHelper';
import {cartService} from '../services/cartService';
import {updateTotalPrice} from '../pages/cart';
import {hideForm} from './form';

export function renderBearCartCard({item, amount}, renderEmptyList) {
    const bearCartCardContainer = createElement({tagName: 'li', className: 'cart-card__container', attributes: {id: `cart-item-${item.id}-${item.color}`}});
    const bearCartCardTitle = createElement({tagName: 'h2', className: 'cart-card__title'});
    bearCartCardTitle.innerText = item.name;
    const bearCartCardColor = createElement({tagName: 'span', className: 'cart-card__color'});
    bearCartCardColor.innerText = item.color;
    const bearCartCardPrix = createElement({tagName: 'span', className: 'cart-card__color', attributes: {id: `cart-item-prix-${item.id}-${item.color}`}});
    bearCartCardPrix.innerText = item.price * amount + '¥';
    const bearAmount = amountCounter({amount, item}, renderEmptyList);
    bearCartCardContainer.append(bearCartCardTitle, bearCartCardColor, bearCartCardPrix, bearAmount);
    return bearCartCardContainer;
}

function updatePrice ({elId, price, amount}) {
    const priceElement = document.getElementById(elId);
    priceElement.innerText = price * amount;
}

function amountCounter({amount: initAmount, item: {id, color, price}}, renderEmptyList) {
    let currentAmount = initAmount;
    const amountCounterContainer = createElement({tagName: 'div', className: 'counter__container'});
    const amountCounterValue = createElement({tagName: 'span', className: 'counter__value'});
    amountCounterValue.innerText = currentAmount;

    const displayAmount = () => {
        amountCounterValue.innerText = currentAmount;
    };

    const incrementCurrentAmount = () => {
        currentAmount += 1;
        cartService.addItemToCart({item: {id, color}});
        updatePrice({elId: `cart-item-prix-${id}-${color}`, price, amount: currentAmount});
        updateTotalPrice();
        displayAmount();
    };

    const decrementCurrentAmount = () => {
        currentAmount -= 1;
        if(currentAmount <= 0) {
            const item = document.getElementById(`cart-item-${id}-${color}`);
            const itemsList = item.parentNode;
            const lastItem = itemsList.children.length === 2;
            item.remove();
            if(lastItem) {
                itemsList.remove();
                renderEmptyList();
                hideForm();
            }
            cartService.removeItemFromCart({id, color});
            return;
        }
        cartService.removeItemFromCart({id, color, amount: 1});
        updatePrice({elId: `cart-item-prix-${id}-${color}`, price, amount: currentAmount});
        updateTotalPrice();
        displayAmount();
    };

    const incrBtn = createElement({tagName: 'button', className: 'btn--counter'});
    incrBtn.innerHTML = '<span>+</span>';
    incrBtn.addEventListener('click', incrementCurrentAmount);
    const decrBtn = createElement({tagName: 'button', className: 'btn--counter'});
    decrBtn.innerHTML = '<span>-</span>';
    decrBtn.addEventListener('click', decrementCurrentAmount);
    amountCounterContainer.append(incrBtn, amountCounterValue, decrBtn);
    return amountCounterContainer;
}
