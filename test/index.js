import { expect } from 'chai';
import validator from '../src/index';

describe('validator#getValueStepIn', () => {
    it('should be return lbl', () => {
        const name = validator.getValueStepIn('name', { name: 'lbl' });

        expect(name).to.deep.equal('lbl');
    });
});
