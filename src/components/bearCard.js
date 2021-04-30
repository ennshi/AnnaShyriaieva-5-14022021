import {createElement} from '../helpers/domHelper';
import {router} from '../router/router';
import {BEAR_COLORS, PAGES} from '../helpers/constants';

const defaultBear = {
    _id: '00',
    colors: ['white', 'blue'],
    name: 'New Bear',
    price: 1000,
    description: 'Text',
    imageUrl: 'url'
};

export function renderBearCard({_id, name, imageUrl, price, colors} = defaultBear) {
    const cardContainer = createElement({tagName: 'article', className: 'bear-card__container'});
    const {getSelectedColor, setSelectedColor} = colorSelector(colors);
    const colorsContainer = renderColors({colors, setSelectedColor, getSelectedColor, id: _id});

    const buyIcon = renderBuyIcon();
    buyIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log(_id, getSelectedColor())
    });

    cardContainer.addEventListener('click', () => router.navigate(`${PAGES.BEAR_DETAILS}?id=${_id}`));

    const cardMedia = renderCardMedia({url: imageUrl, name});
    cardMedia.append(buyIcon);

    cardContainer.append(cardMedia, renderCardBody({name, price}), colorsContainer);
    return cardContainer;
}

function renderCardBody({name, price}) {
    const cardBodyContainer = createElement({tagName: 'div', className: 'card-body__container'});
    const cardBodyRightBlock = createElement({tagName: 'div', className: 'card-body__right-block'});
    const cardBodyLeftBlock = createElement({tagName: 'div', className: 'card-body__left-block'});

    const cardName = createElement({tagName: 'h2', className: 'card-body__title'});
    cardName.innerText = name;

    const cardPrice = createElement({tagName: 'span', className: 'card-body__price'});
    cardPrice.innerText = price;

    cardBodyRightBlock.append(cardPrice);
    cardBodyLeftBlock.append(cardName);
    cardBodyContainer.append(cardBodyLeftBlock, cardBodyRightBlock);

    return cardBodyContainer;
}

function renderCardMedia({url, name}) {
    const cardMediaContainer = createElement({tagName: 'div', className: 'card-media__container'});
    const cardImage = createElement({tagName: 'img', className: 'card-media__img', attributes: {src: url, alt: `Ours ${name}`}});
    cardMediaContainer.appendChild(cardImage);
    return cardMediaContainer;
}

function renderColors({colors, getSelectedColor, setSelectedColor, id}) {
    const colorsContainer = createElement({tagName: 'div', className: 'colors__container', attributes: {id: `colorsContainer-${id}`}});
    colors.forEach((color, i) => {
        const colorBtn = createElement({tagName: 'button',
            className: `${getSelectedColor() === color ? 'colors__btn btn--selected' : 'colors__btn'}`,
            attributes: {'aria-label': `${color}`}
        });
        colorBtn.style.backgroundColor = BEAR_COLORS[color] || BEAR_COLORS.White;
        colorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            [...document.getElementById(`colorsContainer-${id}`).children].forEach(c => c.classList.remove('btn--selected'));
            setSelectedColor(i);
            colorBtn.classList.add('btn--selected');
        });
        colorsContainer.appendChild(colorBtn);
    });
    return colorsContainer;
}

function colorSelector(colors = ['white']) {
    let selectedColor = colors[0];

    const getSelectedColor = () => selectedColor;

    const setSelectedColor = (idx) => {
        selectedColor = colors[idx] || colors[0];
    };
    return {setSelectedColor, getSelectedColor}
}

function renderBuyIcon() {
    const buyBtn = createElement({tagName: 'button', className: 'btn--buy-icon'});
    const buyIcon = createElement({tagName: 'i', className: 'fas fa-shopping-cart'});
    buyBtn.appendChild(buyIcon);
    return buyBtn;
}
