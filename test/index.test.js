import { expect } from 'chai';
import validator from '../src/index';
import testData from './data';

describe('validator#getValueStepIn', () => {
    const source = testData.getValueStepInData;

    it('should be return undefined when no arguments', () => {
        const val = validator.getValueStepIn();

        expect(val).to.deep.equal(undefined);
    });

    it('should be return undefined when no attr', () => {
        const val = validator.getValueStepIn(undefined, source);

        expect(val).to.deep.equal(undefined);
    });

    it('should be return undefined when attr not exist', () => {
        const val = validator.getValueStepIn('name', source);

        expect(val).to.deep.equal(undefined);
    });

    it('should be return undefined when attr not exist', () => {
        const val = validator.getValueStepIn('address.city.name', source);

        expect(val).to.deep.equal(undefined);
    });

    it('should be return 18', () => {
        const val = validator.getValueStepIn('age', source);

        expect(val).to.deep.equal(source.age);
    });

    it(`should be return ${source.address.city}`, () => {
        const val = validator.getValueStepIn('address.city', source);

        expect(val).to.deep.equal(source.address.city);
    });
});

describe('validator#checkAll', () => {
    const sourceData = testData.checkSourceData;
    const rulesConfig = testData.checkRuleConfig;

    it('should be return false', () => {
        const result = validator.checkAll(sourceData, rulesConfig);
        const error = result[0] || {};

        expect(error.success).to.be.equal(false);
        expect(error.message).to.be.equal(rulesConfig['applicant.cardCode'][1].message);
        expect(error.checkAttr).to.be.equal('applicant.cardCode');
    });

    it('should be return multiple errors', () => {
        const errors = validator.checkAll(sourceData, rulesConfig, false);

        expect(errors.length).to.equal(2);
    });
});

describe('validator#check', () => {
    const sourceData = testData.checkSourceData;
    const rulesConfig = testData.checkRuleConfig;

    it('should be return true', () => {
        const result = validator.check(sourceData.compare.a, rulesConfig['compare.a'], 'compare.a', sourceData);

        expect(result).to.deep.equal({
            success: true,
            message: '',
            checkAttr: 'compare.a',
        });
    });

    it('should be return true when no rules', () => {
        const result = validator.check('test data', []);

        expect(result).to.deep.equal({
            success: true,
            message: '',
            checkAttr: undefined,
        });
    });

    it('should be return false when input wrong check type', () => {
        const result = validator.check('test data', testData.notExistRule);

        expect(result).to.deep.equal({
            success: false,
            message: '这个校验方法不存在',
            checkAttr: undefined,
        });
    });
    
    it('should be return default message when input wrong check type', () => {
        const result = validator.check('', testData.notExistRule1);

        expect(result).to.deep.equal({
            success: false,
            message: '找不到此规则的校验方法',
            checkAttr: undefined,
        });
    });

    it('should be return false when no arguments', () => {
        const result = validator.check();

        expect(result).to.deep.equal({
            success: true,
            message: '',
            checkAttr: undefined,
        });
    });

    it('should be return default message when input wrong check type', () => {
        const result = validator.check('', [undefined]);

        expect(result).to.deep.equal({
            success: false,
            message: '找不到此规则的校验方法',
            checkAttr: undefined,
        });
    });
});
