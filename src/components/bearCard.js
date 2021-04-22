import {createElement} from '../helpers/domHelper';
import {createBearSelectedView} from './bearSelectedView';

const defaultBear = {
    _id: '00',
    colors: ['white', 'blue'],
    name: 'New Bear',
    price: 1000,
    description: 'Text',
    imageUrl: 'url'
};

export function renderBearCard({_id, name} = defaultBear) {
    const cardContainer = createElement({tagName: 'article', className: 'bear-card__container'});
    const cardName = createElement({tagName: 'h2', className: 'bear-card__title'});
    cardName.innerText = name;
    cardContainer.addEventListener('click', (e) => createBearSelectedView(e, _id));
    cardContainer.append(cardName);
    return cardContainer;
}
