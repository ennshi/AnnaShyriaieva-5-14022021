import {createElement} from '../helpers/domHelper';
import {cartService} from '../services/cartService';

export function renderBearCartCard({item, amount}) {
    const bearCartCardContainer = createElement({tagName: 'li', className: 'cart-card__container', attributes: {id: `cart-item-${item.id}-${item.color}`}});
    const bearCartCardTitle = createElement({tagName: 'h2', className: 'cart-card__title'});
    bearCartCardTitle.innerText = item.name;
    const bearCartCardColor = createElement({tagName: 'span', className: 'cart-card__color'});
    bearCartCardColor.innerText = item.color;
    const bearAmount = amountCounter(amount, item.id, item.color);
    bearCartCardContainer.append(bearCartCardTitle, bearCartCardColor, bearAmount);
    return bearCartCardContainer;
}

function amountCounter(initAmount, id, color) {
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
        displayAmount();
    };

    const decrementCurrentAmount = () => {
        currentAmount -= 1;
        if(currentAmount <= 0) {
            const item = document.getElementById(`cart-item-${id}-${color}`);
            item.style.display = 'none';
            cartService.removeItemFromCart({id, color});
            return;
        }
        cartService.removeItemFromCart({id, color, amount: 1});
        displayAmount();
    };

    const incrBtn = createElement({tagName: 'button', className: 'btn--counter'});
    incrBtn.innerText = '+';
    incrBtn.addEventListener('click', incrementCurrentAmount);
    const decrBtn = createElement({tagName: 'button', className: 'btn--counter'});
    decrBtn.innerText = '-';
    decrBtn.addEventListener('click', decrementCurrentAmount);
    amountCounterContainer.append(incrBtn, amountCounterValue, decrBtn);
    return amountCounterContainer;
}
