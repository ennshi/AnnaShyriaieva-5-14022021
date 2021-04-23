export const getHash = (hashWithQuery) => {
    if(!hashWithQuery) return '';
    return hashWithQuery.split('?')[0];
};

export const getQueryObj = (hashWithQuery) => {
    if(!hashWithQuery) return {};
    const queryPart = hashWithQuery.split('?')[1];
    if(!queryPart) return {};
    return queryPart.split('&').map(query => query.split('=')).reduce((acc, el) => {
        acc[el[0]] = el[1];
        return acc;
    }, {});
};
