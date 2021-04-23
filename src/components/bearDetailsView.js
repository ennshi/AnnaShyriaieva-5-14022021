import {createElement} from '../helpers/domHelper';
import {renderHeader} from './header';

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
    const bearView = renderBearSelectedView(bear);
    bearSelectedViewSection.append(header, bearView);
    return bearSelectedViewSection;
}

function renderBearSelectedView({imageUrl, name} = defaultBear) {
    const bearSelectedViewContainer = createElement({tagName: 'section', className: 'bear-view__container'});
    const bearImg = renderBearSelectedViewImage(imageUrl, name);
    bearSelectedViewContainer.append(bearImg);
    return bearSelectedViewContainer;
}

function renderBearSelectedViewImage(url, name) {
    return createElement({tagName: 'img', className: 'bear-view__img', attributes: {alt: `Ours ${name}`, src: url, width: 300}});
}
