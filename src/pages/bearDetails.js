import {bearsService} from '../services/bearsService';
import {router} from '../router/router';
import {renderBearDetailsView} from '../components/bearDetailsView';
import {PAGES} from '../helpers/constants';


/**
 * Render Bear Details page
 * @param {HTMLElement} rootContainer
 * @param {Bear} bear
 * @returns {void}
 */

export async function renderBearDetailsPage(rootContainer, { _id }) {
    try {
        const bear = await bearsService.getBearById(_id);
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
