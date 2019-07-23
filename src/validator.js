import validator from 'validator';

const CHINESE_REG = /^[\u4e00-\u9fa5]{0,}$/;
const ENGLISH_REG = /^[a-zA-Z]{0,}$/;
const CHINESE_COUNT_REG = /[\u4e00-\u9fa5]/g;
const NAME_REG = /^[\u4e00-\u9fa5a-zA-Z]{0,}$/;
const QQ_REG = /[1-9][0-9]{4,}/;
const ID_CARD_REG = /^\d{15}$|\d{17}[Xx]$|\d{18}$/;
// Password (start with character, the length between 6 and 18, just contain character、number、underline)
const BASE_PASSWORD_REG = /^[a-zA-Z]\w{5,17}$/;
// Complex password (must be compose of character、number、UpperCase, can not container special character, the length between 8 and 18
const SAFE_PASSWORD_REG = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

export default Object.assign({}, validator, {
    is(value, rule = { reg: '' }) {
        return rule.reg.test(value);
    },
    isRequired(value) {
        return value.length > 0;
    },
    isFilled(value, rule = { chars: '' }) {
        return validator.trim(value, rule.chars).length > 0;
    },
    isChinese(value) {
        return CHINESE_REG.test(value);
    },
    isEnglish(value) {
        return ENGLISH_REG.test(value);
    },
    isName(value) {
        return NAME_REG.test(value);
    },
    isCnLength(value, rule = { options: {} }) {
        // chinese word length is 2
        const cns = value.match(CHINESE_COUNT_REG);

        return validator.isLength(value + cns.join(''), rule.options);
    },
    isIdCard(value) {
        return ID_CARD_REG.test(value);
    },
    isQQ(value) {
        return QQ_REG.test(value);
    },
    isBasePassword(value) {
        return BASE_PASSWORD_REG.test(value);
    },
    isSafePassword(value) {
        return SAFE_PASSWORD_REG.test(value);
    },
});
