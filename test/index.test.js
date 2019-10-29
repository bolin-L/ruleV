import { expect } from 'chai';
import validator from '../src/index';
import testData from './data';

describe('validator#install', () => {
    const myValidator = {
        isMaster: name => name === 'liaobolin',
    };
    const newValidator = validator.install(myValidator, false);

    it('should be return true', () => {
        expect(validator.check('liaobolin', [{
            type: 'isMaster',
            message: '你不是master',
        }])).to.deep.equal({
            success: true,
            message: '',
            checkAttr: undefined,
        });
    });

    it('should be return false', () => {
        expect(newValidator.isMaster('liaobolin')).to.equal(true);

        const myValidator2 = {
            isMaster: name => name === 'lalala',
        };
        /** 二次覆盖 */
        validator.install(myValidator2, true);

        expect(validator.check('liaobolin', [{
            type: 'isMaster',
            message: '你不是master',
        }])).to.deep.equal({
            success: false,
            message: '你不是master',
            checkAttr: undefined,
        });
    });
});

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

    it(`should be return ${source.address.city}`, () => {
        const val = validator.getValueStepIn('address[city]', source);

        expect(val).to.deep.equal(source.address.city);
    });
});

describe('validator#checkAll', () => {
    const sourceData = testData.checkSourceData;
    const passSourceData = testData.checkPassSourceData;
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

    it('should be return zero errors', () => {
        const errors = validator.checkAll(passSourceData, rulesConfig, false);
        expect(errors.length).to.equal(0);
    });

    it('should be return true if input errReturnWay is boolean', () => {
        const result = validator.checkAll(passSourceData, rulesConfig, false, 'boolean');

        expect(result).to.equal(true);
    });

    it('should be return multiple "" if input errReturnWay is message', () => {
        const result = validator.checkAll(passSourceData, rulesConfig, false, 'message');

        expect(result).to.equal('');
    });

    it('should be return multiple false if input errReturnWay is boolean', () => {
        const result = validator.checkAll(sourceData, rulesConfig, false, 'boolean');

        expect(result).to.equal(false);
    });

    it('should be return multiple 请输入正确的身份证号码 if input errReturnWay is message', () => {
        const result = validator.checkAll(sourceData, rulesConfig, false, 'message');

        expect(result).to.equal('请输入正确的身份证号码');
    });
});

describe('validator#check', () => {
    const sourceData = testData.checkSourceData;
    const rulesConfig = testData.checkRuleConfig;
    const passSourceData = testData.checkPassSourceData;

    it('should be return true', () => {
        const result = validator.check(sourceData.compare.a, rulesConfig['compare.a'], 'compare.a', sourceData);

        expect(result).to.deep.equal({
            success: true,
            message: '',
            checkAttr: 'compare.a',
        });
    });

    it('should be return true when errReturnWay is boolean', () => {
        const result = validator.check(sourceData.compare.a, rulesConfig['compare.a'], 'compare.a', passSourceData, 'boolean');

        expect(result).to.equal(true);
    });

    it('should be return "" when errReturnWay is message', () => {
        const result = validator.check(sourceData.compare.a, rulesConfig['compare.a'], 'compare.a', passSourceData, 'message');

        expect(result).to.equal('');
    });

    it('should be return error object when error input', () => {
        const result = validator.check(sourceData.applicant.cardCode, rulesConfig['applicant.cardCode'], 'applicant.cardCode', sourceData);

        expect(result).to.deep.equal({
            success: false,
            message: '请输入正确的身份证号码',
            checkAttr: 'applicant.cardCode',
        });
    });

    it('should be return false when input errReturnWay is boolean', () => {
        const result = validator.check(sourceData.applicant.cardCode, rulesConfig['applicant.cardCode'], 'applicant.cardCode', sourceData, 'boolean');

        expect(result).to.equal(false);
    });

    it('should be return 请输入正确的身份证号码 when input errReturnWay is message', () => {
        const result = validator.check(sourceData.applicant.cardCode, rulesConfig['applicant.cardCode'], 'applicant.cardCode', sourceData, 'message');

        expect(result).to.equal('请输入正确的身份证号码');
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
