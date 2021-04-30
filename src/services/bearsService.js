import {callApi} from '../helpers/apiHelper';

class BearsService {
    async getAllBears() {
        const sessionBears = this.getAllBearsFromSessionStorage();
        if(sessionBears) return sessionBears;

        const endpoint = '/';
        try {
            const bears = await callApi(endpoint);
            sessionStorage.setItem('bears', JSON.stringify(bears));
            return bears;
        } catch(e) {
            throw e;
        }
    }

    async getBearById(id) {
        if(!id) return;

        const sessionBears = this.getAllBearsFromSessionStorage();
        if(sessionBears) return sessionBears.find(b => b._id === id);

        const endpoint = `/${id}`;
        try {
            return await callApi(endpoint)
        } catch (e) {
            throw e;
        }
    }

    getAllBearsFromSessionStorage() {
        const bears = sessionStorage.getItem('bears');
        if(!bears) return null;
        return JSON.parse(bears);
    }
}

export const bearsService = new BearsService();
