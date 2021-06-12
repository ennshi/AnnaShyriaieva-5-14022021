import {createElement} from '../helpers/domHelper';
import {renderHeader} from './header';
import {cartService} from '../services/cartService';

/**
 * Render a bear's details section
 * @param {Bear} bear
 * @returns {HTMLElement} bearSelectedViewSection
 */
export function renderBearDetailsView(bear) {
    const bearSelectedViewSection = createElement({tagName: 'section', className: 'bear-details__section'});
    const header = renderHeader(`Ours ${bear.name}`);
    const bearView = renderBearDetailsContainer(bear);
    bearSelectedViewSection.append(header, bearView);
    return bearSelectedViewSection;
}

/**
 * Render a bear's details container
 * @param {Bear} bear
 * @returns {HTMLElement} bearSelectedViewContainer
 */
function renderBearDetailsContainer(bear) {
    const bearSelectedViewContainer = createElement({tagName: 'section', className: 'bear-details__container'});
    const bearImg = renderBearDetailsImage({imageUrl: bear.imageUrl, name: bear.name});
    const bearInfo = renderBearDetailsInfo(bear);

    bearSelectedViewContainer.append(bearImg, bearInfo);
    return bearSelectedViewContainer;
}

/**
 * Render a bear's details image
 * @param {Bear} bear
 * @returns {HTMLElement} bear's image
 */
function renderBearDetailsImage({imageUrl, name}) {
    const imgContainer = createElement({tagName: 'div', className: 'bear-details__img-container'});
    const bearImg = createElement({tagName: 'img', className: 'bear-details__img', attributes: {alt: `Ours ${name}`, src: imageUrl}});
    imgContainer.append(bearImg);
    return imgContainer;
}

/**
 * Render a bear's details info block
 * @param {Bear} bear
 * @returns {HTMLElement} bearDetailsInfoContainer
 */
function renderBearDetailsInfo({price, description, name, colors, _id}) {
    const bearDetailsInfoContainer = createElement({tagName: 'div', className: 'bear-details__info-container'});

    const colorsSelectInput = renderSelectColorInput(colors);

    const bearDetailsBuyBlock = createElement({tagName: 'div', className: 'bear-details__buy-block'});
    const bearDetailsPrice = createElement({tagName: 'span', className: 'bear-details__price'});
    bearDetailsPrice.innerText = price + '¥';

    const buyIcon = renderBtnAddToCart({name});
    buyIcon.addEventListener('click', () => {
        const item = {
            id: _id,
            name,
            price,
            color: colorsSelectInput.children[0].value
        };
        cartService.addItemToCart({item});
    });
    bearDetailsBuyBlock.append(bearDetailsPrice, buyIcon);

    const bearDetailsDescription = createElement({tagName: 'div', className: 'bear-details__desc'});
    bearDetailsDescription.innerText = description;

    bearDetailsInfoContainer.append(bearDetailsDescription, colorsSelectInput, bearDetailsBuyBlock);

    return bearDetailsInfoContainer;
}

/**
 * Render a bear's details colors input
 * @param {String[]} colors
 * @returns {HTMLElement} colors select element
 */
function renderSelectColorInput(colors) {
    const selectColors = createElement({tagName: 'div', className: 'bear-details__select'});
    const selector = createElement({tagName: 'select'});
    colors.forEach(c => {
        const optionColor = createElement({tagName: 'option', attributes: {value: c}});
        optionColor.innerText = c;
        selector.append(optionColor);
    });
    selectColors.append(selector);
    return selectColors;
}

/**
 * * Render a bear's details button Add to cart
 * @returns {HTMLElement} buy button element
 */
function renderBtnAddToCart() {
    const buyBtn = createElement({tagName: 'button', className: 'btn--basic'});
    buyBtn.innerText = 'Ajouter au panier';
    return buyBtn;
}
