import {callApi} from '../helpers/apiHelper';

/**
 * BearsService class
 * @name BearsService
 * @class
 */
class BearsService {
    /**
     * Get all bears from the session storage or from the server
     * @returns {Promise<Bear[]>}
     */
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

    /**
     * Get a bear from the session storage or from the server by its id
     * @param {Number} id bear's id
     * @returns {Promise<Bear> | Bear}
     */
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

    /**
     * Get all bears from the session storage
     * @returns {Bear[]}
     */
    getAllBearsFromSessionStorage() {
        const bears = sessionStorage.getItem('bears');
        if(!bears) return null;
        return JSON.parse(bears);
    }
}

export const bearsService = new BearsService();
