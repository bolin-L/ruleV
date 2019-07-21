import { expect } from 'chai';
import Index from '../src/index';

const EXAMPLE_URL = 'http://www.bolin.site/user/?id=1&status=success&name=lbl#/user/info&userId=456';

describe('Index#sayHi', () => {
    it('should be return Hi lbl', () => {
        const name = Index.getQuery('name', EXAMPLE_URL);

        expect(Index.sayHi(name)).to.deep.equal('Hi, lbl');
    });
});
