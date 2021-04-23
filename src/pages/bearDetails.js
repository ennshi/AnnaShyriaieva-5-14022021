import {bearsService} from '../services/bearsService';
import {router} from '../router/router';
import {renderBearDetailsView} from '../components/bearDetailsView';

export async function renderBearDetailsPage(rootContainer, { id }) {
    try {
        const bear = await bearsService.getBearById(id);
        if(bear._id) {
            rootContainer.innerHTML = '';
            rootContainer.appendChild(renderBearDetailsView(bear));
        } else {
            router.push('');
        }
    } catch (e) {
        console.log(e);
    }
}
