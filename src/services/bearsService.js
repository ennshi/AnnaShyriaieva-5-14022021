import {callApi} from '../helpers/apiHelper';

class BearsService {
    async getAllBears() {
        const endpoint = '/';
        try {
            return await callApi(endpoint);
        } catch(e) {
            throw e;
        }
    }

    async getBearById(id) {
        if(!id) return;
        const endpoint = `/${id}`;
        try {
            return await callApi(endpoint)
        } catch (e) {
            throw e;
        }
    }
}

export const bearsService = new BearsService();
