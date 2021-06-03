import {createElement} from '../helpers/domHelper';
import logo from '../static/assets/img/logo.webp';
import {router} from '../router/router';
import {PAGES} from '../helpers/constants';

/**
 * Render the navbar
 * @param {HTMLElement} navbarContainer
 * @returns {void}
 */

export function renderNavbar(navbarContainer) {
    const navbarInnerContainer = createElement({tagName: 'div', className: 'navbar__inner-container'});
    navbarInnerContainer.append(renderHomeBtn(), renderCartBtn());
    navbarContainer.appendChild(navbarInnerContainer);
}

/**
 * Render the navigation home button
 * @returns {HTMLElement} navigation home button
 */

function renderHomeBtn() {
    const homeBtn = createElement({tagName: 'button', className: 'navbar__btn', attributes: {'aria-label': 'Aller à l\'accueil'}});
    const logoImage = createElement({tagName: 'img', attributes: {src: logo, alt: 'Orinoco logo'}});
    homeBtn.appendChild(logoImage);
    homeBtn.addEventListener('click', () => router.navigate(PAGES.INDEX));
    return homeBtn;
}

/**
 * Render the navigation cart button
 * @returns {HTMLElement} navigation cart button
 */

function renderCartBtn() {
    const cartBtnContainer = createElement({tagName: 'div', className: 'cart-btn__container'});
    const cartBtnBadge = createElement({tagName: 'div', className: 'badge--cart', attributes: {id: 'cart-badge'}});
    const cartBtn = createElement({tagName: 'button', className: 'navbar__btn', attributes: {'aria-label': 'Aller au panier'}});
    const cartIcon = createElement({tagName: 'i', className: 'fas fa-shopping-cart'});
    cartBtn.appendChild(cartIcon);
    cartBtn.addEventListener('click', () => router.navigate(PAGES.CART));
    cartBtnContainer.append(cartBtn, cartBtnBadge);
    return cartBtnContainer;
}
