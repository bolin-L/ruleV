import { expect } from 'chai';
import validator from '../src/validator';

describe('validator#is', () => {
    it('should be return true when input reg in second argument', () => {
        const reg = /\d+/;
        const result = validator.is(123, reg);

        expect(result).to.equal(true);
    });
    it('should be return false when input reg in second argument', () => {
        const reg = /\d+/;
        const result = validator.is(123, reg);

        expect(result).to.equal(true);
    });
    it('should be return false when input null in second argument', () => {
        const result = validator.is(123, null);

        expect(result).to.equal(false);
    });
    it('should be return true when input number', () => {
        const result = validator.is(123, { reg: /\d+/ });

        expect(result).to.equal(true);
    });

    it('should be return false when input string', () => {
        const result = validator.is('abc', { reg: /\d+/ });

        expect(result).to.equal(false);
    });
});

describe('validator#isRequired', () => {
    it('should be return true when input something', () => {
        const result = validator.isRequired(123);

        expect(result).to.equal(true);
    });

    it('should be return false when input undefined', () => {
        const result = validator.isRequired(undefined);

        expect(result).to.equal(false);
    });
});

describe('validator#isFilled', () => {
    it('should be return true when input something', () => {
        const result = validator.isFilled('   a ');

        expect(result).to.equal(true);
    });

    it('should be return false when input ', () => {
        const result = validator.isFilled('       ');

        expect(result).to.equal(false);
    });

    it('should be return false when input undefined', () => {
        const result = validator.isFilled(undefined);

        expect(result).to.equal(false);
    });
});

describe('validator#isChinese', () => {
    it('should be return true when input is chinese', () => {
        const result = validator.isChinese('中文');

        expect(result).to.equal(true);
    });

    it('should be return false when input contain character', () => {
        const result = validator.isChinese('中文a');

        expect(result).to.equal(false);
    });

    it('should be return false when input no chinese', () => {
        const result = validator.isChinese('1234a');

        expect(result).to.equal(false);
    });
});

describe('validator#isEnglish', () => {
    it('should be return true when input is english', () => {
        const result = validator.isEnglish('abcd');

        expect(result).to.equal(true);
    });

    it('should be return false when input contain other character', () => {
        const result = validator.isEnglish('abcd123');

        expect(result).to.equal(false);
    });

    it('should be return false when input no english', () => {
        const result = validator.isEnglish('1234');

        expect(result).to.equal(false);
    });
});

describe('validator#isName', () => {
    it('should be return true when input is chinese', () => {
        const result = validator.isName('李雷');

        expect(result).to.equal(true);
    });

    it('should be return true when input eglish', () => {
        const result = validator.isName('David');

        expect(result).to.equal(true);
    });

    it('should be return true when input english mixed chinese', () => {
        const result = validator.isName('李雷Jack');

        expect(result).to.equal(true);
    });

    it('should be return false when input no english and chinese', () => {
        const result = validator.isName('123');

        expect(result).to.equal(false);
    });
});

describe('validator#isCnLength', () => {
    const rule = { options: { min: 5, max: 10 } };
    it('should be return false when input null', () => {
        const result = validator.isCnLength(null, rule);

        expect(result).to.equal(false);
    });

    it('should be return true when input options and 李雷abc', () => {
        const result = validator.isCnLength('李雷abc', { min: 5, max: 10 });

        expect(result).to.equal(true);
    });

    it('should be return true when input is 李雷abc', () => {
        const result = validator.isCnLength('李雷abc', rule);

        expect(result).to.equal(true);
    });

    it('should be return true when input 李小蕾', () => {
        const result = validator.isCnLength('李小蕾', rule);

        expect(result).to.equal(true);
    });

    it('should be return true when input abcdefg', () => {
        const result = validator.isCnLength('abcdefg', rule);

        expect(result).to.equal(true);
    });

    it('should be return false when input 李小蕾是个好人', () => {
        const result = validator.isCnLength('李小蕾是个好人', rule);

        expect(result).to.equal(false);
    });

    it('should be return true when no max', () => {
        const result = validator.isCnLength('李小蕾是个好人dandndndnns劳斯莱斯', { options: { min: 1 } });

        expect(result).to.equal(true);
    });
});

describe('validator#isLength', () => {
    const rule = { options: { min: 5, max: 10 } };
    it('should be return false when input null', () => {
        const result = validator.isLength(null, rule);

        expect(result).to.equal(false);
    });

    it('should be return true when input options and 李雷abcd', () => {
        const result = validator.isLength('李雷abcd', { min: 5, max: 10 });

        expect(result).to.equal(true);
    });

    it('should be return true when input is 李雷abcd', () => {
        const result = validator.isLength('李雷abcd', rule);

        expect(result).to.equal(true);
    });

    it('should be return false when input 李小蕾', () => {
        const result = validator.isLength('李小蕾', rule);

        expect(result).to.equal(false);
    });

    it('should be return true when input abcdefg', () => {
        const result = validator.isLength('abcdefghij', rule);

        expect(result).to.equal(true);
    });

    it('should be return true when input 李小蕾是个好人', () => {
        const result = validator.isLength('李小蕾是个好人', rule);

        expect(result).to.equal(true);
    });

    it('should be return true when no max', () => {
        const result = validator.isLength('李小蕾是个好人dandndndnns劳斯莱斯', { options: { min: 1 } });

        expect(result).to.equal(true);
    });
});

describe('validator#isIdCard', () => {
    it('should be return true when input length is 18', () => {
        const result = validator.isIdCard('452123199207019045');

        expect(result).to.equal(true);
    });

    it('should be return true when input length is 18', () => {
        const result = validator.isIdCard('45212319920701904X');

        expect(result).to.equal(true);
    });

    it('should be return true when input length is 15', () => {
        const result = validator.isIdCard('632123820927051');

        expect(result).to.equal(true);
    });

    it('should be return false when input length wrong', () => {
        const result = validator.isIdCard('4521231929384848444444');

        expect(result).to.equal(false);
    });

    it('should be return true when input right code and with strict mode', () => {
        const result = validator.isIdCard('452123199207091058', {
            options: {
                strict: true,
            },
        });

        expect(result).to.equal(true);
    });

    it('should be return true when input wrong code and with strict mode', () => {
        const result = validator.isIdCard('452123199207091057', {
            options: {
                strict: true,
            },
        });

        expect(result).to.equal(false);
    });

    it('should be return true when input right code and length 15 with strict mode', () => {
        const result = validator.isIdCard('632123820927051', {
            options: {
                strict: true,
            },
        });

        expect(result).to.equal(true);
    });
});

describe('validator#isQQ', () => {
    it('should be return true when input length is 18', () => {
        const result = validator.isQQ('556645654');

        expect(result).to.equal(true);
    });

    it('should be return false when input length less than 4', () => {
        const result = validator.isQQ('123');

        expect(result).to.equal(false);
    });
});

describe('validator#isMobilePhone', () => {
    it('should be return true when input correct', () => {
        const result = validator.isMobilePhone('13777382463');

        expect(result).to.equal(true);
    });

    it('should be return false when input wrong', () => {
        const result = validator.isMobilePhone('12345544423');

        expect(result).to.equal(false);
    });
});

describe('validator#isBasePassword', () => {
    it('should be return true when input length between 5 and 17 and just contain character and number', () => {
        expect(validator.isBasePassword('123456')).to.equal(true);
        expect(validator.isBasePassword('abcdefg')).to.equal(true);
        expect(validator.isBasePassword('abc123')).to.equal(true);
    });

    it('should be return true when input length not between 5 and 17 and contain others character', () => {
        expect(validator.isBasePassword('123')).to.equal(false);
        expect(validator.isBasePassword('abcd')).to.equal(false);
        expect(validator.isBasePassword('abcd123,.')).to.equal(false);
        expect(validator.isBasePassword('abcd1234567890asdfghhh')).to.equal(false);
    });
});

describe('validator#isSafePassword', () => {
    it('should be return true when input length between 8 and 16 and contain character and number,', () => {
        expect(validator.isSafePassword('abcdMM1234,.!@#')).to.equal(true);
        expect(validator.isSafePassword('DDaabbDDEE1122')).to.equal(true);
    });

    it('should be return true when input length not between 8 and 16 and not start with character', () => {
        expect(validator.isSafePassword('123')).to.equal(false);
        expect(validator.isSafePassword('abcdefghijk')).to.equal(false);
        expect(validator.isSafePassword('abcd1231233123,.')).to.equal(false);
        expect(validator.isSafePassword('DDDDDD12345')).to.equal(false);
        expect(validator.isSafePassword('abcdkdkdDDDDDD')).to.equal(false);
        expect(validator.isSafePassword('123abk12344DDD')).to.equal(false);
    });
});
