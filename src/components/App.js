import {bearsService} from '../services/bearsService';

class App {
    constructor(page) {
        if(page === 'INDEX') {
            return this.startIndexPage()
        }
    }
    async startIndexPage() {
        try {
            const bears = await bearsService.getAllBears()
            console.log(bears)
        } catch (e) {
            console.log(e)
        }
    }
}

export default App
