/**
 * Get hash
 * @param {String | undefined} hashWithQuery
 * @returns {String} hash
 */

export const getHash = (hashWithQuery) => {
    if(!hashWithQuery) return '';
    return hashWithQuery.split('?')[0];
};

/**
 * Get query parameters
 * @param {String | undefined} hashWithQuery
 * @returns {{[String] : String}} query object
 */

export const getQueryObj = (hashWithQuery) => {
    if(!hashWithQuery) return {};
    const queryPart = hashWithQuery.split('?')[1];
    if(!queryPart) return {};
    return queryPart.split('&').map(query => query.split('=')).reduce((acc, el) => {
        acc[el[0]] = el[1];
        return acc;
    }, {});
};
