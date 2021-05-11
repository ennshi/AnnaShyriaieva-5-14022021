import {createElement} from '../helpers/domHelper';
import {renderHeader} from './header';
import {cartService} from '../services/cartService';

const defaultBear = {
    _id: '00',
    colors: ['white', 'blue'],
    name: 'New Bear',
    price: 1000,
    description: 'Text',
    imageUrl: 'url'
};

export function renderBearDetailsView(bear) {
    const bearSelectedViewSection = createElement({tagName: 'section', className: 'bear-details__section'});
    const header = renderHeader(`Ours ${bear.name}`);
    const bearView = renderBearDetailsContainer(bear);
    bearSelectedViewSection.append(header, bearView);
    return bearSelectedViewSection;
}

function renderBearDetailsContainer(bear = defaultBear) {
    const bearSelectedViewContainer = createElement({tagName: 'section', className: 'bear-details__container'});
    const bearImg = renderBearDetailsImage({url: bear.imageUrl, name: bear.name});
    const bearInfo = renderBearDetailsInfo(bear);

    bearSelectedViewContainer.append(bearImg, bearInfo);
    return bearSelectedViewContainer;
}

function renderBearDetailsImage({url, name}) {
    const imgContainer = createElement({tagName: 'div', className: 'bear-details__img-container'});
    const bearImg = createElement({tagName: 'img', className: 'bear-details__img', attributes: {alt: `Ours ${name}`, src: url}});
    imgContainer.append(bearImg);
    return imgContainer;
}

function renderBearDetailsInfo({price, description, name, colors, _id}) {
    const bearDetailsInfoContainer = createElement({tagName: 'div', className: 'bear-details__info-container'});

    const colorsSelectInput = renderSelectColorInput(colors);

    const bearDetailsBuyBlock = createElement({tagName: 'div', className: 'bear-details__buy-block'});
    const bearDetailsPrice = createElement({tagName: 'span', className: 'bear-details__price'});
    bearDetailsPrice.innerText = price;

    const buyIcon = renderBtnAddToCart({name});
    buyIcon.addEventListener('click', () => {
        const item = {
            id: _id,
            name,
            price,
            color: colorsSelectInput.value
        };
        cartService.addItemToCart({item});
    });
    bearDetailsBuyBlock.append(bearDetailsPrice, buyIcon);

    const bearDetailsDescription = createElement({tagName: 'div', className: 'bear-details__desc'});
    bearDetailsDescription.innerText = description;

    bearDetailsInfoContainer.append(description, colorsSelectInput, bearDetailsBuyBlock);

    return bearDetailsInfoContainer;
}

function renderSelectColorInput(colors) {
    const selectColors = createElement({tagName: 'select', className: 'bear-details__select'});
    colors.forEach(c => {
        const optionColor = createElement({tagName: 'option', attributes: {value: c}});
        optionColor.innerText = c;
        selectColors.append(optionColor);
    });
    return selectColors;
}

function renderBtnAddToCart() {
    const buyBtn = createElement({tagName: 'button', className: 'btn' });
    buyBtn.innerText = 'Ajouter au panier';
    return buyBtn;
}
