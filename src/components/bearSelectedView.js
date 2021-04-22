import {bearsService} from '../services/bearsService';
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

export async function createBearSelectedView(event, id) {
    try {
        const bearSelectedViewSection = document.getElementById('bearView');
        bearSelectedViewSection.innerHTML = '';

        const bear = await bearsService.getBearById(id);
        const header = renderHeader(`Ours ${bear.name}`);
        const bearView = renderBearSelectedView(bear);

        bearSelectedViewSection.append(header, bearView);
    } catch (e) {
        console.log(e)
    }
}

function renderBearSelectedView({imageUrl, name} = defaultBear) {
    const bearSelectedViewContainer = createElement({tagName: 'section', className: 'bear-view__container'});
    const bearImg = renderBearSelectedViewImage(imageUrl, name);
    bearSelectedViewContainer.append(bearImg);
    return bearSelectedViewContainer;
}

function renderBearSelectedViewImage(url, name) {
    return createElement({tagName: 'img', className: 'bear-view__img', attributes: {alt: `Ours ${name}`, src: url}});
}
