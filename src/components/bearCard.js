import {createElement} from '../helpers/domHelper';
import {router} from '../router/router';
import {BEAR_COLORS, PAGES} from '../helpers/constants';
import {cartService} from '../services/cartService';

/**
 * Render a bear card container
 * @param {Bear} bear
 * @returns {HTMLElement} bear card
 */

export function renderBearCard({_id, name, imageUrl, price, colors} = defaultBear) {
    const cardContainer = createElement({tagName: 'article', className: 'bear-card__container'});
    const {getSelectedColor, setSelectedColor} = colorSelector(colors);
    const colorsContainer = renderColors({colors, _id}, {setSelectedColor, getSelectedColor});

    const buyIcon = renderBuyIcon({name});
    buyIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        const item = {
            id: _id,
            name,
            price,
            color: getSelectedColor()
        };
        cartService.addItemToCart({item});
    });

    cardContainer.addEventListener('click', () => router.navigate(`${PAGES.BEAR_DETAILS}?_id=${_id}`));

    const cardMedia = renderCardMedia({imageUrl, name});
    cardMedia.append(buyIcon);

    cardContainer.append(cardMedia, renderCardBody({name, price}), colorsContainer);
    return cardContainer;
}

/**
 * Render a bear card body
 * @param {Bear} bear
 * @returns {HTMLElement} cardBodyContainer
 */

function renderCardBody({name, price}) {
    const cardBodyContainer = createElement({tagName: 'div', className: 'card-body__container'});
    const cardBodyRightBlock = createElement({tagName: 'div', className: 'card-body__right-block'});
    const cardBodyLeftBlock = createElement({tagName: 'div', className: 'card-body__left-block'});

    const cardName = createElement({tagName: 'h2', className: 'card-body__title'});
    cardName.innerText = name;

    const cardPrice = createElement({tagName: 'span', className: 'card-body__price'});
    cardPrice.innerText = price + '¥';

    cardBodyRightBlock.append(cardPrice);
    cardBodyLeftBlock.append(cardName);
    cardBodyContainer.append(cardBodyLeftBlock, cardBodyRightBlock);

    return cardBodyContainer;
}

/**
 * Render a card media section
 * @param {Bear} bear
 * @returns {HTMLElement} cardMediaContainer
 */

function renderCardMedia({imageUrl, name}) {
    const cardMediaContainer = createElement({tagName: 'div', className: 'card-media__container'});
    const cardImage = createElement({tagName: 'img', className: 'card-media__img', attributes: {src: imageUrl, alt: `Ours ${name}`}});
    cardMediaContainer.appendChild(cardImage);
    return cardMediaContainer;
}

/**
 * Render a colors block
 * @param {Bear} bear
 * @param {ColorSelector} colorSelector
 * @returns {HTMLElement} colorsContainer
 */

function renderColors({colors, _id}, {getSelectedColor, setSelectedColor}) {
    const colorsContainer = createElement({tagName: 'div', className: 'colors__container', attributes: {id: `colorsContainer-${_id}`}});
    colors.forEach((color, i) => {
        const colorBtn = createElement({tagName: 'button',
            className: `${getSelectedColor() === color ? 'colors__btn btn--selected' : 'colors__btn'}`,
            attributes: {'aria-label': `${color}`}
        });
        colorBtn.style.backgroundColor = BEAR_COLORS[color] || BEAR_COLORS.White;
        colorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            [...document.getElementById(`colorsContainer-${_id}`).children].forEach(c => c.classList.remove('btn--selected'));
            setSelectedColor(i);
            colorBtn.classList.add('btn--selected');
        });
        colorsContainer.appendChild(colorBtn);
    });
    return colorsContainer;
}

/**
 * Create a color selector
 * @param {String[]} colors
 * @returns {ColorSelector} color selector
 */

function colorSelector(colors = ['white']) {
    let selectedColor = colors[0];

    const getSelectedColor = () => selectedColor;

    const setSelectedColor = (idx) => {
        selectedColor = colors[idx] || colors[0];
    };
    return {setSelectedColor, getSelectedColor}
}

/**
 * Render a buy icon
 * @param {Bear} bear
 * @returns {HTMLElement} buyButton element
 */

function renderBuyIcon({name}) {
    const buyBtn = createElement({tagName: 'button', className: 'btn--buy-icon', attributes: {'aria-label': `Ajouter l'ours ${name} au panier`}});
    const buyIcon = createElement({tagName: 'i', className: 'fas fa-shopping-cart'});
    buyBtn.appendChild(buyIcon);
    return buyBtn;
}
