import {createElement} from '../helpers/domHelper';
import {router} from '../router/router';
import {PAGES} from '../helpers/constants';

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
    cardContainer.addEventListener('click', () => router.navigate(`${PAGES.BEAR_DETAILS}?id=${_id}`));
    cardContainer.append(cardName);
    return cardContainer;
}
