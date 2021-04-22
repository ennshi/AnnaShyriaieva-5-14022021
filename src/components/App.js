import {bearsService} from '../services/bearsService';
import {renderBearList} from './bearList';

class App {
    constructor(page) {
        if(page === 'INDEX') {
            return this.startIndexPage()
        }
    }
    async startIndexPage() {
        try {
            const bears = await bearsService.getAllBears();
            renderBearList(bears);
        } catch (e) {
            console.log('error', e)
        }
    }
}

export default App
