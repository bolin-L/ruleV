const CHINESE_REG = /^[\u4e00-\u9fa5]{0,}$/;
const ENGLISH_REG = /^[a-zA-Z]{0,}$/;
const CHINESE_COUNT_REG = /[\u4e00-\u9fa5]/g;
const NAME_REG = /^[\u4e00-\u9fa5a-zA-Z]{0,}$/;
const QQ_REG = /[1-9][0-9]{4,}/;
const ID_CARD_REG = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
const MOBILE_REG = /^((\+|00)86)?1([358][0-9]|4[579]|6[67]|7[0135678]|9[189])[0-9]{8}$/;
// Password (start with character, the length between 6 and 18, just contain character、number、underline)
const BASE_PASSWORD_REG = /^[a-zA-Z0-9]\w{5,17}$/;
// Complex password (must be compose of character、number、UpperCase, can not container special character, the length between 8 and 18
const SAFE_PASSWORD_REG = /^[a-zA-Z](?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,15}$/;

/**
 * 正则校验值
 * @param {string} value - 需要校验的值
 * @param {object} rule - 校验规则 reg || { reg: /xxx/ }
 * @returns {boolean}
 */
function is(value, rule) {
    let reg = rule && rule.reg && rule.reg.test ? rule.reg : rule;
    reg = reg && reg.test ? reg : /^我不认为你刚好可以匹配到这里$/;
    return reg.test(value);
}
/**
 * 校验值是否为空
 * @param {string} value - 需要校验的值
 * @returns { boolean }
 */
function isRequired(value) {
    return String((value || '')).length > 0;
}
/**
 * 校验值是在trim后否存在
 * @param {string} value - 需要校验的值
 * @returns {boolean}
 */
function isFilled(value) {
    return String((value || '')).trim().length > 0;
}
/**
 * 检查值是否全为中文
 * @param {string} value - 需要校验的值
 * @returns {boolean}
 */
function isChinese(value) {
    return CHINESE_REG.test(value);
}
/**
 * 检查值是否全为英文字符a-zA-Z
 * @param {string} value - 需要校验的值
 * @returns {boolean}
 */
function isEnglish(value) {
    return ENGLISH_REG.test(value);
}
/**
 * 检查值是否全为中英文混合/姓名
 * @param {string} value - 需要校验的值
 * @returns {boolean}
 */
function isName(value) {
    return NAME_REG.test(value);
}
/**
 * 检查值的长度是否在限制的范围 | 中文字符长度为2
 * @param {string} value - 需要校验的值
 * @param {object} rule - 校验的规则 { min: 1, max: 5 } | { options: { min: 1, max: 5 } }
 * @returns {boolean}
 */
/**
 * 检查值的长度是否在限制的范围
 * @param {string} value - 需要校验的值
 * @param {object} rule - 校验的规则 { min: 1, max: 5 } | { options: { min: 1, max: 5 } }
 * @returns {boolean}
 */
function isLength(value, rule) {
    rule = rule && typeof rule.options === 'object' ? rule : {
        options: rule,
    };
    value = String((value || ''));
    const surrogatePairs = value.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
    const len = value.length - surrogatePairs.length;

    return len >= rule.options.min && (typeof rule.options.max === 'undefined' || len <= rule.options.max);
}
function isCnLength(value, rule) {
    rule = rule && typeof rule.options === 'object' ? rule : {
        options: rule,
    };
    // chinese word length is 2
    const cns = String((value || '')).match(CHINESE_COUNT_REG) || [];

    return isLength(value + cns.join(''), rule);
}
/**
 * 检查值是否符合身份证 15|17X|18位
 * @param {string} value - 需要校验的身份证号
 * @returns {boolean}
 */
function isIdCard(value) {
    return ID_CARD_REG.test(value);
}
/**
 * 检查值是否符合QQ号 4+位数字
 * @param {string} value - 需要校验的QQ号
 * @returns {boolean}
 */
function isQQ(value) {
    return QQ_REG.test(value);
}
/**
 * 检查值是否符合手机号
 * @param {string} value - 需要校验的手机号
 * @returns {boolean}
 */
function isMobilePhone(value) {
    return MOBILE_REG.test(value);
}
/**
 * 检查值是否符合简单密码 5-17位的大小写数字
 * @param {string} value - 需要校验的密码
 * @returns {boolean}
 */
function isBasePassword(value) {
    return BASE_PASSWORD_REG.test(value);
}
/**
 * 检查值是否符合复杂密码 6-18位的大小写数字组合，开头必须英文字符
 * @param {string} value - 需要校验的密码
 * @returns {boolean}
 */
function isSafePassword(value) {
    return SAFE_PASSWORD_REG.test(value);
}

export default {
    is,
    isRequired,
    isFilled,
    isChinese,
    isEnglish,
    isName,
    isLength,
    isCnLength,
    isIdCard,
    isQQ,
    isMobilePhone,
    isBasePassword,
    isSafePassword,
};
