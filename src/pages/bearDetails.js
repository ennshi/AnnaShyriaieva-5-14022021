import {bearsService} from '../services/bearsService';
import {router} from '../router/router';
import {renderBearDetailsView} from '../components/bearDetailsView';
import {PAGES} from '../helpers/constants';


/**
 * @typedef {Object} bear
 * @property {String}  id  the bear's ID
 * @property {Number}  [price] 
 */


/**
 * @param {HTMLElement} rootContainer
 * @param {bear} bear
 * @returns {void}
 */
export async function renderBearDetailsPage(rootContainer, { id }) {
    try {
        const bear = await bearsService.getBearById(id);
        if(bear._id) {
            rootContainer.innerHTML = '';
            rootContainer.appendChild(renderBearDetailsView(bear));
        } else {
            router.navigate(PAGES.INDEX);
        }
    } catch (e) {
        console.log(e);
    }
}