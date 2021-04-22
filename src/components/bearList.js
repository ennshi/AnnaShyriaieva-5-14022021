import {renderHeader} from './header';
import {renderBearCard} from './bearCard';
import {createElement} from '../helpers/domHelper';

export function renderBearList(bears) {
    const bearListSection = document.getElementById('bearList');
    const header = renderHeader('Ours en peluche');

    const bearListContainer = createElement({tagName: 'div', className: 'bear-list__container'});
    bears.forEach(bear => bearListContainer.appendChild(renderBearCard(bear)));

    bearListSection.append(header, bearListContainer);
    return bearListSection;
}
