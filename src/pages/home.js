import {bearsService} from '../services/bearsService';
import {renderBearList} from '../components/bearList';

/**
 * @param {HTMLElement} rootContainer
 * @returns {void}
 */

export async function renderHomePage(rootContainer) {
    try {
        const bears = await bearsService.getAllBears();
        rootContainer.innerHTML = '';
        rootContainer.appendChild(renderBearList(bears));
    } catch (e) {
        console.log('error', e)
    }
}
