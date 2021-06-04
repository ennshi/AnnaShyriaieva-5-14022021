import {createElement} from '../helpers/domHelper';

/**
 * Render a header element
 * @param {String} text
 * @returns {HTMLElement} header
 */
export function renderHeader (text) {
    const h = createElement({tagName: 'h1', className: 'header'});
    h.innerText = text;
    return h;
}
