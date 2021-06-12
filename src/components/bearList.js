import {renderHeader} from './header';
import {renderBearCard} from './bearCard';
import {createElement} from '../helpers/domHelper';

/**
 * Render a bears list
 * @param {Bear[]} bears bears list
 * @returns {HTMLElement} bear list section
 */
export function renderBearList(bears) {
    const bearListSection = createElement({tagName: 'section', className: 'bear-list__wrapper'});
    const header = renderHeader('Ours en peluche');

    const bearListContainer = createElement({tagName: 'div', className: 'bear-list__container'});
    bears.forEach(bear => bearListContainer.appendChild(renderBearCard(bear)));

    bearListSection.append(header, bearListContainer);
    return bearListSection;
}
