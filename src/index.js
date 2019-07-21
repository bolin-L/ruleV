import qs from 'qs-url';

export default {
    sayHi(name) {
        return `Hi, ${name}`;
    },

    getQuery(name, url) {
        return qs.getQuery(name, url);
    },
};
