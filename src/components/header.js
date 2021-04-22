import {createElement} from '../helpers/domHelper';

export function renderHeader (text) {
    const h = createElement({tagName: 'h1', className: 'header'});
    h.innerText = text;
    return h;
}
